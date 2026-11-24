# Capítulo 3 · Crear la API (backend)

**Tiempo estimado:** 30 minutos.
**Qué vas a lograr:** una API que carga tu `modelo.joblib` y responde predicciones por internet.

---

## 3.1 · ¿Qué es una API?

Piensa en un restaurante:

- **Tú (el cliente)** pides un plato. No entras a la cocina.
- **El mesero (la API)** toma tu pedido, lo revisa ("¿el plato existe?") y lo lleva a la cocina.
- **La cocina (el modelo)** prepara la respuesta.
- El mesero te trae el resultado.

Tu API tendrá estas "ventanillas" (**endpoints**):

| Método y ruta | Para qué sirve |
|---|---|
| `GET /health` | Pregunta "¿estás vivo?". La usan Docker y Render para saber si arrancó bien. |
| `GET /model-info` | Devuelve la versión, variables y métricas del modelo. |
| `POST /predict` | Recibe los datos de un socio y devuelve la predicción. |
| `GET /` | Muestra la página web (el frontend, Capítulo 4). |
| `GET /docs` | Documentación interactiva **automática** (¡regalo de FastAPI!). |

**GET** = "dame información". **POST** = "te envío datos para que los procese".

---

## 3.2 · Crear el archivo `main.py`

1. Clic derecho sobre la carpeta `backend\app` → **Nuevo archivo** → `main.py`.
2. Pega **todo** este código y guarda (`Ctrl` + `S`):

```python
"""API del modelo de abandono de socios.

Arrancar (desde la carpeta backend):   uvicorn app.main:app --reload
"""
import json
import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Literal

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

BACKEND = Path(__file__).resolve().parent.parent
MODELOS = BACKEND / "models"
# En tu PC el frontend esta en ../frontend. En Docker se indica con la variable FRONTEND_DIR.
FRONTEND = Path(os.getenv("FRONTEND_DIR", BACKEND.parent / "frontend"))

ml = {}  # aqui guardamos el modelo ya cargado


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Se ejecuta UNA vez al arrancar: carga el modelo en memoria
    ml["modelo"] = joblib.load(MODELOS / "modelo.joblib")
    ml["ficha"] = json.loads((MODELOS / "metadata.json").read_text(encoding="utf-8"))
    yield
    ml.clear()


app = FastAPI(title="API de abandono de socios", version="1.0", lifespan=lifespan)


class Socio(BaseModel):
    """Los datos que debe enviar el cliente. Si algo no cumple, la API responde 422."""

    visitas_mes: float = Field(ge=0, le=31, examples=[3])
    clases_grupales_mes: int = Field(ge=0, le=60, examples=[0])
    quejas_6m: int = Field(ge=0, le=50, examples=[2])
    cuota_mensual: float = Field(ge=30, le=400, examples=[79])
    meses_antiguedad: float = Field(ge=0, le=120, examples=[4])
    plan: Literal["Basico", "Estandar", "Premium"] = Field(examples=["Basico"])
    pago_automatico: Literal["Si", "No"] = Field(examples=["No"])


class Prediccion(BaseModel):
    """Lo que responde la API."""

    abandona: bool
    probabilidad: float
    version_modelo: str


@app.get("/health")
def health():
    """Pregunta '¿estas vivo?'. Docker y Render la usan para saber si la API arranco bien."""
    return {"estado": "ok", "modelo_cargado": "modelo" in ml}


@app.get("/model-info")
def model_info():
    """Version, variables y metricas del modelo."""
    return ml["ficha"]


@app.post("/predict", response_model=Prediccion)
def predict(socio: Socio):
    # 1. Convertir los datos recibidos en una tabla de 1 fila (igual que al entrenar)
    X = pd.DataFrame([socio.model_dump()])[ml["ficha"]["variables"]]
    # 2. Probabilidad de la clase 1 (abandona)
    prob = float(ml["modelo"].predict_proba(X)[0, 1])
    # 3. Responder
    return Prediccion(
        abandona=prob >= 0.5,
        probabilidad=round(prob, 3),
        version_modelo=ml["ficha"]["version_modelo"],
    )


# SIEMPRE al final: sirve la carpeta frontend/ en la ruta "/".
# Las rutas de arriba (/health, /predict...) tienen prioridad.
if FRONTEND.exists():
    app.mount("/", StaticFiles(directory=FRONTEND, html=True), name="frontend")
```

---

## 3.3 · ¿Qué hace cada parte?

