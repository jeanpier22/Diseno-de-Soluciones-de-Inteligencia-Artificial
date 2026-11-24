# Capítulo 2 · Entrenar y guardar el modelo

**Tiempo estimado:** 25 minutos.
**Qué vas a lograr:** un script que limpia los datos, entrena el modelo y lo guarda en un archivo `modelo.joblib`.

---

## 2.1 · La idea

Cuando entrenas un modelo en un notebook de Colab, el modelo **vive solo mientras la sesión está abierta**. Al cerrarla, se pierde. Para usarlo en una API, necesitamos **guardarlo en un archivo**. A ese archivo le llamamos **artefacto**.

```
 gimnasio_socios.csv  ──►  train.py  ──►  modelo.joblib   (el modelo entrenado)
   (datos sucios)         (limpia,         metadata.json   (su "ficha": versión, métricas)
                           entrena, guarda)
```

Dos decisiones importantes que ya aprendiste en clase:

1. **Guardamos el pipeline completo, no solo el modelo.** El pipeline incluye rellenar nulos, escalar, codificar texto y el modelo. Así, la API aplica **exactamente el mismo preprocesamiento** que al entrenar.
2. **Guardamos una "ficha" (`metadata.json`)** con la versión del modelo, las variables y las métricas.

---

## 2.2 · Crear el script `train.py`

1. Clic derecho sobre la carpeta `backend` → **Nuevo archivo** → `train.py`.
2. Pega **todo** este código y guarda (`Ctrl` + `S`):

```python
"""Entrena el modelo de abandono de socios y lo guarda en la carpeta models/.

Uso (desde la carpeta backend):   python train.py
"""
import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import sklearn
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

# ---------- Rutas ----------
RAIZ = Path(__file__).parent              # la carpeta backend/
DATOS = RAIZ / "data" / "gimnasio_socios.csv"
SALIDA = RAIZ / "models"                  # aqui se guarda el modelo

# ---------- Columnas ----------
NUMERICAS = ["visitas_mes", "clases_grupales_mes", "quejas_6m", "cuota_mensual", "meses_antiguedad"]
CATEGORICAS = ["plan", "pago_automatico"]
OBJETIVO = "abandono"                     # 1 = abandona, 0 = se queda

# Rangos validos: lo que cae fuera es un error de captura y se convierte en nulo
RANGOS = {"visitas_mes": (0, 31), "cuota_mensual": (30, 400), "meses_antiguedad": (0, 120)}


def limpiar(df: pd.DataFrame) -> pd.DataFrame:
    """La limpieza de la Sesion 3, en una funcion."""
    # 1. Quitar socios repetidos
    df = df.drop_duplicates(subset="id_socio").copy()

    # 2. Unificar el texto: " BÁSICO ", "basico", "Básico" -> "Basico"
    df["plan"] = (
        df["plan"].str.strip().str.lower().str.replace("á", "a").str.replace("é", "e")
        .map({"basico": "Basico", "estandar": "Estandar", "premium": "Premium"})
    )
    df["pago_automatico"] = (
        df["pago_automatico"].str.strip().str.lower()
        .map({"si": "Si", "sí": "Si", "s": "Si", "no": "No", "n": "No"})
    )

    # 3. Arreglar el tipo de dato: "S/ 119" -> 119.0
    df["cuota_mensual"] = pd.to_numeric(
        df["cuota_mensual"].astype(str).str.replace("S/", "", regex=False).str.strip(),
        errors="coerce",
    )

    # 4. Valores imposibles (400 visitas al mes) -> nulo. Se rellenan despues, dentro del pipeline.
    for columna, (minimo, maximo) in RANGOS.items():
        df.loc[~df[columna].between(minimo, maximo), columna] = np.nan
    return df


def construir_pipeline() -> Pipeline:
    """Un solo objeto que rellena nulos, escala, codifica y predice."""
    preprocesamiento = ColumnTransformer([
        # Numericas: nulo -> mediana, luego escalar
        ("num", Pipeline([("imp", SimpleImputer(strategy="median")),
                          ("sc", StandardScaler())]), NUMERICAS),
        # Categoricas: nulo -> el valor mas frecuente, luego one-hot
        ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                          ("oh", OneHotEncoder(handle_unknown="ignore"))]), CATEGORICAS),
    ])
    return Pipeline([("pre", preprocesamiento), ("modelo", LogisticRegression(max_iter=1000))])


def main() -> None:
    df = limpiar(pd.read_csv(DATOS))
    X, y = df[NUMERICAS + CATEGORICAS], df[OBJETIVO]

    # 70 % para entrenar, 30 % para evaluar
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

    pipe = construir_pipeline().fit(X_tr, y_tr)

    metricas = {
        "accuracy": round(float(accuracy_score(y_te, pipe.predict(X_te))), 4),
        "roc_auc": round(float(roc_auc_score(y_te, pipe.predict_proba(X_te)[:, 1])), 4),
    }

    # Guardar el pipeline completo (el "artefacto") y una ficha con sus datos
    SALIDA.mkdir(exist_ok=True)
    joblib.dump(pipe, SALIDA / "modelo.joblib")
    ficha = {
        "version_modelo": "1.0",
        "sklearn": sklearn.__version__,
        "variables": NUMERICAS + CATEGORICAS,
        "metricas": metricas,
    }
    (SALIDA / "metadata.json").write_text(json.dumps(ficha, indent=2), encoding="utf-8")
    print("Modelo guardado en", SALIDA / "modelo.joblib")
    print(json.dumps(ficha, indent=2))


if __name__ == "__main__":
    main()
```

