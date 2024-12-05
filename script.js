function MCD_metodo2(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function MCM_metodo2(a, b) {
    return (a * b) / MCD_metodo2(a, b);
}

function factorizar(numero) {
    let factores = {};
    let divisor = 2;
    while (numero > 1) {
        while (numero % divisor === 0) {
            factores[divisor] = (factores[divisor] || 0) + 1;
            numero /= divisor;
        }
        divisor++;
    }
    return factores;
}

function factoresToString(factores) {
    // Convierte el objeto de factores en una cadena
    return Object.entries(factores)
        .map(([factor, potencia]) => `${factor}^${potencia}`)
        .join(" × ");
}

function MCD_metodo1(a, b) {
    let factoresA = factorizar(a);
    let factoresB = factorizar(b);
    let mcd = 1;

    for (let factor in factoresA) {
        if (factoresB[factor]) {
            mcd *= Math.pow(factor, Math.min(factoresA[factor], factoresB[factor]));
        }
    }
    return mcd;
}

function MCM_metodo1(a, b) {
    let factoresA = factorizar(a);
    let factoresB = factorizar(b);
    let mcm = 1;

    let todosFactores = { ...factoresA, ...factoresB };
    for (let factor in todosFactores) {
        mcm *= Math.pow(factor, Math.max(factoresA[factor] || 0, factoresB[factor] || 0));
    }
    return mcm;
}

document.getElementById("calculator-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const num1 = parseInt(document.getElementById("num1").value);
    const num2 = parseInt(document.getElementById("num2").value);
    const num3 = parseInt(document.getElementById("num3").value);
    const method = document.getElementById("method").value;

    let mcd, mcm;

    if (method === "1") {
        mcd = MCD_metodo1(MCD_metodo1(num1, num2), num3);
        mcm = MCM_metodo1(MCM_metodo1(num1, num2), num3);
    } else {
        mcd = MCD_metodo2(MCD_metodo2(num1, num2), num3);
        mcm = MCM_metodo2(MCM_metodo2(num1, num2), num3);
    }

    // Mostrar resultados del MCD y MCM
    document.getElementById("result").textContent = `MCD: ${mcd}, MCM: ${mcm}`;

    // Mostrar factores de cada número
    document.getElementById("factors1").textContent = `Número 1: ${factoresToString(factorizar(num1))}`;
    document.getElementById("factors2").textContent = `Número 2: ${factoresToString(factorizar(num2))}`;
    document.getElementById("factors3").textContent = `Número 3: ${factoresToString(factorizar(num3))}`;
});

    // Mostrar resultados en la consola
    console.log("Resultados:");
    console.log(`Número 1: ${num1}, Factores: ${factoresToString(factorizar(num1))}`);
    console.log(`Número 2: ${num2}, Factores: ${factoresToString(factorizar(num2))}`);
    console.log(`Número 3: ${num3}, Factores: ${factoresToString(factorizar(num3))}`);
    console.log(`MCD: ${mcd}`);
    console.log(`MCM: ${mcm}`);