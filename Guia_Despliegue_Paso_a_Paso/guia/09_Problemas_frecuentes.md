# Capítulo 9 · Problemas frecuentes

Busca tu mensaje de error en la tabla. Si no aparece, lee la **última línea** del error en rojo: casi siempre dice qué falta.

## Cómo leer un error (3 reglas)

1. **Lee la última línea.** Las de arriba son el "camino" que recorrió Python; la causa está al final.
2. **Copia el mensaje exacto** y búscalo aquí o en Google.
3. **Revisa lo básico primero:** ¿estoy en la carpeta correcta? ¿tengo `(.venv)` activo? ¿guardé el archivo (`Ctrl` + `S`)?

---

## Python y entorno

| Mensaje / síntoma | Causa | Solución |
|---|---|---|
| `python no se reconoce como un comando` | Python no está en el PATH | Reinstala Python y marca **Add python.exe to PATH**; reabre la terminal |
| `la ejecución de scripts está deshabilitada` al activar `.venv` | Protección de Windows | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` y vuelve a activar |
| No aparece `(.venv)` al inicio de la línea | El entorno no está activo | `.venv\Scripts\activate` (desde la raíz del proyecto) |
| `ModuleNotFoundError: No module named 'xxx'` | Falta instalar la librería o no está activo el entorno | Activa `(.venv)` y ejecuta `pip install -r backend\requirements.txt` |
| `ERROR: Could not find a version that satisfies the requirement ...` | Versión de Python muy nueva o muy vieja | Usa Python 3.11, 3.12 o 3.13 |
| `No such file or directory: 'backend\requirements.txt'` | Estás en la carpeta equivocada | Ejecuta `cd` hasta la raíz `api-abandono` |

## Entrenamiento (`train.py`)

| Mensaje / síntoma | Causa | Solución |
|---|---|---|
| `FileNotFoundError: ... gimnasio_socios.csv` | El CSV no está donde se espera | Debe estar en `backend/data/gimnasio_socios.csv` |
| `can't open file 'train.py'` | Estás fuera de `backend` | `cd backend` y vuelve a ejecutar |
| `KeyError: 'id_socio'` | El CSV es otro archivo o está dañado | Vuelve a copiar `gimnasio_socios.csv` desde la carpeta `datos` de la guía |

## API (`uvicorn`)

| Mensaje / síntoma | Causa | Solución |
|---|---|---|
| `Error loading ASGI app. Could not import module "app.main"` | Estás fuera de `backend` o falta `__init__.py` | `cd backend`; verifica que exista `backend/app/__init__.py` |
| `FileNotFoundError: ... modelo.joblib` | No entrenaste el modelo | `python train.py` dentro de `backend` |
| `[Errno 10048] ... address already in use` | El puerto 8000 está ocupado | Cierra la otra API/contenedor, o usa `--port 8001` |
| `422 Unprocessable Entity` | Un dato no cumple las reglas | Es **correcto**: lee qué campo falló (`loc`) y corrígelo |
| `500 Internal Server Error` | Error dentro de tu código | Mira la terminal de la API: ahí está el detalle (traceback) |
| `InconsistentVersionWarning` o falla al cargar `.joblib` | El modelo se entrenó con otra versión de scikit-learn | Vuelve a ejecutar `python train.py` en el mismo entorno donde corre la API |

## Frontend

| Mensaje / síntoma | Causa | Solución |
|---|---|---|
| `{"detail":"Not Found"}` en `/` | `frontend/index.html` no existe o la carpeta está mal ubicada | `frontend` debe estar **al lado** de `backend` |
| Predecir no hace nada | Error de JavaScript | `F12` → pestaña **Consola** → lee el error rojo |
| "No se pudo conectar con la API" | La API está apagada | Enciende `uvicorn` |
| Cambios del HTML que no se ven | Caché del navegador | `Ctrl` + `F5` |

## ngrok

| Mensaje / síntoma | Causa | Solución |
|---|---|---|
| `ngrok no se reconoce` | No instalado o terminal vieja | Reinstala y reabre la terminal |
| `ERR_NGROK_4018` | Falta el authtoken | `ngrok config add-authtoken TU_TOKEN` |
| `ERR_NGROK_8012` / Bad Gateway | La API local está apagada | Enciende `uvicorn` en otra terminal |

## Docker

| Mensaje / síntoma | Causa | Solución |
|---|---|---|
| `error during connect ... dockerDesktopLinuxEngine` | Docker Desktop cerrado | Ábrelo y espera "Engine running" |
| `port is already allocated` | Puerto 8000 ocupado | Cierra la API local y ngrok; `docker ps` para ver otros contenedores |
| `container name ... is already in use` | Ya existe ese contenedor | `docker rm api-abandono` |
| `failed to read dockerfile` | Carpeta equivocada | Ejecuta `docker build` desde la raíz |
| `localhost:8000` no responde con el contenedor encendido | Falta `--host 0.0.0.0` | Revisa el `CMD` del Dockerfile |
| `unhealthy` en `docker ps` | La API no arrancó | `docker logs api-abandono` |
| La construcción tarda muchísimo | Normal la primera vez | Espera; las siguientes usan caché |

## Git y GitHub

| Mensaje / síntoma | Causa | Solución |
|---|---|---|
| `Author identity unknown` | No configuraste nombre y correo | `git config --global user.name ...` y `user.email ...` |
| `Repository not found` | URL con usuario mal escrito | `git remote set-url origin https://github.com/USUARIO/api-abandono.git` |
| `rejected ... fetch first` | El repositorio no estaba vacío | Créalo de nuevo, sin README |
| `.venv` aparece en `git status` | `.gitignore` mal | Verifica que se llame exactamente `.gitignore` y esté en la raíz |

## Render

| Mensaje / síntoma | Causa | Solución |
|---|---|---|
| `failed to read dockerfile` | Dockerfile fuera de la raíz o **Root Directory** con texto | Muévelo a la raíz; vacía ese campo |
| Falla en `COPY backend/data` | El CSV no está en GitHub | Súbelo con `git add .`, `commit`, `push` |
| No detecta el puerto | `CMD` sin `--host 0.0.0.0` o sin `${PORT:-8000}` | Corrige el `CMD` y haz `git push` |
| La primera visita tarda ~1 minuto | Plan gratuito dormido | Espera; es normal |

---

## ¿Sigues atascado?

Antes de pedir ayuda, prepara estas tres cosas (te ahorran 10 minutos):

1. **El capítulo y el paso** donde te quedaste.
2. **El mensaje de error completo** (copia el texto, no solo una foto).
3. **Cómo se ve tu estructura de carpetas** (panel Explorador de VS Code).

Y recuerda que dentro de esta guía hay una carpeta **`proyecto_final`** con el proyecto completo y probado: compara tus archivos con los suyos.
