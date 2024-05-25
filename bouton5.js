document.addEventListener('DOMContentLoaded', function() {
    // Les règles de primitives
    const primitives = {
    // Règles pour les fonctions trigonométriques supplémentaires
    sinRule: {
    regex: /^sin\(([^)]+)\)$/,
    primitive: (argument) => {
    return `-cos(${argument}) + C`;
    }
    },
    cosRule: {
    regex: /^cos\(([^)]+)\)$/,
    primitive: (argument) => {
    return `sin(${argument}) + C`;
    }
    },
    tanRule: {
    regex: /^tan\(([^)]+)\)$/,
    primitive: (argument) => {
    return `-ln(|cos(${argument})|) + C`;
    }
    },
    arcsinRule: {
    regex: /^arcsin\(([^)]+)\)$/,
    primitive: (argument) => {
    return `${argument} * arcsin(${argument}) + sqrt(1 - (${argument})^2) + C`;
    }
    },
    arccosRule: {
    regex: /^arccos\(([^)]+)\)$/,
    primitive: (argument) => {
    return `${argument} * arccos(${argument}) - sqrt(1 - (${argument})^2) + C`;
    }
    },
    arctanRule: {
    regex: /^arctan\(([^)]+)\)$/,
    primitive: (argument) => {
    return `${argument} * arctan(${argument}) - 1/2 * ln(1 + (${argument})^2) + C`;
    }
    },
    // Règles pour les fonctions exponentielles et logarithmiques
    eRule: {
    regex: /^e\^([^)]+)$/,
    primitive: (argument) => {
    return `e^(${argument}) / (${argument}) + C`;
    }
    },
    lnRule: {
    regex: /^ln\(([^)]+)\)$/,
    primitive: (argument) => {
    return `${argument} * ln(${argument}) - ${argument} + C`;
    }
    },
    // Règle de puissance générale
    powerRule: {
    regex: /^(\d*\.?\d*)?x\^(\d*\.?\d*)$/,
    primitive: (coefficient, exponent) => {
    coefficient = parseFloat(coefficient || 1);
    exponent = parseFloat(exponent);
    if (exponent === -1) {
    return "La primitive n'existe pas (division par zéro)";
    } else {
    return `(${coefficient}x^${exponent + 1})/${exponent + 1} + C`;
    }
    }
    },
    // Règle pour les constantes
    constantRule: {
    regex: /^\d+$/,
    primitive: (constant) => {
    return `${constant}x + C`;
    }
    }
    };
    // Fonction pour calculer la primitive
    function calculatePrimitive(expression) {
    for (const rule in primitives) {
    const { regex, primitive } = primitives[rule];
    const match = expression.match(regex);
    if (match) {
    if (match.length > 1) {
    return primitive(...match.slice(1));
    } else {
    return primitive(match[0]);
    }
    }
    }
    return "Règle de primitive non trouvée";
    }
    // Bouton pour calculer la primitive
    document.getElementById('primitiveButton').addEventListener('click', function() {
    const input = document.getElementById('primitiveFunctionInput').value;
    const result = calculatePrimitive(input);
    document.getElementById('primitiveResult').innerText = `La primitive de ${input}