---

## 2.3 · ¿Qué hace cada parte? (léelo con calma)

| Parte | Qué hace |
|---|---|
| **Rutas** (`RAIZ`, `DATOS`, `SALIDA`) | Dice dónde está el CSV y dónde se guardará el modelo (`backend/models`). |
| **Columnas** | `NUMERICAS` y `CATEGORICAS` son las 7 variables de entrada. `OBJETIVO` es lo que queremos predecir: `abandono` (1 = abandona, 0 = se queda). |
| **`limpiar()`** | La limpieza de la Sesión 3: quita socios duplicados, unifica el texto (`" BÁSICO "` → `Basico`), convierte `"S/ 119"` en el número `119` y convierte valores imposibles (400 visitas al mes) en nulos. |
| **`construir_pipeline()`** | Arma el pipeline: a los números les rellena nulos con la **mediana** y los escala; a las categorías les rellena nulos con el valor **más frecuente** y las convierte a 0/1 (*one-hot*); al final, una **regresión logística**. |
| **`main()`** | Lee el CSV → limpia → separa 70 % entrenamiento / 30 % prueba → entrena → calcula `accuracy` y `roc_auc` → guarda el modelo y su ficha. |
| **`if __name__ == "__main__"`** | "Si ejecutan este archivo directamente, corre `main()`". |

> 💡 **¿Por qué se limpia otra vez si ya lo hicimos en clase?** Porque la API recibirá datos nuevos y debe tratarlos igual. Aquí dejamos la limpieza **dentro del script**, para que todo el proceso sea repetible con un solo comando.

---

## 2.4 · Ejecutarlo

Primero entra a la carpeta `backend` (el script busca el CSV desde ahí):

```powershell
cd backend
```

Luego ejecuta el entrenamiento:

```powershell
python train.py
```

✅ **Deberías ver** algo parecido a esto (los números deben ser muy similares):

```
Modelo guardado en C:\...\api-abandono\backend\models\modelo.joblib
{
  "version_modelo": "1.0",
  "sklearn": "1.7.2",
  "variables": [
    "visitas_mes",
    ...
  ],
  "metricas": {
    "accuracy": 0.7533,
    "roc_auc": 0.752
  }
}
```

Y en el Explorador de VS Code debió aparecer una carpeta nueva:

```
backend/
└── models/
    ├── modelo.joblib     ← el modelo entrenado (el artefacto)
    └── metadata.json     ← su ficha
```

**Cómo leer las métricas:**
- `accuracy: 0.75` → acierta 3 de cada 4 veces en datos que no vio al entrenar.
- `roc_auc: 0.75` → qué tan bien separa a quienes abandonan de quienes se quedan (0,5 = azar, 1 = perfecto). 0,75 es un modelo **aceptable**, no excelente; sirve para aprender el flujo.

⚠️ **Si sale un error:**

| Mensaje | Qué hacer |
|---|---|
| `FileNotFoundError: ... gimnasio_socios.csv` | El CSV no está en `backend/data/`. Revisa el paso 1.3. |
| `ModuleNotFoundError: No module named 'pandas'` | No tienes activo el entorno. Ejecuta `cd ..` y luego `.venv\Scripts\activate`, y vuelve a `cd backend`. |
| `python no se reconoce...` | Reabre la terminal y activa el entorno. |

---

## ✔️ Fin del Capítulo 2

Ya tienes el **artefacto**. Si quieres un reto: abre `metadata.json` y mira qué contiene.

> 🔒 Recuerda: la API y el entrenamiento deben usar **la misma versión de scikit-learn**. Por eso la guardamos en la ficha (`"sklearn": "1.7.2"`).

👉 **Siguiente:** [Capítulo 3 · Crear la API](03_Crear_la_API.md)
