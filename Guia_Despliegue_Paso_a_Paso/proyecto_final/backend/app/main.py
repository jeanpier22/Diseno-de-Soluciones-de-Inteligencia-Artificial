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
