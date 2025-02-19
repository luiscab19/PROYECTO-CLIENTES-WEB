// Variables para almacenar el tamaño de las matrices
let tamanoA = { filas: 0, columnas: 0 };
let tamanoB = { filas: 0, columnas: 0 };

// Función para generar la matriz y los inputs manuales
function generarMatriz(tipo) {
    const filas = parseInt(document.getElementById(`filas${tipo}`).value);
    const columnas = parseInt(document.getElementById(`columnas${tipo}`).value);

    if (filas < 1 || filas > 5 || columnas < 1 || columnas > 5) {
        alert("El tamaño debe ser entre 1x1 y 5x5.");
        return;
    }

    if (tipo === 'A') {
        tamanoA = { filas, columnas };
        document.getElementById('limpiarA').disabled = false;
    } else {
        tamanoB = { filas, columnas };
        document.getElementById('limpiarB').disabled = false;
    }

    crearInputsManuales(tipo, filas, columnas);
}

// Función para crear inputs manuales
function crearInputsManuales(tipo, filas, columnas) {
    const contenedor = document.getElementById(`ingresoManual${tipo}`);
    contenedor.innerHTML = '';

    contenedor.style.display = 'grid';
    contenedor.style.gridTemplateColumns = `repeat(${columnas}, 50px)`;
    contenedor.style.gap = '10px';
    contenedor.style.justifyContent = 'center';

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `celda${tipo}${i}${j}`;
            input.placeholder = `${i},${j}`;
            contenedor.appendChild(input);
        }
    }
}

// Función para generar una matriz aleatoria
function generarMatrizAleatoria(tipo) {
    const filas = tipo === 'A' ? tamanoA.filas : tamanoB.filas;
    const columnas = tipo === 'A' ? tamanoA.columnas : tamanoB.columnas;

    if (filas === 0 || columnas === 0) {
        alert("Primero ingrese el tamaño de la matriz.");
        return;
    }

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const valor = Math.floor(Math.random() * 10); // Números entre 0 y 9
            document.getElementById(`celda${tipo}${i}${j}`).value = valor;
        }
    }
}

// Función para limpiar la matriz
function limpiarMatriz(tipo) {
    const filas = tipo === 'A' ? tamanoA.filas : tamanoB.filas;
    const columnas = tipo === 'A' ? tamanoA.columnas : tamanoB.columnas;

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            document.getElementById(`celda${tipo}${i}${j}`).value = '';
        }
    }
}

// Función para obtener una matriz desde los inputs
function obtenerMatriz(tipo) {
    const filas = tipo === 'A' ? tamanoA.filas : tamanoB.filas;
    const columnas = tipo === 'A' ? tamanoA.columnas : tamanoB.columnas;
    const matriz = [];

    for (let i = 0; i < filas; i++) {
        const fila = [];
        for (let j = 0; j < columnas; j++) {
            const valor = parseFloat(document.getElementById(`celda${tipo}${i}${j}`).value);
            if (isNaN(valor)) {
                alert("Por favor, ingrese todos los valores.");
                return null;
            }
            fila.push(valor);
        }
        matriz.push(fila);
    }

    return matriz;
}

