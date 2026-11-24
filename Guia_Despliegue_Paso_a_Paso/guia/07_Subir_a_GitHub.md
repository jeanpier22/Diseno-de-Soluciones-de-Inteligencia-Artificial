# Capítulo 7 · Subir el proyecto a GitHub

**Tiempo estimado:** 20 minutos.
**Qué vas a lograr:** tu código guardado en internet, listo para que Render lo lea y lo despliegue.

---

## 7.1 · La idea

**Git** es un programa que guarda el historial de tu proyecto (como "versiones" de un documento). **GitHub** es el sitio web donde guardas ese historial en internet. Render se conecta a GitHub, **descarga tu código y construye tu Dockerfile**.

```
  Tu PC  ──git push──►  GitHub  ──(Render lo lee)──►  Render construye y publica
```

**Qué se sube y qué NO:**

| Se sube ✅ | No se sube ❌ (está en `.gitignore`) |
|---|---|
| `backend/` (código, `train.py`, `requirements.txt`, el CSV) | `.venv/` (pesa cientos de MB) |
| `frontend/` | `backend/models/` (el modelo se entrena dentro de Docker) |
| `Dockerfile`, `.dockerignore`, `.gitignore` | `__pycache__/` |

> Por eso es importante que el CSV **sí** esté en el repositorio: el Dockerfile lo necesita para entrenar el modelo durante la construcción.

---

## 7.2 · Presentarte ante Git (solo la primera vez)

Git necesita saber quién eres para firmar tus cambios. Usa **tu nombre** y **el correo de tu cuenta de GitHub**:

```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu_correo@ejemplo.com"
```

(No muestra nada si salió bien.)

---

## 7.3 · Crear el repositorio vacío en GitHub

Un **repositorio** es la carpeta de tu proyecto en GitHub.

1. Entra a <https://github.com> e inicia sesión.
2. Arriba a la derecha: botón **+** → **New repository**.
3. Completa:
   - **Repository name:** `api-abandono`
   - **Public** (público) o **Private** (privado): cualquiera sirve; con Render funciona con ambos.
   - ⚠️ **NO marques** *Add a README*, *.gitignore* ni *license*. El repositorio debe quedar **vacío**.
4. Presiona **Create repository**.

GitHub mostrará una página con instrucciones. Copia la dirección que termina en `.git`, por ejemplo:

```
https://github.com/TU_USUARIO/api-abandono.git
```

---

## 7.4 · Subir tu proyecto

En la terminal de VS Code, ubícate en la **raíz** del proyecto (la línea termina en `...\api-abandono>`) y ejecuta estos comandos **uno por uno**:

```powershell
git init
```
Convierte la carpeta en un repositorio de Git. *(Verás: `Initialized empty Git repository`.)*

```powershell
git add .
```
Marca **todos** los archivos para guardarlos (respetando `.gitignore`). El punto significa "todo lo de esta carpeta".

```powershell
git status
```
Te muestra qué se va a guardar. ✅ Revisa la lista: deben aparecer `Dockerfile`, `backend/...`, `frontend/...`. **No** deben aparecer `.venv` ni `models`. Si aparecen, tu `.gitignore` está mal escrito.

```powershell
git commit -m "Mi primera API de abandono de socios"
```
Guarda una "foto" (un *commit*) con ese mensaje.

```powershell
git branch -M main
```
Nombra `main` a la rama principal.

```powershell
git remote add origin https://github.com/TU_USUARIO/api-abandono.git
```
Conecta tu carpeta con el repositorio de GitHub. **Cambia `TU_USUARIO`** por tu usuario real (o pega la dirección que copiaste).

```powershell
git push -u origin main
```
**Sube** todo a GitHub.

La primera vez se abrirá una ventana del navegador pidiendo que **inicies sesión en GitHub** y autorices a Git. Acepta. (Si te pide usuario y contraseña en la terminal, la "contraseña" debe ser un *token* de GitHub, no tu clave normal; es más fácil usar el inicio de sesión por navegador.)

✅ **Deberías ver** al final algo como:

```
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 7.5 · Comprobar en GitHub

Actualiza la página de tu repositorio (`https://github.com/TU_USUARIO/api-abandono`). Debes ver en la **raíz**:

```
backend/
frontend/
.dockerignore
.gitignore
Dockerfile
```

Entra a `backend/data/` y confirma que está `gimnasio_socios.csv`.

> 🔑 El `Dockerfile` **debe estar en la raíz del repositorio** (no dentro de otra carpeta). Si lo ves dentro de una subcarpeta, Render no lo encontrará.

---

## 7.6 · Cómo subir cambios después

Cada vez que modifiques algo, son tres comandos:

```powershell
git add .
git commit -m "Describe qué cambiaste"
git push
```

Y Render (siguiente capítulo) **se vuelve a desplegar solo**.

---

⚠️ **Si algo falla:**

| Síntoma | Qué hacer |
|---|---|
| `git no se reconoce` | Reinstala Git (Capítulo 0) y reabre la terminal. |
| `Author identity unknown` | Faltó el paso 7.2 (`git config ...`). |
| `remote origin already exists` | Ya lo conectaste. Si la dirección está mal: `git remote set-url origin https://github.com/TU_USUARIO/api-abandono.git`. |
| `Repository not found` / `Authentication failed` | La dirección tiene mal el usuario, o no iniciaste sesión. Revisa la URL y vuelve a ejecutar `git push -u origin main`. |
| `rejected ... fetch first` | Marcaste "Add a README" al crear el repositorio. Bórralo y créalo de nuevo vacío. |
| `git status` muestra miles de archivos (`.venv`) | `.gitignore` mal escrito o no está en la raíz. Corrígelo, luego `git rm -r --cached .venv` y vuelve a hacer `git add .`. |

---

## ✔️ Fin del Capítulo 7

Tu código ya está en GitHub. Falta el último paso.

👉 **Siguiente:** [Capítulo 8 · Desplegar en Render](08_Desplegar_en_Render.md)
