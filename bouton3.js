function fonctioncos() {
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "y = a * cos(b * x + c)",
                data: [],
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: "Courbe de la fonction trigonométrique"
            },
            scales: {
                x: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Valeur de x"
                    }
                },
                y: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Valeur de y"
                    }
                }
            }
        }
    });

    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x += 0.2) {
        xValues.push(x);
        yValues.push(a * Math.cos(b * x + c));
    }
    myChart.data.labels = xValues;
    myChart.data.datasets[0].data = yValues;
    myChart.update();
}

function fonctionsin() {
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "y = a * sin(b * x + c)",
                data: [],
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: "Courbe de la fonction trigonométrique"
            },
            scales: {
                x: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Valeur de x"
                    }
                },
                y: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Valeur de y"
                    }
                }
            }
        }
    });

    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x);
        yValues.push(a * Math.sin(b * x + c));
    }
    myChart.data.labels = xValues;
    myChart.data.datasets[0].data = yValues;
    myChart.update();
}

function fonctiontan() {
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "y = a * tan(b * x + c)",
                data: [],
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: "Courbe de la fonction trigonométrique"
            },
            scales: {
                x: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Valeur de x"
                    }
                },
                y: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Valeur de y"
                    }
                }
            }
        }
    });

    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x);
        yValues.push(a * Math.tan(b * x + c));
    }
    myChart.data.labels = xValues;
    myChart.data.datasets[0].data = yValues;
    myChart.update();
}

function findMinMaxOfCurve() {
    const chart = document.getElementById("myChart").getContext("2d");
    const imageData = chart.getImageData(0, 0, chart.canvas.width, chart.canvas.height);
    const data = imageData.data;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < data.length; i += 4) {
        const pixelValue = data[i + 1]; // Green channel contains the brightness value
        if (pixelValue < minY) {
            minY = pixelValue;
        }
        if (pixelValue > maxY) {
            maxY = pixelValue;
        }
    }

    return { min: minY, max: maxY };
}

function findMinAndMax() {
    const minMaxValues = findMinMaxOfCurve();
    document.getElementById("minMaxValues").innerHTML = `Minimum: ${minMaxValues.min}, Maximum: ${minMaxValues.max}`;
}

  