// Función para mostrar una matriz en un contenedor
function mostrarMatriz(id, matriz) {
    const contenedor = document.getElementById(id);
    let html = '<table>';
    for (let fila of matriz) {
        html += '<tr>';
        for (let valor of fila) {
            html += `<td>${valor}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    contenedor.innerHTML = html;
}

// Función para sumar matrices
function sumarMatrices() {
    const matrizA = obtenerMatriz('A');
    const matrizB = obtenerMatriz('B');

    if (!matrizA || !matrizB) return;

    if (!checkDimensions(matrizA, matrizB)) {
        alert("Las matrices no tienen las mismas dimensiones.");
        return;
    }

    const resultado = matrizA.map((fila, i) => fila.map((valor, j) => valor + matrizB[i][j]));
    mostrarResultado([{ titulo: 'A + B', matriz: resultado }]);
}

// Función para restar matrices
function restarMatrices() {
    const matrizA = obtenerMatriz('A');
    const matrizB = obtenerMatriz('B');

    if (!matrizA || !matrizB) return;

    if (!checkDimensions(matrizA, matrizB)) {
        alert("Las matrices no tienen las mismas dimensiones.");
        return;
    }

    const resultado = matrizA.map((fila, i) => fila.map((valor, j) => valor - matrizB[i][j]));
    mostrarResultado([{ titulo: 'A - B', matriz: resultado }]);
}

// Función para multiplicar matrices
function multiplicarMatrices() {
    const matrizA = obtenerMatriz('A');
    const matrizB = obtenerMatriz('B');

    if (!matrizA || !matrizB) return;

    if (!checkMultiplicationCompatibility(matrizA, matrizB)) {
        alert("Las matrices no son compatibles para la multiplicación.");
        return;
    }

    const resultado = new Array(matrizA.length).fill(0).map(() => new Array(matrizB[0].length).fill(0));

    for (let i = 0; i < matrizA.length; i++) {
        for (let j = 0; j < matrizB[0].length; j++) {
            for (let k = 0; k < matrizA[0].length; k++) {
                resultado[i][j] += matrizA[i][k] * matrizB[k][j];
            }
        }
    }

    mostrarResultado([{ titulo: 'A * B', matriz: resultado }]);
}

// Función para multiplicar por un escalar
function multiplicarPorEscalar() {
    const matrizA = obtenerMatriz('A');
    const escalar = parseFloat(document.getElementById('scalar').value);

    if (!matrizA) return;

    if (isNaN(escalar)) {
        alert("Por favor, ingrese un escalar válido.");
        return;
    }

    const resultado = matrizA.map(fila => fila.map(valor => valor * escalar));
    mostrarResultado([
        { titulo: 'Matriz A', matriz: matrizA },
        { titulo: 'A * Escalar', matriz: resultado }
    ]);
}

// Función para mostrar el resultado
function mostrarResultado(resultados) {
    const contenedor = document.getElementById('resultado');
    let html = '<div class="result-display">';
    for (let res of resultados) {
        html += `<div><h3>${res.titulo}</h3>`;
        html += '<table>';
        for (let fila of res.matriz) {
            html += '<tr>';
            for (let valor of fila) {
                html += `<td>${valor}</td>`;
            }
            html += '</tr>';
        }
        html += '</table></div>';
    }
    html += '</div>';
    contenedor.innerHTML = html;
}

// Función para calcular el determinante (solo para matrices cuadradas)
function calcularDeterminante(tipo) {
    const matriz = obtenerMatriz(tipo);

    if (!matriz) return;

    if (matriz.length !== matriz[0].length) {
        alert("La matriz debe ser cuadrada para calcular el determinante.");
        return;
    }

    const determinante = calcularDeterminanteRecursivo(matriz);
    alert(`El determinante de la matriz ${tipo} es: ${determinante}`);
}

// Función recursiva para calcular el determinante
function calcularDeterminanteRecursivo(matriz) {
    if (matriz.length === 2) {
        return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
    }

    let det = 0;
    for (let i = 0; i < matriz.length; i++) {
        const submatriz = matriz.slice(1).map(fila => fila.filter((_, j) => j !== i));
        det += matriz[0][i] * Math.pow(-1, i) * calcularDeterminanteRecursivo(submatriz);
    }
    return det;
}

// Función para verificar dimensiones
function checkDimensions(matrizA, matrizB) {
    return matrizA.length === matrizB.length && matrizA[0].length === matrizB[0].length;
}

// Función para verificar compatibilidad de multiplicación
function checkMultiplicationCompatibility(matrizA, matrizB) {
    return matrizA[0].length === matrizB.length;
}

// Función para transponer una matriz
function transponerMatriz(tipo) {
    const matriz = obtenerMatriz(tipo); 

    if (!matriz) return; 

    const transpuesta = matriz[0].map((_, colIndex) => matriz.map(fila => fila[colIndex]));

    mostrarResultado([{ titulo: `Transpuesta de ${tipo}`, matriz: transpuesta }]);
}

// Función para generar la matriz identidad de tamaño nxn
function generarMatrizIdentidad(n) {
    const identidad = [];
    for (let i = 0; i < n; i++) {
        const fila = new Array(n).fill(0); 
        fila[i] = 1; 
        identidad.push(fila);
    }
    return identidad;
}

// Función para calcular la inversa de una matriz usando Gauss-Jordan
function calcularInversa(matriz) {
    const n = matriz.length;

    if (matriz.length !== matriz[0].length) {
        alert("La matriz debe ser cuadrada para calcular su inversa.");
        return null;
    }

    const aumentada = matriz.map((fila, i) => [
        ...fila.map(valor => parseFloat(valor.toFixed(2))), 
        ...Array(n).fill(0).map((_, j) => (i === j ? 1 : 0)) // Matriz identidad
    ]);

    for (let i = 0; i < n; i++) {
        if (aumentada[i][i] === 0) {
            let filaIntercambio = -1;
            for (let k = i + 1; k < n; k++) {
                if (aumentada[k][i] !== 0) {
                    filaIntercambio = k;
                    break;
                }
            }

            if (filaIntercambio === -1) {
                alert("La matriz no es invertible (determinante es 0).");
                return null;
            }

            [aumentada[i], aumentada[filaIntercambio]] = [aumentada[filaIntercambio], aumentada[i]];
        }

        const divisor = aumentada[i][i];
        for (let j = 0; j < 2 * n; j++) {
            aumentada[i][j] /= divisor;
        }

        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const factor = aumentada[k][i];
                for (let j = 0; j < 2 * n; j++) {
                    aumentada[k][j] -= factor * aumentada[i][j];
                }
            }
        }
    }

    const inversa = aumentada.map(fila => fila.slice(n));
    return inversa;
}

// Función para calcular y mostrar la inversa de una matriz
function calcularInversaMatriz(tipo) {
    const matriz = obtenerMatriz(tipo); 

    if (!matriz) return;

    const inversa = calcularInversa(matriz); 

    if (inversa) {
        mostrarResultado([{ titulo: `Inversa de ${tipo}`, matriz: inversa }]);
    }
}

// Función para generar y mostrar la matriz identidad
function generarYMostrarIdentidad() {
    const n = parseInt(prompt("Ingrese el tamaño de la matriz identidad (n):"));

    if (isNaN(n) || n < 1 || n > 5) {
        alert("El tamaño debe ser un número entre 1 y 5.");
        return;
    }

    const identidad = generarMatrizIdentidad(n);
    mostrarResultado([{ titulo: `Matriz Identidad ${n}x${n}`, matriz: identidad }]);
}