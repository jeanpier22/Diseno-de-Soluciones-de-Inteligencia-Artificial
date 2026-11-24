# Capítulo 1 · Crear el proyecto

**Tiempo estimado:** 20 minutos.
**Qué vas a lograr:** una carpeta ordenada, un entorno virtual de Python y las librerías instaladas.

---

## 1.1 · Crear la carpeta y abrirla en VS Code

1. En el Explorador de archivos crea una carpeta llamada **`api-abandono`** en un lugar fácil (por ejemplo `Documentos`). **Evita** rutas con tildes o espacios raros si puedes.
2. Abre **VS Code**.
3. Menú **Archivo → Abrir carpeta...** y elige `api-abandono`. Si te pregunta *"¿Confías en los autores?"*, responde **Sí**.
4. Abre la terminal de VS Code: menú **Terminal → Nueva terminal** (atajo: `Ctrl` + `ñ`).

Se abre un panel abajo. Debería mostrar una ruta que termina en `api-abandono`:

```
PS C:\Users\TuUsuario\Documents\api-abandono>
```

> A partir de ahora **todos los comandos se escriben en esa terminal**, salvo que se diga lo contrario. Para ejecutar un comando, escríbelo (o pégalo) y presiona `Enter`.

---

## 1.2 · Crear la estructura de carpetas

Una API bien ordenada separa lo que corre en el servidor (**backend**) de lo que ve el usuario (**frontend**). Copia y pega esto:

```powershell
mkdir backend, backend\app, backend\data, frontend
New-Item backend\app\__init__.py -ItemType File
```

- `mkdir` = *make directory*: crea carpetas.
- `New-Item ... __init__.py`: crea un archivo vacío que le indica a Python que `app` es un paquete (un módulo importable). Sin él, `uvicorn` no encontrará tu código.

En el panel **Explorador** de VS Code (a la izquierda) deberías ver:

```
api-abandono/
├── backend/
│   ├── app/
│   │   └── __init__.py
│   └── data/
└── frontend/
```

---

## 1.3 · Copiar los datos

Los datos de entrenamiento son el archivo **`gimnasio_socios.csv`** (2.060 socios, con errores de captura a propósito: es el mismo de la Sesión 3).

1. Abre la carpeta de esta guía y entra a **`datos`**.
2. Copia `gimnasio_socios.csv` dentro de **`api-abandono\backend\data\`** (puedes arrastrarlo al panel Explorador de VS Code).

✅ **Comprobación:** en VS Code debes ver `backend/data/gimnasio_socios.csv`.

---

## 1.4 · Crear el entorno virtual

Un **entorno virtual** es una carpeta (`.venv`) donde se instalan las librerías de **este** proyecto, sin mezclarlas con otras. Así evitas el clásico "en mi computador sí funciona".

```powershell
python -m venv .venv
```

*(Demora unos segundos y no muestra nada si salió bien. Aparece una carpeta nueva `.venv`.)*

Ahora **actívalo**:

```powershell
.venv\Scripts\activate
```

✅ **Deberías ver** que la línea de la terminal ahora empieza con `(.venv)`:

```
(.venv) PS C:\Users\TuUsuario\Documents\api-abandono>
```

Ese `(.venv)` significa "estoy trabajando dentro del entorno del proyecto".

⚠️ **Si sale un error rojo** que dice *"la ejecución de scripts está deshabilitada en este sistema"*: es una protección de Windows. Ejecuta esto **una vez** y vuelve a intentar la activación:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

(Si te pregunta, escribe `S` y Enter.)

> 🔁 **Regla de oro:** cada vez que abras una **terminal nueva**, tienes que activar el entorno otra vez con `.venv\Scripts\activate`. Si ves que falta el `(.venv)`, actívalo.
>
> *Mac/Linux:* se activa con `source .venv/bin/activate`.

---

## 1.5 · Instalar las librerías

Las librerías que necesitamos se listan en un archivo llamado `requirements.txt`. Crea el archivo **`backend/requirements.txt`**:

1. En el Explorador, clic derecho sobre la carpeta `backend` → **Nuevo archivo** → escribe `requirements.txt`.
2. Pega este contenido y guarda con `Ctrl` + `S`:

```text
fastapi==0.139.2
uvicorn[standard]==0.51.0
pydantic==2.13.4
scikit-learn==1.7.2
pandas==2.3.2
numpy==2.5.1
joblib==1.5.2
```

| Librería | Para qué sirve |
|---|---|
| `fastapi` | Construir la API |
| `uvicorn` | El servidor que ejecuta la API |
| `pydantic` | Validar los datos que llegan a la API |
| `scikit-learn` | Entrenar el modelo |
| `pandas` | Manejar tablas de datos |
| `numpy` | Cálculo numérico |
| `joblib` | Guardar y cargar el modelo en un archivo |

> Las **versiones fijas** (`==1.7.2`) son importantes: el modelo se guarda y se carga con la **misma** versión de scikit-learn. Si no, puede fallar.

Ahora instálalas (con el entorno `(.venv)` activo):

```powershell
pip install -r backend\requirements.txt
```

Tarda 1 a 3 minutos y muestra mucho texto. Al final debe decir `Successfully installed ...`.

✅ **Comprobación:**

```powershell
pip list
```

Debes ver en la lista `fastapi`, `scikit-learn`, `pandas`, etc.

⚠️ **Si sale un error en rojo** al instalar, lee la última línea. Lo más común es tener una versión de Python muy distinta (usa 3.11, 3.12 o 3.13). Revisa el [Capítulo 9](09_Problemas_frecuentes.md).

---

## ✔️ Fin del Capítulo 1

Tu carpeta debe verse así (sin contar `.venv`):

```
api-abandono/
├── .venv/                      (la creó Python)
├── backend/
│   ├── app/
│   │   └── __init__.py
│   ├── data/
│   │   └── gimnasio_socios.csv
│   └── requirements.txt
└── frontend/
```

👉 **Siguiente:** [Capítulo 2 · Entrenar y guardar el modelo](02_Entrenar_y_guardar_el_modelo.md)
