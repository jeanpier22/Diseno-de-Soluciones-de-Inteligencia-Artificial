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
