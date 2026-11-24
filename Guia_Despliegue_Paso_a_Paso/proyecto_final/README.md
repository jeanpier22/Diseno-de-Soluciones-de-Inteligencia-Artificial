# API de abandono de socios · proyecto final de la guía

Proyecto completo y probado: un modelo entrenado, una API (backend) y una página con formulario (frontend).
Sirve para **comparar con tus archivos** si te pierdes en la guía. La explicación paso a paso está en
`../guia/` (empieza por `../README.md`).

```
proyecto_final/
├── backend/
│   ├── app/main.py                API con FastAPI (/health, /model-info, /predict)
│   ├── data/gimnasio_socios.csv   datos de entrenamiento
│   ├── train.py                   limpia, entrena y guarda el modelo en models/
│   └── requirements.txt           librerías con versión fija
├── frontend/index.html            formulario que llama a /predict
├── Dockerfile                     imagen en dos etapas (entrena dentro de la imagen)
├── .dockerignore
└── .gitignore
```

## Probarlo en tu computador

Abre esta carpeta en VS Code, abre una terminal (PowerShell) y ejecuta:

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r backend\requirements.txt
cd backend
python train.py
uvicorn app.main:app --reload --port 8000
```

- Formulario: <http://localhost:8000/>
- Documentación de la API: <http://localhost:8000/docs>
- Salud: <http://localhost:8000/health>

Para apagar la API: `Ctrl` + `C`. Cada terminal nueva necesita `.venv\Scripts\activate` otra vez.

## Con Docker

Con **Docker Desktop abierto** y desde esta carpeta (la que contiene el `Dockerfile`):

```powershell
docker build -t api-abandono:1.0 .
docker run -p 8000:8000 --name api-abandono api-abandono:1.0
```

No hace falta entrenar antes: la imagen entrena el modelo al construirse. Luego abre
<http://localhost:8000/> y, en otra terminal, `docker ps` debe mostrar `(healthy)`.
Para limpiar: `docker stop api-abandono` y `docker rm api-abandono`.

## Desplegarlo en internet

Sube esta carpeta a un repositorio de GitHub (con el `Dockerfile` en la raíz) y conéctalo a Render como
*Web Service* con lenguaje **Docker**. Los pasos están en los capítulos 7 y 8 de la guía.

## Si algo falla

| Síntoma | Causa |
|---|---|
| `Error loading ASGI app` | Estás fuera de `backend/`: `cd backend` antes de `uvicorn` |
| `FileNotFoundError: ... modelo.joblib` | Falta `python train.py` (en Docker no hace falta) |
| `{"detail":"Not Found"}` en `/` | La carpeta `frontend/` no está junto a `backend/` |
| `error during connect ... dockerDesktopLinuxEngine` | Docker Desktop no está abierto |
| `address already in use` | El puerto 8000 está ocupado: cierra la otra API o contenedor |

Más errores y soluciones: `../guia/09_Problemas_frecuentes.md`.
