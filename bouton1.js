function tracerCourbe() {
    // Récupérer les valeurs de a et b depuis les champs de texte
    var a = parseFloat(document.getElementById("valeur-de-a").value);
    var b = parseFloat(document.getElementById("valeur-de-b").value);

    // Générer les points de la fonction affine
    var data = {
        labels: [],
        datasets: [{
            label: 'Fonction Affine',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: []
        }]
    };

    // Calculer les valeurs de la fonction affine pour x de -10 à 10
    for (var x = -10; x <= 10; x += 0.1) {
        var y = a * x + b; // Remplacer avec vos coefficients a et b
        data.labels.push(x);
        data.datasets[0].data.push(y);
    }

    // Mettre à jour le graphique
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