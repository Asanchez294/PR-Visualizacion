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
            color: 'rgba(255, 255, 255, 1)',
            line: {
                color: 'rgba(0, 0, 0, 1)',
                width: 3
            }
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
        xaxis: {
            automargin: true,
            title: {
                text: 'Método de detección',
                standoff: 20
            },
            gridcolor: 'rgba(255, 255, 255, 0.5)'
        },
        yaxis: {
            automargin: true,
            title: {
                text: 'Número de exoplanetas detectados',
                standoff: 20
            },
            gridcolor: 'rgba(255, 255, 255, 0.5)'
        },
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        font: {
            color: 'rgba(255, 255, 255, 1)'
        },
        height: 600
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
            categoryarray: detectionMethods,
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
            color: planetTypeColors,
        },
        hoverinfo: 'count'
    }];

    const parcatsLayout = {
        margin: {
            l: 150,
            r: 150,
            b: 50,
            t: 50,
            pad: 4
        },
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        font: {
            color: 'rgba(255, 255, 255, 1)',
        },
        arrangement: 'freeform',
        height: 800
    };

    Plotly.newPlot('parallelCategoriesDiagram', parcatsData, parcatsLayout, {
        showTips: false
    });
}