let inputHeight, inputWidth;

function generarTablero() {
    const gridContainer = document.getElementById('grid-container');
    inputHeight = parseInt(document.getElementById('input-height').value);
    inputWidth = parseInt(document.getElementById('input-width').value);
    gridContainer.innerHTML = '';
    if (!inputHeight || !inputWidth) {
        alert('Por favor, introduce la altura y el ancho del tablero.');
        return;
    }

    gridContainer.style.gridTemplateColumns = `repeat(${inputWidth}, 20px)`;


    for (let i = 0; i < inputHeight; i++) {
        for (let j = 0; j < inputWidth; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.addEventListener('click', toggleCellState);
            gridContainer.appendChild(cellDiv);
        }
    }
}

function verPoblacion() {
    const gridContainer = document.getElementById('grid-container');
    const inputCode = document.getElementById('input-code').value;


    const filas = inputCode.split('#');
    

    const maxColLength = Math.max(...filas.map(fila => fila.length));


    if (filas.length > inputHeight || maxColLength > inputWidth) {
        alert('El código excede el tamaño del tablero.');
        return;
    }

    let cellIndex = 0;
    for (let i = 0; i < inputHeight; i++) {
        let fila = filas[i] || ''; 

        if (fila === '') {
            fila = '0'.repeat(inputWidth);
        }

        for (let j = 0; j < inputWidth; j++) {
            const celda = fila[j] || '0';
            const cellDiv = gridContainer.children[cellIndex];
            if (celda === '1') {
                cellDiv.classList.add('alive');
            } else {
                cellDiv.classList.remove('alive');
            }
            cellIndex++;
        }
    }
}

function borrarPoblacion() {
    const cells = document.getElementById('grid-container').children;
    for (let cell of cells) {
        cell.classList.remove('alive');
    }
}

function toggleCellState() {
    this.classList.toggle('alive');
}

function generarCodigoPoblacion() {
    const gridContainer = document.getElementById('grid-container');
    const cells = gridContainer.children;
    let codigo = '';
    let filasVacias = 0;

    for (let i = 0; i < inputHeight; i++) {
        let filaCodigo = '';
        for (let j = 0; j < inputWidth; j++) {
            const cellDiv = cells[i * inputWidth + j];
            filaCodigo += cellDiv.classList.contains('alive') ? '1' : '0';
        }

        if (filaCodigo.trim() === '0'.repeat(inputWidth)) {
            filasVacias++;
        } else {
            if (filasVacias > 0) {
                codigo += '#'.repeat(filasVacias);
                filasVacias = 0;
            }
            if (codigo.length > 0) {
                codigo += '#';
            }
            codigo += filaCodigo;
        }
    }
    
    if (filasVacias > 0) {
        codigo += '#'.repeat(filasVacias);
    }

    if (codigo.startsWith('#')) {
        codigo = codigo.substring(1);
    }
    if (codigo.endsWith('#')) {
        codigo = codigo.substring(0, codigo.length - 1);
    }

    document.getElementById('generated-code').innerText = `p=${codigo}`;
}

function copiarCodigo() {
    const codigo = document.getElementById('generated-code').innerText;
    navigator.clipboard.writeText(codigo).then(() => {
        alert('Código copiado al portapapeles');
    });
}

