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
                line: {
                    color: 'rgba(0, 0, 0, 1)',
                    width: 2
                }
            },
            hovertemplate:
                '<b>%{text}</b><br>' +
                'Distancia: %{x} años luz<br>' +
                'Año: %{y}<br>'
        };
    });

    const scatterDiscoveryLayout = {
        margin: {
            l: 150,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        hovermode: 'closest',
        xaxis: {
            title: 'Distancia desde la Tierra (en años luz)',
            gridcolor: 'rgba(255, 255, 255, 0.5)'
        },
        yaxis: {
            automargin: true,
            title: {
                text: 'Año de descubrimiento',
                standoff: 20
            },
            gridcolor: 'rgba(255, 255, 255, 0.5)'
        },
        showlegend: true,
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        font: {
            color: 'rgba(255, 255, 255, 1)'
        },
        height: 600
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
        line: {
            color: 'rgba(255, 255, 255, 1)',
            width: 5
        },
        marker: {
            size: 10,
            line: {
                color: 'rgba(0, 0, 0, 1)',
                width: 2
            }
        }
    };

    const lineLayout = {
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        xaxis: {
            title: 'Año de descubrimiento',
            gridcolor: 'rgba(255, 255, 255, 0.5)'
        },
        yaxis: {
            automargin: true,
            title: {
                text: 'Número de exoplanetas descubiertos',
                standoff: 20
            },
            gridcolor: 'rgba(255, 255, 255, 0.5)'
        },
        showlegend: false,
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        font: {
            color: 'rgba(255, 255, 255, 1)'
        }
    };

    Plotly.newPlot('lineGraph', [trace], lineLayout, {
        showTips: false
    });
}