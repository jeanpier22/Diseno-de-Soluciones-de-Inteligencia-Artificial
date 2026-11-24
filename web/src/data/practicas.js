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
    id: 'examen',
    titulo: 'Examen · Bases de datos',
    subtitulo: 'Regresión, clasificación y clustering',
    estado: 'disponible',
    tipo: 'Datasets',
    extension: '3 bases de datos',
    resumen:
      'Tres bases de datos de 5 000 registros cada una para el examen: una para regresión lineal (el docente indica las parejas de columnas; en una de ellas no hay linealidad y debes justificarlo con la correlación), una para clasificación (entrenar, reportar el error y la matriz de confusión) y una para clustering.',
    objetivos: [
      'Aplicar regresión lineal a las parejas indicadas y decidir con el coeficiente de correlación si es válido hacerlo.',
      'Entrenar un modelo de clasificación y reportar el error y la matriz de confusión.',
      'Agrupar los clientes con clustering e interpretar los grupos obtenidos.',
    ],
    temas: ['Regresión lineal', 'Correlación', 'Clasificación', 'Matriz de confusión', 'Clustering'],
    documento: null,
    descargas: [
      {
        etiqueta: 'Dataset 1: regresión',
        detalle: '5 000 filas y 8 columnas. Las parejas a usar las indica el docente',
        archivo: 'material/examen/dataset1_regresion.csv',
        nombre: 'dataset1_regresion.csv',
        tipo: 'CSV',
        peso: '251 KB',
        destacado: true,
      },
      {
        etiqueta: 'Dataset 2: clasificación',
        detalle: '5 000 filas y 6 columnas. Variable objetivo: credito_aprobado',
        archivo: 'material/examen/dataset2_clasificacion.csv',
        nombre: 'dataset2_clasificacion.csv',
        tipo: 'CSV',
        peso: '129 KB',
        destacado: true,
      },
      {
        etiqueta: 'Dataset 3: clustering',
        detalle: '5 000 filas y 4 columnas, sin etiqueta. Excluye id_cliente del modelo',
        archivo: 'material/examen/dataset3_clustering.csv',
        nombre: 'dataset3_clustering.csv',
        tipo: 'CSV',
        peso: '88 KB',
        destacado: true,
      },
    ],
  },
  {
    id: 'sesion1',
    titulo: 'Prompts · Regresión con ayuda de IA',
    subtitulo: 'Prompts para Colab: de la regresión lineal a la polinómica',
    estado: 'disponible',
    tipo: 'Prompts',
    extension: '10 prompts',
    resumen: "Secuencia de prompts que se usó en clase, bajo supervisión del docente, para que el asistente de Colab construya un ejercicio completo: datos de edad y peso con un patrón conocido, división en entrenamiento y prueba, regresión lineal, tablas de error y regresión polinómica variando el grado de 1 a 10 para ver el sobreajuste.",
    introPrompts: "Los prompts están escritos para ejecutarse en orden, en una misma sesión de Colab: cada uno usa las variables del anterior. Revisa siempre el código y el resultado antes de pasar al siguiente. Si algo falla, pega el error y pide la corrección en lugar de reescribir el prompt.",
    objetivos: ["Generar datos sintéticos con un patrón conocido y visualizarlos con un diagrama de dispersión.", "Dividir los datos en entrenamiento (70 %) y prueba (30 %) y entrenar una regresión lineal.", "Calcular y comparar el error en entrenamiento y en prueba con MAE, MSE, RMSE y R².", "Ajustar una regresión polinómica, obtener su ecuación y comparar grados del 1 al 10.", "Reconocer el subajuste y el sobreajuste a partir de la curva de error contra el grado."],
    temas: ['Regresión lineal', 'Regresión polinómica', 'Train/test', 'Error', 'Sobreajuste', 'Prompting'],
    documento: null,
    prompts: [
      {
        titulo: "Generar los datos de edad y peso",
        prompt:
          "Genera un DataFrame de pandas llamado df con 200 filas y dos columnas: \"edad\" (años, entre 0 y 18) y \"peso\" (kg). El peso debe seguir un patrón no lineal y realista: crece rápido en los primeros años y luego se desacelera. Construye el patrón con una función cuadrática o polinómica de la edad y súmale ruido gaussiano. Fija la semilla aleatoria (np.random.seed(42)) para que el resultado sea reproducible. Muestra df.head() y df.describe().",
        nota: "El original pedía \"dos DF\"; aquí es un solo DataFrame con las dos variables, que es lo que necesita el resto de la sesión.",
      },
      {
        titulo: "Graficar la dispersión",
        prompt:
          "Con matplotlib, grafica un diagrama de dispersión de edad (eje x) contra peso (eje y) usando df. Agrega título, etiquetas de ejes con unidades, cuadrícula suave y transparencia en los puntos (alpha=0.6). Después, en una línea, describe qué patrón se observa.",
      },
      {
        titulo: "Dividir en entrenamiento y prueba",
        prompt:
          "Define X = df[[\"edad\"]] e y = df[\"peso\"]. Divide los datos con train_test_split en 70 % para entrenamiento y 30 % para prueba, con random_state=42. Nómbralos x_train, x_test, y_train, y_test e imprime el tamaño de cada uno.",
      },
      {
        titulo: "Entrenar la regresión lineal",
        prompt:
          "Entrena un modelo LinearRegression de scikit-learn usando únicamente x_train e y_train. Imprime la pendiente (coef_) y el intercepto (intercept_), y escribe la ecuación en la forma peso = m·edad + b.",
      },
      {
        titulo: "Graficar la recta del modelo con los puntos",
        prompt:
          "Grafica en una sola figura: los puntos de entrenamiento (azul), los puntos de prueba (naranja) y la recta que predice el modelo lineal sobre un rango de edades ordenado y continuo. Incluye leyenda, título y etiquetas de ejes.",
      },
      {
        titulo: "Tabla de entrenamiento y error",
        prompt:
          "Calcula y_train_pred con el modelo. Crea una tabla (DataFrame) con tres columnas: \"y_train\" (real), \"y_train_pred\" (predicho) y \"diferencia\" (real − predicho). Muestra las primeras 10 filas. Luego calcula e imprime el error de entrenamiento con MAE, MSE, RMSE y R², explicando en una línea qué significa cada uno.",
      },
      {
        titulo: "Predecir en prueba y comparar",
        prompt:
          "Predice y_test_pred con x_test. Crea la misma tabla (real, predicho, diferencia) para el conjunto de prueba y muestra las primeras 10 filas. Calcula MAE, MSE, RMSE y R² de prueba, y presenta una tabla comparativa con las métricas de entrenamiento y de prueba. Concluye si el modelo lineal generaliza bien.",
      },
      {
        titulo: "Entrenar el modelo polinómico (sin graficar)",
        prompt:
          "Entrena una regresión polinómica de grado 2: usa un Pipeline con PolynomialFeatures(degree=2, include_bias=False) y LinearRegression, ajustado con x_train e y_train. No grafiques todavía; solo imprime las métricas MAE y R² en entrenamiento y en prueba.",
        nota: "El original decía \"regresor logístico\". La regresión logística sirve para clasificar categorías; para predecir un peso (variable continua) y variar el grado se usa regresión polinómica, que es una regresión lineal sobre potencias de la edad.",
      },
      {
        titulo: "Graficar la curva polinómica e imprimir la ecuación",
        prompt:
          "Grafica la curva que genera el modelo polinómico sobre un rango continuo de edades, junto con los puntos de entrenamiento y de prueba. Imprime la ecuación del modelo con coeficientes redondeados a 4 decimales, en la forma peso = b + c1·edad + c2·edad² (obtén los coeficientes del paso LinearRegression del pipeline).",
      },
      {
        titulo: "Variar el grado de 1 a 10 y graficar el error",
        prompt:
          "Dentro de un bucle for, recorre los grados del 1 al 10. En cada iteración entrena el pipeline polinómico y calcula el RMSE de entrenamiento y el de prueba. Guarda los resultados en una tabla con las columnas \"grado\", \"rmse_train\" y \"rmse_test\". Grafica ambos errores contra el grado en una misma figura (con marcadores y leyenda) y marca con una línea vertical el grado que minimiza el error de prueba. Al final indica qué grado elegirías y explica, con lo que muestra la gráfica, dónde hay subajuste y dónde sobreajuste.",
      },
    ],
    descargas: [],
  },
  {
    id: 'sesion3',
    titulo: 'Sesión 3 · Python, calidad de datos y EDA',
    subtitulo: 'Bloque 2 · Temas 4, 5 y 6',
    estado: 'disponible',
    tipo: 'Presentación',
    extension: '36 diapositivas',
    resumen:
      'Las tres librerías del bloque (pandas, matplotlib y scikit-learn), el diccionario de datos, la limpieza y transformación, y el análisis exploratorio para entender los datos, encontrar patrones y sacar conclusiones. Incluye tres prácticas en Colab, el taller de la etapa 1 de la AA2 y dos bases de datos con errores para practicar todo el análisis.',
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
        etiqueta: 'Base de datos de práctica: gimnasio_socios.csv',
        detalle:
          '2 060 socios de una cadena de gimnasios y 16 columnas. Variable objetivo: abandono. Trae errores a propósito: duplicados, textos inconsistentes, nulos, valores imposibles, atípicos y tipos mal guardados. Aplica en ella todo el análisis de la sesión',
        archivo: 'material/sesion3/gimnasio_socios.csv',
        nombre: 'gimnasio_socios.csv',
        tipo: 'CSV',
        peso: '187 KB',
        destacado: true,
      },
      {
        etiqueta: 'Reto de limpieza: tienda_online_clientes.csv',
        detalle:
          '6 270 clientes de una tienda online y 20 columnas. Variable objetivo: recompra. Base más grande y más sucia: duplicados, nulos y marcadores como N/A, textos inconsistentes, fechas en varios formatos, números guardados como texto, valores imposibles, atípicos y totales que no cuadran. Tu trabajo es dejarla lista para modelar',
        archivo: 'material/sesion3/tienda_online_clientes.csv',
        nombre: 'tienda_online_clientes.csv',
        tipo: 'CSV',
        peso: '718 KB',
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
    extension: '25 diapositivas',
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
      paginas: 25,
      peso: '0.9 MB',
    },
    descargas: [
      {
        etiqueta: 'Presentación en PDF',
        detalle: 'Las 25 diapositivas de la sesión',
        archivo: 'material/sesion4/Sesion4_Ingenieria_Caracteristicas_E2.pdf',
        nombre: 'Sesion4_Ingenieria_Caracteristicas_E2.pdf',
        tipo: 'PDF',
        peso: '0.9 MB',
        destacado: true,
      },
      {
        etiqueta: 'Presentación editable (.pptx)',
        detalle: 'Versión original en PowerPoint',
        archivo: 'material/sesion4/Sesion4_Ingenieria_Caracteristicas_E2.pptx',
        nombre: 'Sesion4_Ingenieria_Caracteristicas_E2.pptx',
        tipo: 'PPTX',
        peso: '0.8 MB',
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
    id: 'sesion5',
    titulo: 'Sesión 5 · Construir y evaluar modelos',
    subtitulo: 'Temas 8 y 9 · Tipos de modelos, métricas y validación',
    estado: 'disponible',
    tipo: 'Presentación',
    extension: '59 diapositivas',
    resumen:
      'Cómo elegir un modelo con evidencia: las cuatro familias (lineales, árboles, boosting y SVM) con ejemplos numéricos, las métricas de clasificación y regresión, partición de datos, validación cruzada, overfitting y underfitting, grid y random search, umbral de decisión y análisis de errores. Todo sobre el caso de la operadora móvil, con cuaderno de Colab para el taller.',
    objetivos: [
      'Describir y comparar modelos lineales, árboles de decisión, boosting y SVM según el problema.',
      'Elegir la métrica adecuada según el costo del error y calcularla a partir de la matriz de confusión.',
      'Comparar modelos con validación cruzada, diagnosticar overfitting y afinar hiperparámetros.',
      'Ajustar el umbral con el costo del negocio y analizar los errores para proponer mejoras.',
    ],
    temas: ['Modelos', 'Métricas', 'Cross validation', 'Overfitting', 'Grid y random search', 'Error analysis'],
    documento: {
      src: 'material/sesion5/Sesion5_Modelos_y_Evaluacion.pdf',
      paginas: 59,
      peso: '1.1 MB',
    },
    descargas: [
      {
        etiqueta: 'Práctica en vivo (Colab)',
        detalle: 'Cuaderno del taller: baseline, 4 modelos, validación cruzada, búsqueda de hiperparámetros, umbral y análisis de errores',
        archivo: `${COLAB}/Sesion5_Modelos_y_Evaluacion_Colab.ipynb`,
        tipo: 'COLAB',
        peso: 'en línea',
        externo: true,
        destacado: true,
      },
      {
        etiqueta: 'Colab · Modelos lineales',
        detalle: 'Regresión lineal y logística: C, penalty, class_weight, Ridge/Lasso, odds ratios, con gráficos',
        archivo: `${COLAB}/Modelos_Lineales_Colab.ipynb`,
        tipo: 'COLAB',
        peso: 'en línea',
        externo: true,
        destacado: true,
      },
      {
        etiqueta: 'Colab · Árboles de decisión',
        detalle: 'Gini, max_depth, min_samples_leaf, poda, importancia de variables y bosque aleatorio',
        archivo: `${COLAB}/Arboles_de_Decision_Colab.ipynb`,
        tipo: 'COLAB',
        peso: 'en línea',
        externo: true,
        destacado: true,
      },
      {
        etiqueta: 'Colab · Boosting',
        detalle: 'Boosting hecho a mano, learning_rate, n_estimators, max_depth, subsample y early stopping',
        archivo: `${COLAB}/Boosting_Colab.ipynb`,
        tipo: 'COLAB',
        peso: 'en línea',
        externo: true,
        destacado: true,
      },
      {
        etiqueta: 'Colab · SVM',
        detalle: 'Margen, vectores de soporte, C, kernel, gamma, mapa C×gamma y SVR, con gráficos',
        archivo: `${COLAB}/SVM_Colab.ipynb`,
        tipo: 'COLAB',
        peso: 'en línea',
        externo: true,
        destacado: true,
      },
      {
        etiqueta: 'Presentación en PDF',
        detalle: 'Las 59 diapositivas de la sesión',
        archivo: 'material/sesion5/Sesion5_Modelos_y_Evaluacion.pdf',
        nombre: 'Sesion5_Modelos_y_Evaluacion.pdf',
        tipo: 'PDF',
        peso: '1.1 MB',
        destacado: true,
      },
      {
        etiqueta: 'Presentación editable (.pptx)',
        detalle: 'Versión original en PowerPoint, con guion en las notas',
        archivo: 'material/sesion5/Sesion5_Modelos_y_Evaluacion.pptx',
        nombre: 'Sesion5_Modelos_y_Evaluacion.pptx',
        tipo: 'PPTX',
        peso: '1.1 MB',
        destacado: false,
      },
      {
        etiqueta: 'Cuaderno (.ipynb)',
        detalle: 'Para descargar y abrir con Jupyter',
        archivo: 'material/sesion5/Sesion5_Modelos_y_Evaluacion_Colab.ipynb',
        nombre: 'Sesion5_Modelos_y_Evaluacion_Colab.ipynb',
        tipo: 'IPYNB',
        peso: '27 KB',
        destacado: false,
      },
    ],
  },
  {
    id: 'sesion6',
    titulo: 'Sesión 6 · Del modelo a la API',
    subtitulo: 'Tema 10 · Implementación y despliegue de modelos',
    estado: 'disponible',
    tipo: 'Presentación',
    extension: '17 diapositivas',
    resumen:
      'Cómo llevar un modelo entrenado a producción: guardar el pipeline, exponerlo como API REST con FastAPI, probarlo en local, compartirlo con ngrok y empaquetarlo en una imagen Docker. Incluye el proyecto completo para VS Code, separado en backend y frontend, y el taller de la sesión.',
    objetivos: [
      'Guardar un pipeline entrenado como artefacto (.joblib) junto con su metadata.',
      'Exponer el modelo como una API REST con FastAPI y validar las entradas con Pydantic.',
      'Probar la API en local, compartirla con ngrok y empaquetarla en una imagen Docker.',
    ],
    temas: ['FastAPI', 'API REST', 'ngrok', 'Docker', 'Despliegue'],
    documento: {
      src: 'material/sesion6/Sesion6_Del_Modelo_a_la_API.pdf',
      paginas: 17,
      peso: '0.5 MB',
    },
    descargas: [
      {
        etiqueta: 'Presentación en PDF',
        detalle: 'Las 17 diapositivas de la sesión',
        archivo: 'material/sesion6/Sesion6_Del_Modelo_a_la_API.pdf',
        nombre: 'Sesion6_Del_Modelo_a_la_API.pdf',
        tipo: 'PDF',
        peso: '0.5 MB',
        destacado: true,
      },
      {
        etiqueta: 'Proyecto para VS Code (.zip)',
        detalle:
          'Proyecto separado en backend/ (FastAPI, entrenamiento, pruebas) y frontend/ (página del negocio con las 7 características, ilustraciones y formulario), más Dockerfile y docker-compose. Sigue el README.md paso a paso',
        archivo: 'material/sesion6/Proyecto_API_Modelo.zip',
        nombre: 'Proyecto_API_Modelo.zip',
        tipo: 'ZIP',
        peso: '69 KB',
        destacado: true,
      },
      {
        etiqueta: 'Presentación editable (.pptx)',
        detalle: 'Versión original en PowerPoint',
        archivo: 'material/sesion6/Sesion6_Del_Modelo_a_la_API.pptx',
        nombre: 'Sesion6_Del_Modelo_a_la_API.pptx',
        tipo: 'PPTX',
        peso: '0.8 MB',
        destacado: false,
      },
    ],
  },
  {
    id: 'guia-despliegue',
    titulo: 'Guía paso a paso · Despliega tu modelo',
    subtitulo: 'Del modelo entrenado a una API en internet, desde cero',
    estado: 'disponible',
    tipo: 'Guía',
    extension: '10 capítulos',
    resumen:
      'Guía para seguir sin ayuda de ninguna IA: crear el proyecto, entrenar y guardar el modelo, construir la API con FastAPI y un frontend sencillo, probarlo en local, compartirlo con ngrok, empaquetarlo con Docker y desplegarlo en Render con una URL permanente. Cada archivo se crea desde cero, con el código para copiar, cada comando explicado y una tabla de errores frecuentes. Incluye el proyecto final para comparar.',
    objetivos: [
      'Crear desde cero un proyecto con backend (FastAPI) y frontend (HTML) que usa un modelo entrenado.',
      'Probar la API en local, compartirla con ngrok y empaquetarla en una imagen Docker.',
      'Subir el proyecto a GitHub y desplegarlo en Render con una URL pública permanente.',
    ],
    temas: ['FastAPI', 'Frontend', 'ngrok', 'Docker', 'GitHub', 'Render'],
    documento: null,
    descargas: [
      {
        etiqueta: 'Guía completa (.zip)',
        detalle:
          'Los 10 capítulos en Markdown, los datos (gimnasio_socios.csv) y el proyecto_final completo para comparar. Empieza por el README.md',
        archivo: 'material/guia-despliegue/Guia_Despliegue_Paso_a_Paso.zip',
        nombre: 'Guia_Despliegue_Paso_a_Paso.zip',
        tipo: 'ZIP',
        peso: '130 KB',
        destacado: true,
      },
      {
        etiqueta: 'Leer la guía en GitHub',
        detalle: 'Se lee directo en el navegador, con los capítulos enlazados entre sí',
        archivo: `https://github.com/${REPO}/tree/main/Guia_Despliegue_Paso_a_Paso`,
        tipo: 'GITHUB',
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

/**
 * Diapositivas por sesion, en orden. `material` es el id de MATERIAL_CLASE que
 * contiene la presentacion; con null la sesion se muestra como "Proximamente".
 */
export const SESIONES_DIAPOSITIVAS = [
  { numero: 1, titulo: 'Introducción a la IA', temas: 'Historia, aplicaciones, tipos de IA y casos de éxito', material: null },
  { numero: 2, titulo: 'Flujo de trabajo de soluciones con IA', temas: 'Recolección, entrenamiento, evaluación y despliegue', material: null },
  { numero: 3, titulo: 'Python, calidad de datos y EDA', temas: 'pandas, matplotlib, scikit-learn, limpieza, diccionario de datos y análisis exploratorio', material: 'sesion3' },
  { numero: 4, titulo: 'Ingeniería de características', temas: 'Selección, PCA, re-escalado y exposición de la Evidencia 2', material: 'sesion4' },
  { numero: 5, titulo: 'Construcción y evaluación de modelos', temas: 'Modelos lineales, árboles, boosting, SVM, métricas y validación', material: 'sesion5' },
  { numero: 6, titulo: 'Implementación de modelos', temas: 'API REST con FastAPI, ngrok, Docker y despliegue', material: 'sesion6' },
]

export const getMaterial = (id) => MATERIAL_CLASE.find((m) => m.id === id)
