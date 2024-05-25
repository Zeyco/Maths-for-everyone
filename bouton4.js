document.addEventListener('DOMContentLoaded', function() {
    // Les règles de dérivation et d'intégration
    const calculusRules = {
      powerRule: {
        regex: /^(\d*\.?\d+)?x\^(\d*\.?\d+)$/,
        derivative: (_, coefficient, exponent) => {
          coefficient = parseFloat(coefficient || 1);
          exponent = parseFloat(exponent);
          return `${coefficient * exponent}x^${exponent - 1}`;
        },
        primitive: (_, coefficient, exponent) => {
          coefficient = parseFloat(coefficient || 1);
          exponent = parseFloat(exponent);
          if (exponent !== -1) {
            return `(${coefficient}x^${exponent + 1})/${exponent + 1} + C`;
          } else {
            return "La primitive n'existe pas (division par zéro)";
          }
        }
      },
      constantRule: {
        regex: /^\d+$/,
        derivative: () => "0",
        primitive: (_, constant) => `${constant}x + C`
      },
      linearRule: {
        regex: /^(\d*\.?\d+)x\+(\d*\.?\d+)$/,
        derivative: (_, a, b) => {
          a = parseFloat(a);
          return `${a}`;
        },
        primitive: (_, a, b) => {
          a = parseFloat(a);
          b = parseFloat(b);
          return `(${a / 2}x^2) + ${b}x + C`;
        }
      },
      eRule: {
        regex: /^e(\^[^\s]+)?$/,
        derivative: (_, exponent) => {
          exponent = exponent || "";
          return `e${exponent} * ${calculusRules.powerRule.derivative(exponent)}`;
        },
        primitive: (_, exponent) => {
          exponent = exponent || "";
          return `e${exponent} + C`;
        }
      },
      lnRule: {
        regex: /^ln(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `1/${argument} * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `x * ln(${argument}) - x + C`;
        }
      },
      sinRule: {
        regex: /^sin(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `cos(${argument}) * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `-cos(${argument}) + C`;
        }
      },
      cosRule: {
        regex: /^cos(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `-sin(${argument}) * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `sin(${argument}) + C`;
        }
      },
      tanRule: {
        regex: /^tan(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `1 / cos(${argument})^2 * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `-ln(cos(${argument})) + C`;
        }
      },
      arcsinRule: {
        regex: /^arcsin(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `1 / sqrt(1 - ${argument}^2) * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `${argument} * arcsin(${argument}) + sqrt(1 - ${argument}^2) + C`;
        }
      },
      arccosRule: {
        regex: /^arccos(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `-1 / sqrt(1 - ${argument}^2) * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `${argument} * arccos(${argument}) - sqrt(1 - ${argument}^2) + C`;
        }
      },
      arctanRule: {
        regex: /^arctan(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `1 / (1 + ${argument}^2) * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `${argument} * arctan(${argument}) - 1/2 * ln(1 + ${argument}^2) + C`;
        }
      },
      sinhRule: {
        regex: /^sinh(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `cosh(${argument}) * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `cosh(${argument}) + C`;
        }
      },
      coshRule: {
        regex: /^cosh(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `sinh(${argument}) * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `sinh(${argument}) + C`;
        }
      },
      tanhRule: {
        regex: /^tanh(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `1 / cosh(${argument})^2 * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `ln(cosh(${argument})) + C`;
        }
      },
      arcsinhRule: {
        regex: /^arcsinh(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `1 / sqrt(1 + ${argument}^2) * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `${argument} * arcsinh(${argument}) - sqrt(1 + ${argument}^2) + C`;
        }
      },
      arccoshRule: {
        regex: /^arccosh(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `1 / sqrt(${argument}^2 - 1) * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `${argument} * arccosh(${argument}) - sqrt(${argument}^2 - 1) + C`;
        }
      },
      arctanhRule: {
        regex: /^arctanh(?:([^\s]+))?$/,
        derivative: (_, argument) => {
          return `1 / (1 - ${argument}^2) * ${calculusRules.powerRule.derivative(argument)}`;
        },
        primitive: (_, argument) => {
          return `${argument} * arctanh(${argument}) + 1/2 * ln(1 - ${argument}^2) + C`;
        }
      },
      productRule: {
        regex: /^([^\s]+)\*([^\s]+)$/,
        derivative: (fn1, fn2) => {
          return `${fn1}' * ${fn2} + ${fn1} * ${fn2}'`;
        },
        primitive: (fn1, fn2) => {
          return `Intégration par parties nécessaire`;
        }
      }
    };
  
    // Fonction pour calculer la dérivée
    function calculateDerivative(expression) {
      for (const rule in calculusRules) {
        const { regex, derivative } = calculusRules[rule];
        const match = expression.match(regex);
        if (match && match.length > 1) {
          return derivative(...match.slice(1));
        }
      }
      return "Règle de dérivation non trouvée";
    }
  
    // Fonction pour calculer la primitive
    function calculatePrimitive(expression) {
      for (const rule in calculusRules) {
        const { regex, primitive } = calculusRules[rule];
        const match = expression.match(regex);
        if (match) {
          if (match.length > 1) {
            return primitive(...match.slice(1));
          } else {
            return primitive(...match);
          }
        }
      }
      return "Règle de primitive non trouvée";
    }
  
    // Bouton pour calculer la dérivée
    document.getElementById('deriveButton').addEventListener('click', function() {
      const input = document.getElementById('derivativeFunctionInput').value;
      const result = calculateDerivative(input);
      document.getElementById('result').innerText = `La dérivée de ${input} est : ${result}`;
    });
  
    // Bouton pour calculer la primitive
    document.getElementById('primitiveButton').addEventListener('click', function() {
      const input = document.getElementById('primitiveFunctionInput').value;
      const result = calculatePrimitive(input);
      document.getElementById('primitiveResult').innerText = `La primitive de ${input} est : ${result}`;
    });
});



  
  
  