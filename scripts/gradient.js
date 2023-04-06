class Gradient {
  constructor(container, colorInput, intensityInput, xInput, yInput, applyGradientButton, gridInfo) {
    this.container = container;
    this.colorInput = colorInput;
    this.intensityInput = intensityInput;
    this.xInput = xInput;
    this.yInput = yInput;
    this.applyGradientButton = applyGradientButton;
    this.numberOfColumns = gridInfo.numberOfColumns;
    this.cellsNumber = gridInfo.cellsNumber;
    this.intensityMap = gridInfo.intensityMap;
    this.selectedColor = colorInput.value;
    this.selectedIntensity = parseInt(intensityInput.value);

    this.applyGradientButton.addEventListener("click", () => {
      this.selectedColor = this.colorInput.value;
      this.selectedIntensity = parseInt(this.intensityInput.value);
      const x = parseInt(this.xInput.value);
      const y = parseInt(this.yInput.value);
      const index = y * this.numberOfColumns + x;
      this.applyGradient(index);
    });
  }

  applyGradient(index) {
    const cells = this.container.children;

    for (let i = 0; i < this.cellsNumber; i++) {
      const xDistance = (index % this.numberOfColumns) - (i % this.numberOfColumns);
      const yDistance = Math.floor(index / this.numberOfColumns) - Math.floor(i / this.numberOfColumns);
      const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

      const intensity = Math.max(0, this.selectedIntensity - distance);
      const bgColor = `rgba(${hexToRgb(this.selectedColor)}, ${intensity / 9})`;
      cells[i].style.backgroundColor = bgColor;
      createIntensityMap(i, intensity, this.numberOfColumns, this.intensityMap);
    }
  }
}