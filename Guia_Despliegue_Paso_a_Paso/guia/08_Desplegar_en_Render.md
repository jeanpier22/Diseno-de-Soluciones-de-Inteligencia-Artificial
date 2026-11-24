# Capítulo 8 · Desplegar en Render

**Tiempo estimado:** 20 minutos (más unos 5 a 10 de espera mientras Render construye).
**Qué vas a lograr:** una **URL permanente** (`https://...onrender.com`) que funciona aunque tu computador esté apagado.

---

## 8.1 · La idea

Hasta ahora tu API funcionaba solo mientras tu PC estaba encendida. **Desplegar** es ponerla en un servidor de internet que está siempre disponible. **Render** es una plataforma que hace esto por ti: descarga tu repositorio de GitHub, construye tu `Dockerfile` (el mismo del Capítulo 6) y publica el resultado con **HTTPS** incluido.

```
 GitHub (tu código) ──► Render descarga ──► docker build ──► contenedor en internet
                                                              https://api-abandono-xxxx.onrender.com
```

> ℹ️ Las pantallas de Render pueden cambiar de nombre o de lugar con el tiempo. Si algún botón no está donde dice la guía, busca uno parecido: la idea es la misma.

---

## 8.2 · Crear el servicio

1. Entra a <https://render.com> e inicia sesión (con el botón **GitHub**, si te registraste así).
2. En el panel, presiona **New +** (o **Add new**) → **Web Service**.
3. Elige **Build and deploy from a Git repository** → **Next**.
4. Si es la primera vez, presiona **Connect GitHub** (o *Configure account*) y autoriza a Render. Puedes darle acceso solo al repositorio **`api-abandono`** (recomendado).
5. En la lista, busca **`api-abandono`** y presiona **Connect**.

---

## 8.3 · Configurar

Render muestra un formulario. Revisa **estos** campos y deja los demás por defecto:

| Campo | Qué poner |
|---|---|
| **Name** | `api-abandono` (será parte de tu URL; si ya existe, agrégale tus iniciales) |
| **Language** | **Docker** ← muy importante (Render detecta tu `Dockerfile`) |
| **Branch** | `main` |
| **Region** | La más cercana disponible a ti |
| **Root Directory** | **Déjalo vacío** (tu `Dockerfile` está en la raíz) |
| **Instance Type** | **Free** (gratis) |

Baja hasta **Advanced** (opciones avanzadas), ábrelo y busca:

| Campo | Qué poner |
|---|---|
| **Health Check Path** | `/health` |

(Con esto Render sabe si tu API arrancó bien consultando la ruta `/health` que programaste.)

No necesitas variables de entorno: tu `Dockerfile` ya respeta la variable `PORT` que Render define solo.

Presiona **Create Web Service** (o **Deploy**).

---

## 8.4 · Mirar el despliegue

Render te lleva a una pantalla con los **registros (Logs)** en vivo. Verás pasar, en orden:

1. Descarga de tu repositorio de GitHub.
2. Las líneas del `docker build`: instalar librerías y **`RUN python train.py`** (el modelo se entrena allí).
3. Subida de la imagen.
4. El arranque: `Uvicorn running on http://0.0.0.0:10000` (Render usa el puerto 10000 por defecto y tu API lo respeta).

Tarda **5 a 10 minutos** la primera vez. Cuando termine, arriba aparece un estado verde **Live** y debajo tu URL pública:

```
https://api-abandono-xxxx.onrender.com
```

---

## 8.5 · Probarlo

1. Abre tu URL en el navegador → debe aparecer **tu formulario**. Haz una predicción. 🎉
2. Agrega `/health` → debe responder `{"estado":"ok","modelo_cargado":true}`.
3. Agrega `/docs` → documentación interactiva.
4. Mándasela a un compañero o ábrela desde tu celular. **Tu computador puede estar apagado.**

📸 **Evidencia sugerida:** captura del formulario abierto con la URL `onrender.com` visible.

---

## 8.6 · Lo que debes saber del plan gratuito

- **Se "duerme":** tras unos 15 minutos sin visitas, Render apaga el servicio para ahorrar. La **primera visita** después de eso puede tardar cerca de **1 minuto** en responder mientras despierta. Es normal, no está roto.
- Es ideal para clases y demos, **no** para un producto real con clientes.
- **Es público y sin clave:** cualquiera con tu enlace puede usarlo. No pongas datos reales ni confidenciales.

---

## 8.7 · Actualizar tu API

Cada vez que hagas `git push` a `main`, Render **se vuelve a desplegar solo**:

```powershell
git add .
git commit -m "Cambio en el formulario"
git push
```

Puedes ver el progreso en la pestaña **Events** o **Logs** de tu servicio.

---

## 8.8 · Apagar o borrar (cuando termines el curso)

En tu servicio: **Settings** → baja hasta el final → **Suspend Web Service** (pausa) o **Delete Web Service** (borra).

---

⚠️ **Si algo falla:**

| Síntoma | Qué hacer |
|---|---|
| El despliegue falla en `COPY backend/data` o `train.py` | El CSV o `train.py` no se subieron a GitHub. Revisa en GitHub que `backend/data/gimnasio_socios.csv` exista. |
| `failed to read dockerfile` | El `Dockerfile` no está en la **raíz** del repositorio, o **Root Directory** tiene algo escrito. |
| El despliegue termina pero dice **"Port scan timeout"** / no detecta puerto | Revisa que el `CMD` del Dockerfile tenga `--host 0.0.0.0` y `${PORT:-8000}`. |
| El estado queda en **Deploy failed** | Abre **Logs**, busca la primera línea con `ERROR` (en rojo) y lee el mensaje. Casi siempre es un archivo faltante o un error de escritura en un archivo. |
| La página tarda un minuto en abrir | Es el plan gratuito despertando (ver 8.6). Espera. |
| Funciona local pero en Render sale **Not Found** en `/` | La carpeta `frontend/` no se subió. Revisa que `frontend/index.html` esté en GitHub. |

---

## 🎓 ¡Lo lograste!

Recorriste el camino completo de un proyecto de IA:

```
 Datos sucios → Limpieza → Entrenamiento → modelo.joblib → API (FastAPI)
      → Frontend → Pruebas locales → ngrok → Docker → GitHub → Render (URL permanente)
```

Para llevarlo a un producto real, faltarían: una **clave de acceso (API key)**, **registro de las predicciones**, **monitoreo** y un **plan de reentrenamiento** (los modelos se degradan cuando el mundo cambia).

👉 Si te atascas, revisa el [Capítulo 9 · Problemas frecuentes](09_Problemas_frecuentes.md).
