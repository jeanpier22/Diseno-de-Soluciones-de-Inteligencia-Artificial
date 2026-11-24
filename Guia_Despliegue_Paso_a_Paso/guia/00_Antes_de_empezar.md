# Capítulo 0 · Antes de empezar

**Tiempo estimado:** 30 a 40 minutos (casi todo es descargar e instalar).

Esta guía te lleva **desde cero** hasta tener tu propio modelo de inteligencia artificial funcionando en internet, con una página web que cualquiera puede abrir desde su celular. No necesitas recordar nada de otros cursos: aquí se explica todo.

---

## 0.1 · ¿Qué vamos a construir?

Un sistema que responde esta pregunta: **"Dado un socio de un gimnasio, ¿va a abandonar o se va a quedar?"**

```
   PERSONA                 FRONTEND                BACKEND                  MODELO
 (tú o tu jefe)         (página web)         (API con FastAPI)         (archivo .joblib)

  llena el      ──►   envía los datos   ──►   valida los datos   ──►   calcula la
  formulario          a la API                 y llama al modelo        probabilidad
                                                                              │
  ve el resultado ◄──  muestra el        ◄──   responde con la   ◄────────────┘
  "Riesgo ALTO"        resultado               predicción
```

Lo haremos en **7 etapas**. Cada etapa tiene un capítulo y una **prueba de que funciona**. No pases a la siguiente si la anterior no funciona.

| Etapa | Capítulo | Qué logras |
|---|---|---|
| 1 | Capítulo 1 | La carpeta del proyecto y Python listos |
| 2 | Capítulo 2 | Entrenar el modelo y guardarlo en un archivo |
| 3 | Capítulo 3 | Una API que usa ese archivo para predecir |
| 4 | Capítulo 4 | Una página web (frontend) conectada a la API |
| 5 | Capítulo 5 | Compartirla con ngrok (URL temporal) |
| 6 | Capítulo 6 | Empaquetarla con Docker |
| 7 | Capítulos 7 y 8 | Subirla a GitHub y desplegarla en Render (URL permanente) |

---

## 0.2 · Palabras que vas a escuchar (glosario rápido)

No hace falta memorizarlas. Vuelve aquí cuando algo no te suene.

| Palabra | Qué significa, en simple |
|---|---|
| **Modelo** | Un programa que aprendió patrones de datos y puede hacer predicciones. |
| **Entrenar** | El momento en que el modelo "aprende" mirando datos históricos. |
| **Artefacto** | El archivo donde guardas el modelo ya entrenado (`modelo.joblib`). Es lo único que la API necesita para predecir. |
| **API** | Una "ventanilla" de tu programa. Otros programas le envían datos y ella responde. Como un mesero: tú pides, él lleva el pedido a la cocina y te trae la respuesta. |
| **Backend** | La parte que corre en el servidor y que el usuario no ve (la API y el modelo). |
| **Frontend** | La parte que ve y toca el usuario (la página web con el formulario). |
| **Endpoint** | Una dirección concreta de la API. Ejemplo: `/predict` es la ventanilla de predicciones. |
| **JSON** | El formato en que se envían los datos por internet: `{"plan": "Basico", "quejas_6m": 3}`. |
| **localhost** | "Mi propio computador". `http://localhost:8000` significa "el programa que corre aquí, en el puerto 8000". |
| **Puerto** | Un número (como 8000) que identifica qué programa de tu computador atiende. Como el número de una ventanilla. |
| **Entorno virtual (.venv)** | Una carpeta con las librerías de Python solo de este proyecto, para que no se mezclen con las de otros. |
| **Docker** | Una herramienta que mete tu programa y todo lo que necesita en una "caja" que funciona igual en cualquier computador. |
| **Imagen / Contenedor** | Imagen = la caja cerrada. Contenedor = la caja abierta y funcionando. |
| **Despliegue** | Poner tu programa en un servidor de internet para que cualquiera lo use, con tu computador apagado. |

---

## 0.3 · Instalar lo necesario

Instala **una sola vez** lo siguiente. Después de cada instalación hay un comando para comprobar que quedó bien.

> **Cómo abrir una terminal en Windows:** presiona la tecla `Windows`, escribe **PowerShell** y presiona Enter. Más adelante usaremos la terminal que trae VS Code.

### 1) Python 3.12

1. Entra a <https://www.python.org/downloads/> y descarga Python 3.12.
2. Ejecuta el instalador. **MUY IMPORTANTE:** en la primera pantalla marca la casilla **"Add python.exe to PATH"** antes de presionar *Install Now*.
3. Cierra y vuelve a abrir PowerShell, y comprueba:

```powershell
python --version
```

✅ **Deberías ver:** `Python 3.12.x` (o una versión 3.11 / 3.13, también sirven).

⚠️ **Si dice** *"python no se reconoce como un comando"*: olvidaste marcar "Add to PATH". Desinstala Python, instálalo de nuevo y marca la casilla.

### 2) Visual Studio Code (el editor)

1. Descárgalo de <https://code.visualstudio.com/> e instálalo con las opciones por defecto.
2. Ábrelo, haz clic en el icono de **Extensiones** (cuadritos, a la izquierda) y busca e instala: **Python** (de Microsoft).

### 3) Git (para subir tu proyecto a GitHub)

1. Descárgalo de <https://git-scm.com/download/win> e instálalo dejando **todas las opciones por defecto** (Next, Next, Next...).
2. Reabre PowerShell y comprueba:

```powershell
git --version
```

✅ **Deberías ver:** algo como `git version 2.4x.x.windows.1`.

### 4) Docker Desktop

1. Descárgalo de <https://www.docker.com/products/docker-desktop/> e instálalo. Si te pide activar **WSL 2**, acepta y reinicia el computador.
2. **Ábrelo** (busca "Docker Desktop" en el menú Inicio) y espera a que abajo a la izquierda diga **"Engine running"** (en verde). Puede tardar un par de minutos.
3. Comprueba:

```powershell
docker --version
```

✅ **Deberías ver:** `Docker version 2x.x.x, build ...`

> Docker Desktop **debe estar abierto** cada vez que uses Docker (Capítulo 6).

### 5) Tres cuentas gratuitas

Créalas ahora para no detenerte después:

| Cuenta | Sitio | Para qué la usarás |
|---|---|---|
| **GitHub** | <https://github.com> | Guardar tu código en internet |
| **ngrok** | <https://ngrok.com> | Compartir tu API temporalmente |
| **Render** | <https://render.com> | Desplegar tu API (regístrate con el botón "GitHub") |

---

## 0.4 · Lista de verificación

Marca cada casilla antes de pasar al Capítulo 1:

- [ ] `python --version` funciona
- [ ] VS Code instalado con la extensión Python
- [ ] `git --version` funciona
- [ ] Docker Desktop abierto, dice "Engine running", y `docker --version` funciona
- [ ] Tengo cuenta de GitHub, ngrok y Render
- [ ] Tengo la carpeta de esta guía (con la subcarpeta `datos`, que trae `gimnasio_socios.csv`)

👉 **Siguiente:** [Capítulo 1 · Crear el proyecto](01_Crear_el_proyecto.md)
