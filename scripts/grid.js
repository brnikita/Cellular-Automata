function createIntensityMap(index, intensity, numberOfColumns, intensityMap) {
  if (!intensityMap[Math.floor(index / numberOfColumns)]) {
    intensityMap[Math.floor(index / numberOfColumns)] = [];
  }
  intensityMap[Math.floor(index / numberOfColumns)][index % numberOfColumns] = intensity / 9;
}

function createGrid(rows, columns, container) {
  numberOfColumns = columns;
  cellsNumber = rows * columns;
  container.style.gridTemplateColumns = `repeat(${columns}, 10px)`;
  container.style.gridTemplateRows = `repeat(${rows}, 10px)`;
  const intensityMap = [];

  for (let i = 0; i < cellsNumber; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    container.appendChild(cell);
    createIntensityMap(i, 0, numberOfColumns, intensityMap);
  }

  return { numberOfColumns, cellsNumber, intensityMap };
}