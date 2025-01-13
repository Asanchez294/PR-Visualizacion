import {loadExoplanetData} from "./src/scripts/csvLoader.js";
import {colorsPlanetType} from "./src/scripts/colors.js"
import {analysis1} from "./src/scripts/analysis1.js";
import {analysis2} from "./src/scripts/analysis2.js";
import {analysis3} from "./src/scripts/analysis3.js";
import {analysis4} from "./src/scripts/analysis4.js";

// Función para cargar los datos y llamar a todos los scripts de análisis
async function main() {
    try {
        // Cargar los datos de los exoplanetas
        const data = await loadExoplanetData('../data/exoplanets_clean.csv');
        console.log("Datos cargados correctamente");

        // Llamo a cada scripts para que defina los gráficos a mostrar
        analysis1(data, colorsPlanetType);
        analysis2(data, colorsPlanetType);
        analysis3(data, colorsPlanetType);
        analysis4(data, colorsPlanetType);

    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

main();
