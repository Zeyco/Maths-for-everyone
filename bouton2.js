function tracerCourbe() {
    // Récupérer les valeurs de a, b et c
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var c = document.getElementById("c").value;
    console.log(a)

    // Générer les points de la courbe
    var data = {
        labels: [],
        datasets: [{
            label: 'Courbe Quadratique',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: []
        }]
    };

    for (var x = -10; x <= 10; x += 0.1) {
        var y = a * x * x + b * x + parseFloat(c);
        data.labels.push(x);
        data.datasets[0].data.push(y);
    }

    // Configuration du graphique
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    type: 'linear',
                    position: 'left'
                }
            }
        }
    });
}
