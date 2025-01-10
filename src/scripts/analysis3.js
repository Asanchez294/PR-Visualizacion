// Función para los graficos sobre el descubrimiento de planetas anual
export function analysis3(data, colorsPlanetType) {

    // Obtengo los tipos de planetas
    const planetTypes = [...new Set(data.map(d => d.planet_type))];

    // Scatter Plot
    const scatterDiscoveryData = planetTypes.map(planetType => {
        const filteredData = data.filter(planet => planet.planet_type === planetType);
        return {
            x: filteredData.map(planet => planet.distance),
            y: filteredData.map(planet => planet.discovery_year),
            text: filteredData.map(planet => planet.name),
            mode: 'markers',
            name: planetType,
            marker: {
                size: 10,
                color: colorsPlanetType[planetType],
            },
        };
    });

    const scatterDiscoveryLayout = {
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        xaxis: {title: 'Distancia desde la Tierra (en años luz)'},
        yaxis: {title: 'Año de descubrimiento'},
        showlegend: true,
    };

    Plotly.newPlot('scatterPlotDiscovery', scatterDiscoveryData, scatterDiscoveryLayout, {
        showTips: false
    });

    // Gráfico de líneas

    // Hago el conteo de los planetas descubiertos por año
    const discoveryCounts = data.reduce((counts, planet) => {
        counts[planet.discovery_year] = (counts[planet.discovery_year] || 0) + 1;
        return counts;
    }, {});

    const years = Object.keys(discoveryCounts);
    const counts = Object.values(discoveryCounts);

    const trace = {
        x: years,
        y: counts,
        mode: 'lines+markers',
        type: 'scatter',
        line: {color: 'black', width: 2},
    };

    const lineLayout = {
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        xaxis: {title: 'Año de descubrimiento'},
        yaxis: {title: 'Número de exoplanetas descubiertos'},
        showlegend: false
    };

    Plotly.newPlot('lineGraph', [trace], lineLayout, {
        showTips: false
    });
}