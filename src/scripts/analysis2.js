// Función para el gráfico 3D
export function analysis2(data, colorsPlanetType) {

    // Obtengo los tipos de planetas
    const planetTypes = [...new Set(data.map(d => d.planet_type))];

    // Similar a lo hecho en el análisis 1, hago esto para no tener que poner las trazas una a una y repetir código.
    const planetData = planetTypes.map(planetType => {
        const filteredData = data.filter(planet => planet.planet_type === planetType);
        return {
            x: filteredData.map(planet => planet.orbital_radius),
            y: filteredData.map(planet => planet.orbital_period),
            z: filteredData.map(planet => planet.eccentricity),
            text: filteredData.map(planet => planet.name),
            mode: 'markers',
            marker: {
                size: 10,
                color: colorsPlanetType[planetType],
                opacity: 0.8,
                line: {
                    color: 'rgba(0, 0, 0, 1)',
                    width: 2
                }
            },
            name: planetType,
            type: 'scatter3d',
            hovertemplate:
                '<b>%{text}</b><br>' +
                'Radio orbital: %{x} AU<br>' +
                'Periodo orbital: %{y} años<br>' +
                'Excentricidad: %{z}<br>'
        };
    })

    const layout = {
        margin: {
            l: 50,
            r: 50,
            b: 0,
            t: 0,
            pad: 4
        },
        height: 700,
        scene: {
            xaxis: {
                title: 'Radio orbital (en AU)',
                type: 'log',
                hoverformat: '.2f',
            },
            yaxis: {
                title: 'Periodo orbital (en años)',
                type: 'log',
                hoverformat: '.2f',
            },
            zaxis: {
                title: 'Excentricidad',
                type: 'log',
                hoverformat: '.2f',
            }
        },
        showlegend: true,
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        font: {
            color: 'rgba(255, 255, 255, 1)'
        }
    };

    Plotly.newPlot('scatter3DPlot', planetData, layout, {
        showTips: false
    });
}