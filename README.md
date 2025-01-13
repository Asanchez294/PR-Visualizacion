# Análisis de Exoplanetas
### Autor: Adrián Sánchez Freire

**Página web del proyecto:** https://asanchez294.github.io/PR-Visualizacion/

## Estructura de carpetas y archivos

**index.html**: Punto de entrada para cargar la web. Aquí encontramos la estructura de la visualización 
(tiene que estar fuera de **/src** para desplegarlo en GitHub Pages y que pueda acceder a los datos).

El código relacionado con el desarollo de la visualización se encuentra en **/src**.
Dentro encontramos los siguientes elementos:

* **style.css**: Archivo mediante el que se le da estilo a la web.
* **main.js**: Contiene el código principal de la web. Principalmente, se encarga de generar los gráficos mediante llamadas
a los .js de la carpeta **scripts**.
* **scripts**: Carpeta en la que tenemos todos los archivos que llamará el .js principal **main.js**. 
Dentro encontramos los .js que se encargarán de cargar los datos, mapear los colores y cargar cada uno de los gráficos.

En la carpeta **/data** se encuentra el .csv con los datos de los exoplanetas. Fuente de los datos: https://www.kaggle.com/datasets/adityamishraml/nasaexoplanets/data

Por último, en la carpeta **/notebook** se encuentra el notebook utilizado para realizar el EDA y las 
transformaciones previas a los datos.

La licencia del proyecto, **Apache-2.0 license**, se puede leer en el archivo **LICENSE**.