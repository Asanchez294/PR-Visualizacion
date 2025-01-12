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
        textinfo: "label+percent",
        pull: [0, 0, 0, 0.4, 0], //Para sacar el pedazo de tarta de Terrestrial
        insidetextfont: { color: 'rgba(255, 255, 255, 1)' },
        marker: {
            colors: planetTypes.map(type => colorsPlanetType[type]),
            line: {
                color: 'rgba(0, 0, 0, 1)',
                width: 2
            }
        },
        hovertemplate:
            '<b>%{label}</b><br>' +
            'Count: %{value}<br>' +
            'Porcentaje: %{percent}<br>' +
            '<extra></extra>'
    }];

    // De momento no voy a definir títulos para los gráficos (tengo los títulos del html)
    const pieLayout = {
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        font: {
            color: 'rgba(255, 255, 255, 1)'
        },
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
                line: {
                    color: 'rgba(0, 0, 0, 1)',
                    width: 2
                }
            },
            hovertemplate:
                '<b>%{text}</b><br>' +
                'Masa: %{x} M<sub>⊕</sub><br>' +
                'Radio: %{y} R<sub>⊕</sub><br>'
        };
    });

    const scatterLayout = {
        hovermode: 'closest',
        margin: {
            l: 150,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        height: 600,
        xaxis: {
            title: 'Masas terrestres',
            type: 'log',
            hoverformat: '.2f',
            tickformat: 'd',
            gridcolor: 'rgba(255, 255, 255, 0.5)'
        },
        yaxis: {
            automargin: true,
            title: {
                text: 'Radios terrestres',
                standoff: 10
            },
            type: 'log',
            hoverformat: '.2f',
            gridcolor: 'rgba(255, 255, 255, 0.5)'
        },
        showlegend: true,
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        font: {
            color: 'rgba(255, 255, 255, 1)'
        }
    };

    Plotly.newPlot('scatterPlot', scatterData, scatterLayout, {
        showTips: false
    });
}