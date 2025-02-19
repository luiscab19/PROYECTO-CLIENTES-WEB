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
    contenedor.innerHTML = ''; // Limpiar el contenedor

    // Crear una cuadrícula (grid) para los inputs
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

    // Botón para generar matriz aleatoria
    const botonAleatorio = document.createElement('button');
    botonAleatorio.textContent = 'Generar Aleatoria';
    botonAleatorio.onclick = () => generarMatrizAleatoria(tipo);
    contenedor.appendChild(botonAleatorio);
}

// Función para generar una matriz aleatoria
function generarMatrizAleatoria(tipo) {
    const filas = tipo === 'A' ? tamanoA.filas : tamanoB.filas;
    const columnas = tipo === 'A' ? tamanoA.columnas : tamanoB.columnas;

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