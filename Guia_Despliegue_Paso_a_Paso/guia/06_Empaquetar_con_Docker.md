# Capítulo 6 · Empaquetar con Docker

**Tiempo estimado:** 30 minutos (la primera construcción tarda varios minutos).
**Qué vas a lograr:** meter tu API, tu frontend y tu modelo en una "caja" que funciona igual en cualquier computador o servidor.

---

## 6.1 · La idea

"En mi computador sí funciona" es el problema de siempre: el servidor tiene otra versión de Python, falta una librería... **Docker** lo resuelve empaquetando todo.

```
  Dockerfile ──docker build──►  IMAGEN  ──docker run──►  CONTENEDOR
  (la receta)                  (la caja cerrada:         (la caja funcionando:
                                Python + librerías        tu API viva)
                                + código + modelo)
```

- **Imagen** = plantilla cerrada e inmutable. De una imagen puedes levantar muchos contenedores.
- **Contenedor** = esa imagen ejecutándose.
- **Dockerfile** = el archivo con la receta para construir la imagen.

Es también el formato que aceptan Render, Railway, Google Cloud Run y AWS para desplegar.

---

## 6.2 · Antes de empezar

1. **Cierra la API local** (en su terminal, `Ctrl` + `C`) y cierra ngrok si sigue abierto. El contenedor usará el mismo puerto 8000 y chocaría.
2. **Abre Docker Desktop** y espera a que diga **"Engine running"**.
3. Comprueba que Docker responde:

```powershell
docker version
```

✅ Debe mostrar dos secciones, **Client** y **Server**. Si en **Server** aparece un error de conexión, Docker Desktop no terminó de arrancar: espera un minuto y repite.

---

## 6.3 · Crear el `Dockerfile`

> 📍 **Importante:** este archivo va en la **raíz** del proyecto (la carpeta `api-abandono`, al lado de `backend` y `frontend`), **no** dentro de `backend`.

1. En el Explorador de VS Code, clic derecho en un espacio vacío de la raíz → **Nuevo archivo** → `Dockerfile` (sin extensión, con D mayúscula).
2. Pega este contenido y guarda:

```dockerfile
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
```

### ¿Qué hace la receta?

| Línea | Qué hace |
|---|---|
| `FROM python:3.12-slim AS entrenamiento` | Empieza desde una imagen con Python 3.12 (versión liviana). Esta es la **etapa 1**. |
| `RUN pip install ...` | Instala las librerías dentro de la imagen. |
| `RUN python train.py` | **Entrena el modelo dentro de la imagen.** No necesitas entrenar antes. |
| `FROM python:3.12-slim` (segunda vez) | Empieza la **etapa 2**: la imagen final, limpia. |
| `COPY --from=entrenamiento ...` | Trae **solo el modelo** de la etapa 1. Todo el resto de la etapa 1 se descarta, así la imagen final es más liviana. |
| `USER api` | La API corre con un usuario sin privilegios (buena práctica de seguridad). |
| `HEALTHCHECK ...` | Cada 30 s pregunta a `/health` si la API está sana. |
| `CMD [... "--host", "0.0.0.0" ...]` | El comando que arranca la API. **`--host 0.0.0.0` es obligatorio**: sin él, el contenedor no responde desde fuera de sí mismo. |
| `${PORT:-8000}` | "Usa la variable `PORT` si existe; si no, usa 8000". Render define `PORT`; en tu PC no, y se usa 8000. |

---

## 6.4 · Crear `.dockerignore` y `.gitignore`

Son listas de archivos que **no** deben entrar a la imagen ni a GitHub (la carpeta `.venv` pesa cientos de MB y no sirve fuera de tu PC).

**`.dockerignore`** (en la raíz):

```text
.venv/
**/__pycache__/
.git/
backend/models/
README.md
```

**`.gitignore`** (en la raíz; lo usaremos en el Capítulo 7):

```text
.venv/
__pycache__/
backend/models/
```

---

## 6.5 · Construir la imagen

Vuelve a la **raíz** del proyecto. Si tu terminal quedó dentro de `backend`, ejecuta:

```powershell
cd ..
```

La línea debe terminar en `...\api-abandono>`. Ahora construye:

```powershell
docker build -t api-abandono:1.0 .
```

