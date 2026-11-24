# Capítulo 4 · El frontend y la prueba en local

**Tiempo estimado:** 25 minutos.
**Qué vas a lograr:** una página web con un formulario que usa tu API. Todo funcionando en tu computador.

---

## 4.1 · La idea

La API ya predice, pero hablar con ella usando JSON no es para cualquier persona. El **frontend** es la parte "amable": un formulario donde la persona llena los datos y ve un resultado claro.

```
 Persona ─► Formulario (index.html) ─► fetch("/predict") ─► API ─► Modelo
                       ▲                                             │
                       └──────────────  respuesta JSON  ◄────────────┘
```

Para que sea **sencillo**, el frontend es **un solo archivo** (`index.html`) con HTML, estilos y un poco de JavaScript. No necesitas instalar nada más.

**El truco que lo simplifica todo:** la API ya sirve la carpeta `frontend/` en la ruta `/` (lo hicimos con `app.mount` al final de `main.py`). Entonces la página y la API viven en **el mismo servidor** y el formulario llama a `/predict` con una ruta relativa. Por eso funcionará igual en tu PC, con ngrok, en Docker y en Render, **sin cambiar nada**.

---

## 4.2 · Crear `index.html`

1. Clic derecho sobre la carpeta `frontend` → **Nuevo archivo** → `index.html`.
2. Pega **todo** este código y guarda (`Ctrl` + `S`):

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>¿Abandonará el socio?</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f2f4f8; margin: 0; padding: 24px; color: #1f2937; }
    .tarjeta { max-width: 460px; margin: 0 auto; background: #fff; padding: 24px; border-radius: 12px;
               box-shadow: 0 2px 10px rgba(0,0,0,.1); }
    h1 { font-size: 22px; margin-top: 0; }
    label { display: block; margin-top: 12px; font-size: 14px; font-weight: bold; }
    input, select { width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box;
                    border: 1px solid #cbd5e1; border-radius: 6px; font-size: 15px; }
    button { width: 100%; margin-top: 20px; padding: 12px; font-size: 16px; color: #fff;
             background: #2563eb; border: 0; border-radius: 8px; cursor: pointer; }
    button:hover { background: #1d4ed8; }
    #resultado { margin-top: 20px; padding: 16px; border-radius: 8px; display: none; font-size: 16px; }
    .riesgo { background: #fee2e2; color: #991b1b; }
    .fiel { background: #dcfce7; color: #166534; }
    .error { background: #fef9c3; color: #854d0e; }
  </style>
</head>
<body>
  <div class="tarjeta">
    <h1>¿Abandonará el socio del gimnasio?</h1>

    <form id="formulario">
      <label>Visitas al mes (0 a 31)
        <input type="number" name="visitas_mes" value="2" min="0" max="31" step="any" required></label>
      <label>Clases grupales al mes
        <input type="number" name="clases_grupales_mes" value="0" min="0" max="60" required></label>
      <label>Quejas en los últimos 6 meses
        <input type="number" name="quejas_6m" value="3" min="0" max="50" required></label>
      <label>Cuota mensual en S/ (30 a 400)
        <input type="number" name="cuota_mensual" value="79" min="30" max="400" step="any" required></label>
      <label>Meses de antigüedad
        <input type="number" name="meses_antiguedad" value="3" min="0" max="120" step="any" required></label>
      <label>Plan
        <select name="plan">
          <option value="Basico">Básico</option>
          <option value="Estandar">Estándar</option>
          <option value="Premium">Premium</option>
        </select></label>
      <label>¿Paga con débito automático?
        <select name="pago_automatico">
          <option value="No">No</option>
          <option value="Si">Sí</option>
        </select></label>

      <button type="submit">Predecir</button>
    </form>

    <div id="resultado"></div>
  </div>

  <script>
    const formulario = document.getElementById("formulario");
    const resultado = document.getElementById("resultado");

    // Estos campos son numeros; el resto (plan, pago_automatico) son texto
    const CAMPOS_NUMERICOS = ["visitas_mes", "clases_grupales_mes", "quejas_6m",
                              "cuota_mensual", "meses_antiguedad"];

    function mostrar(clase, html) {
      resultado.className = clase;
      resultado.innerHTML = html;
      resultado.style.display = "block";
    }

    formulario.addEventListener("submit", async (evento) => {
      evento.preventDefault();                       // que la pagina no se recargue

      // 1. Leer el formulario y armar el JSON
      const datos = Object.fromEntries(new FormData(formulario));
      CAMPOS_NUMERICOS.forEach((campo) => { datos[campo] = Number(datos[campo]); });

      try {
        // 2. Enviar el JSON a la API. La ruta "/predict" es relativa: la API y esta pagina
        //    viven en el mismo servidor, asi que funciona en local, ngrok, Docker y Render.
        const respuesta = await fetch("/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });
        const json = await respuesta.json();

        // 3. Mostrar el resultado
        if (!respuesta.ok) {                         // 422 = dato fuera de rango
          const detalle = Array.isArray(json.detail)
            ? json.detail.map((e) => e.loc.join(".") + ": " + e.msg).join("<br>")
            : json.detail;
          mostrar("error", "<b>Revisa los datos</b><br>" + detalle);
          return;
        }
        const porcentaje = (json.probabilidad * 100).toFixed(1);
        if (json.abandona) {
          mostrar("riesgo", "<b>Riesgo ALTO de abandono</b><br>Probabilidad: " + porcentaje + " %");
        } else {
          mostrar("fiel", "<b>Socio fiel</b><br>Probabilidad de abandono: " + porcentaje + " %");
        }
      } catch (error) {
        mostrar("error", "No se pudo conectar con la API. ¿Está encendida?");
      }
    });
  </script>
</body>
</html>
```

---

## 4.3 · ¿Qué hace cada parte?

El archivo tiene tres bloques:

| Bloque | Qué hace |
|---|---|
| `<style>` | Los colores y la apariencia (tarjeta blanca, botón azul, resultado rojo/verde). |
| `<form>` | El formulario con los 7 datos del socio. Los campos numéricos tienen `min` y `max` iguales a las reglas de la API. |
| `<script>` | Lo importante: al presionar **Predecir**, (1) lee el formulario, (2) arma el JSON, (3) lo envía con `fetch("/predict")`, (4) muestra el resultado. |

Fíjate en la línea del `fetch`:

```javascript
const respuesta = await fetch("/predict", { method: "POST", ... });
```

La ruta `"/predict"` **no lleva** `http://localhost:8000` delante. Es una ruta relativa: significa "en el mismo servidor del que me descargaste".

---

## 4.4 · Probar todo junto

1. Mira la terminal donde dejaste la API encendida. Si la cerraste, vuelve a encenderla:

```powershell
cd backend
uvicorn app.main:app --reload --port 8000
```

2. Abre el navegador en **<http://localhost:8000/>** (solo `/`, sin `/docs`).

✅ **Deberías ver** la tarjeta "¿Abandonará el socio del gimnasio?" con el formulario ya relleno con un socio de riesgo alto.

3. Presiona **Predecir** →

✅ Debe aparecer un recuadro **rojo**: *"Riesgo ALTO de abandono — Probabilidad: 88.2 %"*.

4. Cambia los datos a un socio fiel: visitas `18`, clases `5`, quejas `0`, cuota `119`, antigüedad `24`, plan `Premium`, débito `Sí`. Presiona **Predecir** →

✅ Debe aparecer un recuadro **verde**: *"Socio fiel"* con una probabilidad cercana a 1 %.

5. **Prueba que se detiene sola:** apaga la API (en su terminal, `Ctrl` + `C`) y presiona **Predecir** otra vez → debe aparecer *"No se pudo conectar con la API. ¿Está encendida?"*. Vuelve a encenderla con `uvicorn ...`.

⚠️ **Si algo falla:**

| Síntoma | Qué hacer |
|---|---|
| `http://localhost:8000/` dice `{"detail":"Not Found"}` | `index.html` no está en `frontend/` o la carpeta quedó fuera del proyecto. Debe estar al lado de `backend`. |
| Presionas Predecir y no pasa nada | Presiona `F12` → pestaña **Consola**. Si hay un error rojo, léelo; casi siempre es una letra mal copiada del código. |
| Sale "Revisa los datos" | Algún número está fuera de rango (el mensaje dice cuál). |
| Los cambios en el HTML no se ven | Refresca con `Ctrl` + `F5` (borra la caché del navegador). |

---

## 4.5 · Lista de verificación de la etapa local

- [ ] `python train.py` genera `models/modelo.joblib`
- [ ] `http://localhost:8000/docs` permite hacer una predicción
- [ ] `http://localhost:8000/` muestra el formulario y da resultados rojo y verde
- [ ] Un dato fuera de rango muestra "Revisa los datos"

> 📌 **Regla de oro:** no pases a la etapa siguiente hasta que la anterior funcione. Si falla en local, también fallará en ngrok, Docker y Render.

📸 **Evidencia sugerida:** captura de pantalla de `/docs` con una predicción y del formulario con el resultado.

👉 **Siguiente:** [Capítulo 5 · Compartir tu API con ngrok](05_Compartir_con_ngrok.md)