| Parte | Qué hace |
|---|---|
| **`lifespan`** | Se ejecuta **una sola vez al arrancar** y carga el modelo en memoria. Si lo cargara en cada petición, la API sería muy lenta. |
| **`class Socio`** | Define **qué datos debe enviar el cliente** y sus reglas: `visitas_mes` entre 0 y 31, `plan` solo `Basico`/`Estandar`/`Premium`, etc. Si los datos no cumplen, FastAPI responde **422** sin llegar al modelo. |
| **`class Prediccion`** | Define **cómo responde** la API: `abandona` (sí/no), `probabilidad` y `version_modelo`. |
| **`/health`** | Devuelve `{"estado": "ok"}`. Simple, pero vital para producción. |
| **`/predict`** | Convierte lo recibido en una tabla de 1 fila, le pide la probabilidad al modelo y responde. El umbral es `prob >= 0.5` (si la probabilidad es del 50 % o más, decimos "abandona"). |
| **`app.mount(...)` al final** | Sirve la carpeta `frontend/` en la ruta `/`. Va **al final** para que las rutas de la API tengan prioridad. |

> 💡 **¿Por qué validar la entrada?** Un modelo en producción **falla en silencio**: si le das basura, no da error, da una predicción equivocada. Por eso se valida "en la puerta". Es la misma idea de la limpieza de la Sesión 3, pero con los datos nuevos.

Tu estructura ahora:

```
backend/
├── app/
│   ├── __init__.py
│   └── main.py          ← nuevo
├── data/gimnasio_socios.csv
├── models/              ← creada por train.py
│   ├── modelo.joblib
│   └── metadata.json
├── requirements.txt
└── train.py
```

---

## 3.4 · Encender la API

Asegúrate de estar **dentro de `backend`** y con el entorno `(.venv)` activo. La línea debe terminar en `...\api-abandono\backend>`. Si no, ejecuta `cd backend`.

```powershell
uvicorn app.main:app --reload --port 8000
```

**Qué significa cada parte:**

| Parte | Significado |
|---|---|
| `uvicorn` | El servidor que ejecuta la API. |
| `app.main:app` | "En la carpeta `app`, archivo `main.py`, usa el objeto llamado `app`". |
| `--reload` | Reinicia solo cada vez que guardas un cambio (útil para desarrollar). |
| `--port 8000` | Atiende en el puerto 8000. |

✅ **Deberías ver:**

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process ...
INFO:     Application startup complete.
```

La terminal **se queda ocupada**: eso es lo normal (el servidor está encendido). **No la cierres.**

---

## 3.5 · Probar la API sin escribir código

1. Abre tu navegador en **<http://localhost:8000/docs>**.
2. Verás la lista de endpoints. Haz clic en **`POST /predict`** → botón **Try it out**.
3. Reemplaza el contenido del cuadro por este socio (**riesgo alto**: pocas visitas, 3 quejas, sin pago automático):

```json
{
  "visitas_mes": 2,
  "clases_grupales_mes": 0,
  "quejas_6m": 3,
  "cuota_mensual": 79,
  "meses_antiguedad": 3,
  "plan": "Basico",
  "pago_automatico": "No"
}
```

4. Presiona **Execute** y baja hasta **Response body**.

✅ **Deberías ver:**

```json
{
  "abandona": true,
  "probabilidad": 0.882,
  "version_modelo": "1.0"
}
```

5. **Prueba ahora un socio fiel** (cambia los datos): `visitas_mes` 18, `clases_grupales_mes` 5, `quejas_6m` 0, `cuota_mensual` 119, `meses_antiguedad` 24, `plan` `Premium`, `pago_automatico` `Si`.
   Resultado esperado: `"abandona": false` con probabilidad muy baja (cerca de 0,01).

6. **Prueba un dato inválido:** pon `"visitas_mes": 400`. Debe responder **422** con un mensaje como *"Input should be less than or equal to 31"*. ¡Tu API se defiende de datos imposibles!

7. Prueba también **`GET /health`** y **`GET /model-info`** (Try it out → Execute).

⚠️ **Si algo falla:**

| Mensaje | Qué hacer |
|---|---|
| `Error loading ASGI app` / `No module named 'app'` | Estás fuera de `backend`. Ejecuta `cd backend` y vuelve a lanzar `uvicorn`. |
| `FileNotFoundError: ... modelo.joblib` | Falta entrenar: ejecuta `python train.py` (Capítulo 2). |
| `address already in use` | Ya hay otra API en el puerto 8000. Ciérrala o usa `--port 8001`. |
| `ModuleNotFoundError` | Falta activar el entorno `(.venv)`. |

---

## ✔️ Fin del Capítulo 3

Tu backend funciona. **Deja la API encendida** y pasa al siguiente capítulo. (Para apagarla algún día: en su terminal presiona `Ctrl` + `C`.)

👉 **Siguiente:** [Capítulo 4 · El frontend y la prueba en local](04_Frontend_y_prueba_local.md)
