# Guía paso a paso: del modelo entrenado a una API en internet

**Curso:** Diseño de Soluciones de Inteligencia Artificial · CERTUS

Esta guía te lleva **desde cero** hasta tener tu modelo de IA funcionando en internet, con un **backend** (API) y un **frontend** (página web sencilla). Está pensada para que la sigas **tú solo, sin ayuda de ninguna IA**: cada comando está escrito, explicado y con lo que deberías ver al ejecutarlo.

> **Resultado final:** una dirección como `https://api-abandono-xxxx.onrender.com` que cualquiera puede abrir desde su celular para saber si un socio de gimnasio abandonará o no.

---

## Cómo usar esta guía

1. **Sigue los capítulos en orden.** Cada uno termina con una prueba; si no pasa, no avances.
2. **Copia y pega el código** de los recuadros. Respeta las mayúsculas, los espacios y las comillas.
3. **Lee los "✅ Deberías ver"** para comparar con tu pantalla, y los "⚠️ Si algo falla" cuando te atasques.
4. Si te pierdes, compara tus archivos con la carpeta **`proyecto_final`**: es el proyecto completo y probado.

## Los capítulos

| # | Capítulo | Tiempo | Qué logras |
|---|---|---|---|
| 0 | [Antes de empezar](guia/00_Antes_de_empezar.md) | 30-40 min | Entender qué construirás e instalar Python, VS Code, Git, Docker y las cuentas |
| 1 | [Crear el proyecto](guia/01_Crear_el_proyecto.md) | 20 min | Carpetas, entorno virtual y librerías |
| 2 | [Entrenar y guardar el modelo](guia/02_Entrenar_y_guardar_el_modelo.md) | 25 min | `train.py` → `modelo.joblib` |
| 3 | [Crear la API](guia/03_Crear_la_API.md) | 30 min | Backend con FastAPI, probado en `/docs` |
| 4 | [Frontend y prueba en local](guia/04_Frontend_y_prueba_local.md) | 25 min | Formulario web conectado a la API |
| 5 | [Compartir con ngrok](guia/05_Compartir_con_ngrok.md) | 15 min | URL temporal para probar desde el celular |
| 6 | [Empaquetar con Docker](guia/06_Empaquetar_con_Docker.md) | 30 min | Imagen y contenedor `(healthy)` |
| 7 | [Subir a GitHub](guia/07_Subir_a_GitHub.md) | 20 min | Tu código en internet |
| 8 | [Desplegar en Render](guia/08_Desplegar_en_Render.md) | 30 min | **URL permanente** |
| 9 | [Problemas frecuentes](guia/09_Problemas_frecuentes.md) | consulta | Tabla de errores y soluciones |

**Tiempo total aproximado:** 3 a 4 horas, con calma.

## Qué hay en esta carpeta

```
Guia_Despliegue_Paso_a_Paso/
├── README.md              ← estás aquí
├── guia/                  los capítulos, del 00 al 09
├── datos/
│   └── gimnasio_socios.csv    los datos de entrenamiento (los necesitas en el Capítulo 1)
└── proyecto_final/        el proyecto completo, probado (para comparar)
```

## El proyecto de un vistazo

```
api-abandono/
├── backend/                    lo que corre en el servidor
│   ├── app/main.py             la API (FastAPI)
│   ├── data/gimnasio_socios.csv
│   ├── train.py                limpia, entrena y guarda el modelo
│   ├── models/                 modelo.joblib y metadata.json (los crea train.py)
│   └── requirements.txt
├── frontend/
│   └── index.html              la página con el formulario
├── Dockerfile                  la receta para empaquetar todo
├── .dockerignore
└── .gitignore
```

## Evidencias que te pueden pedir

- [ ] Captura de `http://localhost:8000/docs` con una predicción (Capítulo 3)
- [ ] Captura del formulario con resultado rojo y verde (Capítulo 4)
- [ ] Captura de la URL de ngrok funcionando (Capítulo 5)
- [ ] Captura de `docker ps` con `(healthy)` (Capítulo 6)
- [ ] El enlace de tu repositorio de GitHub (Capítulo 7)
- [ ] El enlace `onrender.com` funcionando (Capítulo 8)

## Consejos para no perderte

- **Una terminal = una tarea.** La API encendida ocupa su terminal; para otros comandos abre una nueva con el botón `+`.
- **Toda terminal nueva** necesita `.venv\Scripts\activate` otra vez.
- **Guarda siempre** (`Ctrl` + `S`) antes de ejecutar: un archivo sin guardar no cambia nada.
- **`Ctrl` + `C`** apaga lo que esté corriendo en esa terminal.
- Si algo funcionaba y deja de funcionar, **vuelve a la última prueba que pasó** y avanza de nuevo desde ahí.
