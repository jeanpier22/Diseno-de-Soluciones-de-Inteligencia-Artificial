# Diseño de Soluciones de Inteligencia Artificial — CERTUS

Plataforma web con el material del curso (VI ciclo, 2026-2): presentaciones de las sesiones,
cuadernos de Google Colab, datasets y guías de práctica.

**Sitio:** https://jeanpier22.github.io/Diseno-de-Soluciones-de-Inteligencia-Artificial/

## Estructura

```
├── Bloque2_Calidad_EDA_Features_Colab.ipynb    cuadernos (los abre Colab desde aquí)
├── Tipos_de_Graficos_matplotlib_Colab.ipynb
├── Practica_Semana3y4/                         guía, cuaderno y dataset de la práctica
├── Sesion*.pptx                                presentaciones originales
├── web/                                        sitio React + Tailwind (GitHub Pages)
│   ├── public/material/  public/practicas/       archivos que sirve el sitio
│   └── src/data/practicas.js                     catálogo: único archivo a editar
└── .github/workflows/deploy.yml                publicación automática al hacer push a main
```

## Publicar contenido nuevo

1. Copiar los archivos a `web/public/material/<id>/` o `web/public/practicas/<id>/`.
2. Añadir la entrada en `web/src/data/practicas.js`.
3. `git push` a `main`: GitHub Actions compila y publica solo.

## Desarrollo local

```bash
cd web && npm install && npm run dev
```

> El solucionario y la zona docente no se versionan (ver `.gitignore`): el repositorio es público.
