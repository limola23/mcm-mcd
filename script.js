// Función para calcular el MCD utilizando el método de descomposición factorial
function MCD_metodo1(a, b) {
    const factoresA = factorizar(a);
    const factoresB = factorizar(b);
    const comunes = Object.keys(factoresA).filter(factor => factor in factoresB);
    let mcd = 1;

    comunes.forEach(factor => {
        mcd *= Math.pow(factor, Math.min(factoresA[factor], factoresB[factor]));
    });

    return mcd;
}

// Función para calcular el MCM utilizando el método de descomposición factorial
function MCM_metodo1(a, b) {
    const factoresA = factorizar(a);
    const factoresB = factorizar(b);
    const todosFactores = new Set([...Object.keys(factoresA), ...Object.keys(factoresB)]);
    let mcm = 1;

    todosFactores.forEach(factor => {
        mcm *= Math.pow(factor, Math.max(factoresA[factor] || 0, factoresB[factor] || 0));
    });

    return mcm;
}

// Función para calcular el MCD utilizando el Algoritmo de Euclides
function MCD_metodo2(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Función para calcular el MCM utilizando el MCD (Algoritmo de Euclides)
function MCM_metodo2(a, b) {
    return (a * b) / MCD_metodo2(a, b);
}

// Función para factorizar un número
function factorizar(num) {
    const factores = {};
    let divisor = 2;

    while (num > 1) {
        while (num % divisor === 0) {
            factores[divisor] = (factores[divisor] || 0) + 1;
            num /= divisor;
        }
        divisor++;
    }

    return factores;
}

// Función para convertir los factores a una cadena
function factoresToString(factores) {
    return Object.entries(factores)
        .map(([factor, exponente]) => `${factor}^${exponente}`)
        .join(" × ");
}

// Evento para manejar el envío del formulario
document.getElementById("calculator-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtén los valores de entrada
    const num1 = parseInt(document.getElementById("num1").value);
    const num2 = parseInt(document.getElementById("num2").value);
    const num3 = parseInt(document.getElementById("num3").value);
    const method = document.getElementById("method").value;

    let mcd, mcm;

    // Calcula el MCD y el MCM según el método seleccionado
    if (method === "1") {
        mcd = MCD_metodo1(MCD_metodo1(num1, num2), num3);
        mcm = MCM_metodo1(MCM_metodo1(num1, num2), num3);
    } else {
        mcd = MCD_metodo2(MCD_metodo2(num1, num2), num3);
        mcm = MCM_metodo2(MCM_metodo2(num1, num2), num3);
    }

    // Muestra los resultados en la página
    document.getElementById("result").textContent = `MCD: ${mcd}, MCM: ${mcm}`;
    document.getElementById("factors1").textContent = `Número 1: ${factoresToString(factorizar(num1))}`;
    document.getElementById("factors2").textContent = `Número 2: ${factoresToString(factorizar(num2))}`;
    document.getElementById("factors3").textContent = `Número 3: ${factoresToString(factorizar(num3))}`;

    // Muestra los resultados en la consola
    console.log("Resultados:");
    console.log(`Número 1: ${num1}, Factores: ${factoresToString(factorizar(num1))}`);
    console.log(`Número 2: ${num2}, Factores: ${factoresToString(factorizar(num2))}`);
    console.log(`Número 3: ${num3}, Factores: ${factoresToString(factorizar(num3))}`);
    console.log(`MCD: ${mcd}`);
    console.log(`MCM: ${mcm}`);
});
