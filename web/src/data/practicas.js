/**
 * Catalogo del curso Diseno de Soluciones de Inteligencia Artificial (CERTUS).
 *
 * Es el UNICO archivo que hay que editar para publicar contenido nuevo:
 *   1. Copiar los archivos a  web/public/practicas/<id>/  o  web/public/material/<id>/
 *   2. Anadir (o completar) la entrada en PRACTICAS o MATERIAL_CLASE
 * Ningun componente conoce el contenido: todos leen de aqui.
 */

export const CURSO = {
  nombre: 'Diseño de Soluciones de Inteligencia Artificial',
  periodo: '2026-2',
  institucion: 'CERTUS',
  facultad: 'VI ciclo · Modalidad e-learning',
  docente: 'Ing. Jeanpier Ancori Sánchez',
}

const REPO = 'jeanpier22/Diseno-de-Soluciones-de-Inteligencia-Artificial'
const COLAB = `https://colab.research.google.com/github/${REPO}/blob/main`

export const PRACTICAS = [
  {
    id: 'sem34',
    numero: '3 y 4',
    titulo: 'Calidad de datos, EDA, features y PCA',
    subtitulo: 'Evidencia 2 (AA2) · Práctica guiada · Bloque 2',
    estado: 'disponible',
    duracion: 'Semanas 3 y 4',
    resumen:
      '¿Cuánto mejora un modelo cuando preparamos bien los datos? Con el archivo de una operadora móvil —que contiene errores a propósito— entrenas la misma regresión logística en tres escenarios (sin estrategias, con estrategias y con estrategias + PCA) y comparas sus matrices de confusión. Trabajo grupal, con el mismo equipo de la Evidencia 1.',
    objetivos: [
      'Detectar y documentar problemas de calidad de datos: duplicados, inconsistencias, valores imposibles, atípicos y nulos.',
      'Elaborar el diccionario de datos y el análisis exploratorio, univariado y bivariado, formulando hipótesis sobre la data.',
      'Crear nuevas variables, codificar categóricas, re-escalar y seleccionar características con información mutua.',
      'Reducir dimensionalidad con PCA conservando el 90 % de la varianza.',
      'Comparar los escenarios A, B y C con la matriz de confusión y concluir cuánto aportó cada estrategia.',
    ],
    temas: [
      'Calidad de datos',
      'EDA',
      'Ingeniería de características',
      'PCA',
      'Matriz de confusión',
      'pandas',
      'scikit-learn',
    ],
    documento: {
      src: 'practicas/sem34/AA2_Evidencia2_Practica_Semanas3y4.pdf',
      paginas: 5,
      peso: '0.20 MB',
    },
    descargas: [
      {
        etiqueta: 'Guía de la práctica (PDF)',
        detalle: 'Caso, escenarios A/B/C, partes de la práctica, entregable y criterios de evaluación',
        archivo: 'practicas/sem34/AA2_Evidencia2_Practica_Semanas3y4.pdf',
        nombre: 'AA2_Evidencia2_Practica_Semanas3y4.pdf',
        tipo: 'PDF',
        peso: '0.20 MB',
        destacado: true,
      },
      {
        etiqueta: 'Abrir cuaderno en Google Colab',
        detalle:
          'Cuaderno de la práctica. Al abrirlo, sube también clientes_telecom.csv al panel de archivos de Colab',
        archivo: `${COLAB}/Practica_Semana3y4/Practica_Bloque2_EDA_PCA_MatrizConfusion.ipynb`,
        tipo: 'COLAB',
        peso: 'en línea',
        externo: true,
        destacado: true,
      },
      {
        etiqueta: 'Dataset: clientes_telecom.csv',
        detalle: '1 530 registros y 16 columnas de una operadora móvil. Variable objetivo: se_fue',
        archivo: 'practicas/sem34/clientes_telecom.csv',
        nombre: 'clientes_telecom.csv',
        tipo: 'CSV',
        peso: '142 KB',
        destacado: true,
      },
      {
        etiqueta: 'Cuaderno (.ipynb)',
        detalle: 'El mismo cuaderno, para descargar y abrir con Jupyter o subir a tu Drive',
        archivo: 'practicas/sem34/Practica_Bloque2_EDA_PCA_MatrizConfusion.ipynb',
        nombre: 'Practica_Bloque2_EDA_PCA_MatrizConfusion.ipynb',
        tipo: 'IPYNB',
        peso: '41 KB',
        destacado: false,
      },
    ],
  },
]