| Parte | Significado |
|---|---|
| `docker build` | "Construye una imagen". |
| `-t api-abandono:1.0` | Ponle de nombre `api-abandono` y versión `1.0`. |
| `.` | **No olvides el punto**: significa "usa los archivos de esta carpeta". |

✅ **Deberías ver** muchas líneas `[entrenamiento 3/6] RUN pip install...` y al final algo como `naming to docker.io/library/api-abandono:1.0`. La primera vez tarda **3 a 8 minutos** (descarga Python e instala librerías). Las siguientes veces es mucho más rápido.

---

## 6.6 · Encender el contenedor

```powershell
docker run -p 8000:8000 --name api-abandono api-abandono:1.0
```

| Parte | Significado |
|---|---|
| `docker run` | "Enciende un contenedor". |
| `-p 8000:8000` | Conecta el puerto 8000 de **tu PC** con el puerto 8000 **del contenedor**. Sin esto, no podrías entrar. |
| `--name api-abandono` | Le pone nombre al contenedor para encontrarlo fácil. |
| `api-abandono:1.0` | La imagen que usará. |

✅ **Deberías ver** `Uvicorn running on http://0.0.0.0:8000`.

Abre **<http://localhost:8000/>** → es el **mismo formulario**, pero ahora corriendo dentro de un contenedor. Haz una predicción para comprobarlo.

### Comprobar la salud

Abre una **segunda terminal** (botón `+`) y ejecuta:

```powershell
docker ps
```

✅ La columna **STATUS** debe decir `Up ... (healthy)` (la primera vez puede decir `(health: starting)`; espera 20 segundos y repite).

📸 **Evidencia sugerida:** captura de `docker ps` con `(healthy)` y del formulario en `localhost:8000`.

---

## 6.7 · (Opcional) Simular lo que hará Render

Render le dice a tu programa en qué puerto escuchar mediante la variable `PORT`. Pruébalo: apaga el contenedor (`Ctrl` + `C` en su terminal) y ejecuta:

```powershell
docker rm api-abandono
docker run -p 9000:9000 -e PORT=9000 --name api-abandono api-abandono:1.0
```

Ahora la API vive en **<http://localhost:9000/>**. Así comprobaste que tu imagen respeta `PORT`.

---

## 6.8 · Apagar y limpiar

Para apagar: `Ctrl` + `C` en la terminal del contenedor (o `docker stop api-abandono`). Para borrar el contenedor y poder reutilizar el nombre:

```powershell
docker rm api-abandono
```

Comandos útiles:

| Comando | Para qué |
|---|---|
| `docker ps` | Ver contenedores encendidos |
| `docker ps -a` | Ver todos, también los apagados |
| `docker logs api-abandono` | Ver lo que "dijo" el contenedor (para buscar errores) |
| `docker images` | Ver las imágenes que tienes |
| `docker stop api-abandono` | Apagar |
| `docker rm api-abandono` | Borrar el contenedor |

---

⚠️ **Si algo falla:**

| Síntoma | Causa y solución |
|---|---|
| `error during connect ... dockerDesktopLinuxEngine` | Docker Desktop no está abierto. Ábrelo y espera "Engine running". |
| `docker: Error response ... port is already allocated` / `address already in use` | La API local (o ngrok) sigue usando el puerto 8000. Ciérrala. |
| `The container name "/api-abandono" is already in use` | Ya existe un contenedor con ese nombre: `docker rm api-abandono`. |
| `failed to read dockerfile` / `no such file` | Estás en la carpeta equivocada. Ejecuta `docker build` desde la **raíz**, donde está el `Dockerfile`. |
| `COPY failed: file not found` | Falta alguna carpeta (`backend/data`, `frontend`...). Revisa tu estructura. |
| Abre `localhost:8000` pero no responde | Falta `--host 0.0.0.0` en el `CMD` del Dockerfile. |
| `STATUS: unhealthy` | La API no arrancó. Mira el motivo con `docker logs api-abandono`. |

---

## ✔️ Fin del Capítulo 6

Tu proyecto ya es una **imagen portátil**. Solo falta ponerla en un servidor de internet. Para eso, Render necesita leer tu código desde GitHub.

👉 **Siguiente:** [Capítulo 7 · Subir el proyecto a GitHub](07_Subir_a_GitHub.md)
