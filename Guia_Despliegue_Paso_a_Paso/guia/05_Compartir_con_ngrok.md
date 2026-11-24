# Capítulo 5 · Compartir tu API con ngrok

**Tiempo estimado:** 15 minutos.
**Qué vas a lograr:** que otra persona (o tu celular, con datos móviles) abra tu formulario por internet.

---

## 5.1 · La idea

Hasta ahora tu API solo se ve desde **tu** computador (`localhost`). **ngrok** abre un "túnel": te da una dirección pública que apunta a tu computador.

```
 Celular / otra persona ──► https://xxxx.ngrok-free.app ──► túnel ngrok ──► localhost:8000 (tu API)
```

⚠️ **ngrok sirve para probar, no para producción:**

- La dirección **cambia** cada vez que reinicias ngrok.
- Mientras está abierto, tu API es **pública y sin clave**: cualquiera con el enlace puede usarla.
- Si apagas tu computador o cierras ngrok, deja de funcionar.

---

## 5.2 · Instalar ngrok y conectar tu cuenta (solo la primera vez)

1. Entra a <https://ngrok.com> e **inicia sesión** con tu cuenta.
2. En el panel, busca **Getting Started → Setup & Installation**. Elige **Windows** y sigue las instrucciones que muestra (descargar el programa o instalarlo con el comando que te indique).
3. **Cierra y vuelve a abrir** la terminal de VS Code. Comprueba:

```powershell
ngrok version
```

✅ **Deberías ver:** `ngrok version 3.x.x`.

4. En esa misma página, ngrok te muestra un comando con **tu token personal**. Cópialo y ejecútalo; se ve así (con **tu** token, no el de ejemplo):

```powershell
ngrok config add-authtoken TU_TOKEN_AQUI
```

✅ **Deberías ver:** `Authtoken saved to configuration file...`

> 🔒 **El token es como una contraseña.** No lo publiques, no lo pegues en GitHub ni lo compartas.

---

## 5.3 · Abrir el túnel

Necesitas **dos terminales**: una con la API encendida y otra con ngrok.

**Terminal 1 (la API).** Debe seguir encendida desde el capítulo anterior. Si no, enciéndela:

```powershell
cd backend
uvicorn app.main:app --port 8000
```

**Terminal 2 (ngrok).** Abre una terminal nueva con el botón **`+`** del panel de terminal de VS Code y ejecuta:

```powershell
ngrok http 8000
```

(`http 8000` = "expón por internet lo que está en el puerto 8000".)

✅ **Deberías ver** una pantalla como esta:

```
Session Status     online
Forwarding         https://a1b2-c3d4.ngrok-free.app -> http://localhost:8000
```

---

## 5.4 · Probarlo

1. Copia la dirección `https://....ngrok-free.app` de la línea **Forwarding**.
2. Pégala en el navegador. La primera vez ngrok muestra un aviso: presiona **Visit Site**.
3. ✅ Debe aparecer **tu formulario**. Presiona **Predecir** y comprueba que funciona.
4. Agrega `/docs` al final para ver la documentación: `https://....ngrok-free.app/docs`.
5. 📱 **Pásalo a tu celular** (ideal con datos móviles, no con el WiFi de tu casa) o a un compañero, y pídele que lo abra y haga una predicción.

📸 **Evidencia sugerida:** captura de la URL de ngrok funcionando.

---

## 5.5 · Cerrar (importante)

Cuando termines, **ciérralo**: en la terminal de ngrok presiona `Ctrl` + `C`. Así tu API deja de ser pública.

⚠️ **Si algo falla:**

| Síntoma | Qué hacer |
|---|---|
| `ngrok no se reconoce como un comando` | Cierra y reabre la terminal tras instalar. Si sigue igual, revisa que el instalador lo agregó al PATH. |
| `ERR_NGROK_4018` / "authentication failed" | Falta el token: repite el paso 4 de la sección 5.2. |
| La URL abre pero dice **"Bad Gateway"** / `ERR_NGROK_8012` | La API no está encendida en la Terminal 1. Enciéndela. |
| Funciona en tu PC pero no desde el celular | Verifica que copiaste la URL **https** completa. |

---

## ✔️ Fin del Capítulo 5

Ya sabes compartir una API de forma temporal. Para algo **permanente**, necesitamos empaquetarla y subirla a un servidor. Primero: Docker.

👉 **Siguiente:** [Capítulo 6 · Empaquetar con Docker](06_Empaquetar_con_Docker.md)