export const getPractica = (id) => PRACTICAS.find((p) => p.id === id)

/**
 * Material de clase: presentaciones de las sesiones y cuadernos de apoyo.
 * Una descarga con `externo: true` abre un enlace (p. ej. Colab) en vez de
 * bajar un archivo. La seccion de la portada se oculta sola si esta vacio.
 */
export const MATERIAL_CLASE = [
  {
    id: 'sesion3',
    titulo: 'Sesión 3 · Python, calidad de datos y EDA',
    subtitulo: 'Bloque 2 · Temas 4, 5 y 6',
    estado: 'disponible',
    tipo: 'Presentación',
    extension: '36 diapositivas',
    resumen:
      'Las tres librerías del bloque (pandas, matplotlib y scikit-learn), el diccionario de datos, la limpieza y transformación, y el análisis exploratorio para entender los datos, encontrar patrones y sacar conclusiones. Incluye tres prácticas en Colab y el taller de la etapa 1 de la AA2.',
    objetivos: [
      'Usar pandas, matplotlib y scikit-learn para cargar, transformar y graficar datos.',
      'Construir un diccionario de datos y aplicar limpieza: duplicados, nulos, atípicos y tipos de dato.',
      'Realizar un análisis exploratorio univariado y bivariado y plantear hipótesis.',
    ],
    temas: ['pandas', 'matplotlib', 'Limpieza', 'Diccionario de datos', 'EDA'],
    documento: {
      src: 'material/sesion3/Sesion3_Python_Calidad_EDA.pdf',
      paginas: 36,
      peso: '1.2 MB',
    },
    descargas: [
      {
        etiqueta: 'Presentación en PDF',
        detalle: 'Las 36 diapositivas de la sesión',
        archivo: 'material/sesion3/Sesion3_Python_Calidad_EDA.pdf',
        nombre: 'Sesion3_Python_Calidad_EDA.pdf',
        tipo: 'PDF',
        peso: '1.2 MB',
        destacado: true,
      },
      {
        etiqueta: 'Presentación editable (.pptx)',
        detalle: 'Versión original en PowerPoint',
        archivo: 'material/sesion3/Sesion3_Python_Calidad_EDA.pptx',
        nombre: 'Sesion3_Python_Calidad_EDA.pptx',
        tipo: 'PPTX',
        peso: '2.1 MB',
        destacado: false,
      },
      {
        etiqueta: 'Cuaderno del Bloque 2 en Colab',
        detalle: 'Las prácticas de la sesión, ejecutables paso a paso',
        archivo: `${COLAB}/Bloque2_Calidad_EDA_Features_Colab.ipynb`,
        tipo: 'COLAB',
        peso: 'en línea',
        externo: true,
        destacado: true,
      },
    ],
  },
  {
    id: 'sesion4',
    titulo: 'Sesión 4 · Ingeniería de características',
    subtitulo: 'Bloque 2 · Tema 7 y exposición de la Evidencia 2',
    estado: 'disponible',
    tipo: 'Presentación',
    extension: '24 diapositivas',
    resumen:
      'Selección de características, extracción con PCA y re-escalado lineal y no lineal. La sesión cierra con el taller de la etapa 2 de la AA2 y las exposiciones por equipo de la Evidencia 2.',
    objetivos: [
      'Seleccionar características relevantes con información mutua.',
      'Reducir dimensionalidad con PCA e interpretar la varianza explicada.',
      'Aplicar re-escalado lineal (estandarización) y no lineal (logaritmo).',
    ],
    temas: ['Selección', 'PCA', 'Re-escalado', 'Evidencia 2'],
    documento: {
      src: 'material/sesion4/Sesion4_Ingenieria_Caracteristicas_E2.pdf',
      paginas: 24,
      peso: '0.8 MB',
    },
    descargas: [
      {
        etiqueta: 'Presentación en PDF',
        detalle: 'Las 24 diapositivas de la sesión',
        archivo: 'material/sesion4/Sesion4_Ingenieria_Caracteristicas_E2.pdf',
        nombre: 'Sesion4_Ingenieria_Caracteristicas_E2.pdf',
        tipo: 'PDF',
        peso: '0.8 MB',
        destacado: true,
      },
      {
        etiqueta: 'Presentación editable (.pptx)',
        detalle: 'Versión original en PowerPoint',
        archivo: 'material/sesion4/Sesion4_Ingenieria_Caracteristicas_E2.pptx',
        nombre: 'Sesion4_Ingenieria_Caracteristicas_E2.pptx',
        tipo: 'PPTX',
        peso: '1.3 MB',
        destacado: false,
      },
      {
        etiqueta: 'Cuaderno del Bloque 2 en Colab',
        detalle: 'Incluye la sección 8: ingeniería de características y PCA',
        archivo: `${COLAB}/Bloque2_Calidad_EDA_Features_Colab.ipynb`,
        tipo: 'COLAB',
        peso: 'en línea',
        externo: true,
        destacado: true,
      },
    ],
  },
  {
    id: 'cuadernos',
    titulo: 'Cuadernos de Colab',
    subtitulo: 'Material de apoyo para practicar',
    estado: 'disponible',
    tipo: 'Cuadernos',
    extension: '2 cuadernos',
    resumen:
      'Dos cuadernos ejecutables en Google Colab. El del Bloque 2 recorre calidad de datos, EDA e ingeniería de características con el caso de una tienda online que quiere saber qué clientes dejarán de comprar, y termina con ejercicios. El de gráficos explica cuándo usar cada tipo con matplotlib.',
    objetivos: [
      'Repasar paso a paso el flujo completo del Bloque 2 sobre un caso distinto al de la práctica.',
      'Elegir el gráfico adecuado según el tipo de variable y la pregunta que se quiere responder.',
      'Practicar con los ejercicios propuestos al final de cada cuaderno.',
    ],
    temas: ['Colab', 'matplotlib', 'pandas', 'Ejercicios'],
    documento: null,
    descargas: [
      {
        etiqueta: 'Bloque 2 · Calidad, EDA y features (Colab)',
        detalle: 'Cuaderno completo con 6 ejercicios para practicar',
        archivo: `${COLAB}/Bloque2_Calidad_EDA_Features_Colab.ipynb`,
        tipo: 'COLAB',
        peso: 'en línea',
        externo: true,
        destacado: true,
      },
      {
        etiqueta: 'Tipos de gráficos con matplotlib (Colab)',
        detalle: 'Histograma, cajas, barras, dispersión y mapa de correlación',
        archivo: `${COLAB}/Tipos_de_Graficos_matplotlib_Colab.ipynb`,
        tipo: 'COLAB',
        peso: 'en línea',
        externo: true,
        destacado: true,
      },
      {
        etiqueta: 'Bloque 2 (.ipynb)',
        detalle: 'Para descargar y abrir con Jupyter',
        archivo: 'material/cuadernos/Bloque2_Calidad_EDA_Features_Colab.ipynb',
        nombre: 'Bloque2_Calidad_EDA_Features_Colab.ipynb',
        tipo: 'IPYNB',
        peso: '566 KB',
        destacado: false,
      },
      {
        etiqueta: 'Tipos de gráficos (.ipynb)',
        detalle: 'Para descargar y abrir con Jupyter',
        archivo: 'material/cuadernos/Tipos_de_Graficos_matplotlib_Colab.ipynb',
        nombre: 'Tipos_de_Graficos_matplotlib_Colab.ipynb',
        tipo: 'IPYNB',
        peso: '573 KB',
        destacado: false,
      },
    ],
  },
]

export const getMaterial = (id) => MATERIAL_CLASE.find((m) => m.id === id)
