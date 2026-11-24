# ---------- Etapa 1: entrenar el modelo DENTRO de la imagen ----------
FROM python:3.12-slim AS entrenamiento
WORKDIR /build
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/train.py .
COPY backend/data ./data
RUN python train.py

# ---------- Etapa 2: imagen final, solo lo necesario para servir ----------
FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1 FRONTEND_DIR=/srv/frontend
WORKDIR /srv
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/app ./app
COPY --from=entrenamiento /build/models ./models
COPY frontend ./frontend

# Usuario sin privilegios (buena practica de seguridad)
RUN useradd --create-home api
USER api

EXPOSE 8000

# Cada 30 s pregunta a /health si la API esta viva (por eso docker ps muestra "healthy")
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s \
  CMD python -c "import os, urllib.request as u; u.urlopen('http://localhost:' + os.environ.get('PORT', '8000') + '/health')" || exit 1

# Render define la variable PORT; en tu PC no existe y se usa 8000.
# --host 0.0.0.0 es obligatorio: sin el, el contenedor no responde desde fuera.
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
