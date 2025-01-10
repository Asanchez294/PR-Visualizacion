// Función para los gráficos sobre métodos de detección
export function analysis4(data, colorsPlanetType) {

    // Gráfico de barras

    // Hago el conteo de los planetas descubiertos por cada método de detección
    const detectionMethodCounts = data.reduce((counts, planet) => {
        counts[planet.detection_method] = (counts[planet.detection_method] || 0) + 1;
        return counts;
    }, {});

    // Orden descendente
    const sortedDetectionMethodCounts = Object.entries(detectionMethodCounts)
        .sort(([, countA], [, countB]) => countB - countA);

    const detectionMethods = sortedDetectionMethodCounts.map(([method,]) => method);
    const detectionCounts = sortedDetectionMethodCounts.map(([, count]) => count);

    const barData = [{
        x: detectionMethods,
        y: detectionCounts,
        type: 'bar',
        marker: {
            color: 'rgba(0, 0, 0, 1)'
        }
    }];

    const barLayout = {
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        xaxis: {title: 'Método de detección'},
        yaxis: {title: 'Número de exoplanetas detectados'},
        width: 800,
        height: 500
    };

    Plotly.newPlot('barGraph', barData, barLayout, {
        showTips: false
    });

    // Diagrama de categorías paralelas

    // Para tener los colores correspondiente al tipo de planeta
    const planetTypeColors = data.map(planet => colorsPlanetType[planet.planet_type])

    const dimensions = [
        // Al haber tantos grupos de métodos de detección pequeños, los ordeno de forma descendente
        // para que se vea de forma más organizada
        {
            label: 'Método de detección',
            values: data.map(planet => planet.detection_method),
            categoryorder: 'array',
            categoryarray: detectionMethods
        },
        {
            label: 'Tipo de planeta',
            values: data.map(planet => planet.planet_type)
        }
    ];

    const parcatsData = [{
        type: 'parcats',
        dimensions: dimensions,
        line: {
            shape: 'hspline',
            color: planetTypeColors
        },
        hoverinfo: 'count'
    }];

    const parcatsLayout = {
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        font: {
            size: 10
        },
        width: 800,
        height: 600
    };

    Plotly.newPlot('parallelCategoriesDiagram', parcatsData, parcatsLayout, {
        showTips: false
    });
}