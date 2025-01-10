// Función para crear los 2 primeros gráficos
export function analysis1(data, colorsPlanetType) {

    // Obtengo los tipos de planetas
    const planetTypes = [...new Set(data.map(d => d.planet_type))];

    // Número de planetas por tipo
    const typeFreqs = planetTypes.map(type =>
        data.filter(d => d.planet_type === type).length
    );

    // Pie Chart
    const pieData = [{
        labels: planetTypes,
        values: typeFreqs,
        type: 'pie',
        marker: {colors: planetTypes.map(type => colorsPlanetType[type])},
    }];

    // De momento no voy a definir títulos para los gráficos (tengo los títulos del html)
    const pieLayout = {
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        }
    };

    Plotly.newPlot('pieChart', pieData, pieLayout, {
        showTips: false
    });

    // Scatter Plot
    // Lo hago de esta forma para no repetir código (en la documentación de Plotly hacen cada traza por separado)
    const scatterData = planetTypes.map(planetType => {
        const filteredData = data.filter(planet => planet.planet_type === planetType);
        return {
            x: filteredData.map(planet => planet.mass_earth),
            y: filteredData.map(planet => planet.radius_earth),
            text: filteredData.map(planet => planet.name),
            mode: 'markers',
            name: planetType,
            marker: {
                size: 10,
                color: colorsPlanetType[planetType],
            },
        };
    });

    const scatterLayout = {
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        xaxis: {title: 'Masas terrestres'},
        yaxis: {title: 'Radios terrestres'},
        showlegend: true,
    };

    Plotly.newPlot('scatterPlot', scatterData, scatterLayout, {
        showTips: false
    });
}