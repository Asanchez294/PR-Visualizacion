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
            mode: 'markers',
            marker: {
                size: 8,
                color: colorsPlanetType[planetType],
            },
            name: planetType,
            type: 'scatter3d'
        };
    })

    const layout = {
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        scene: {
            xaxis: {title: 'Radio orbital (en AU)'},
            yaxis: {title: 'Periodo orbital (en años)'},
            zaxis: {title: 'Excentricidad'}
        },
        showlegend: true
    };

    Plotly.newPlot('scatter3D', planetData, layout, {
        showTips: false
    });
}