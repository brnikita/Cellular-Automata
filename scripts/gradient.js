class Gradient {
  constructor(initialColor, initialIntensity, initialXCoordinate, initialYCoordinate, container, gradientControls, gridInstance) {
    this.initialColor = initialColor || "#0000ff";
    this.initialIntensity = initialIntensity || 30;
    this.initialXCoordinate = initialXCoordinate || 0;
    this.initialYCoordinate = initialYCoordinate || 0;
    this.container = container;
    this.gradientArray = [];
    this.gridInstance = gridInstance;
    this.gradientControls = gradientControls;
    this.maxIntensity = gridInstance.maxIntensity || 99;
    this.numberOfRows = gridInstance.numberOfRows;
    this.numberOfColumns = gridInstance.numberOfColumns;
    this.cellsNumber = gridInstance.cellsNumber;
    this.intensityMap = gridInstance.intensityMap;
    this.gradientIntensityMap = {};
    this.createControls();
  }

  createControls() {
    const controlWrapper = document.createElement("div");

    this.colorInput = document.createElement("input");
    this.colorInput.type = "color";
    this.colorInput.id = "color";
    this.colorInput.value = this.initialColor;
    controlWrapper.appendChild(this.colorInput);

    const intensityLabel = document.createElement("label");
    intensityLabel.htmlFor = "intensity";
    intensityLabel.textContent = "Intensity (0-" + this.maxIntensity + "):";
    controlWrapper.appendChild(intensityLabel);

    this.intensityInput = document.createElement("input");
    this.intensityInput.type = "number";
    this.intensityInput.id = "intensity";
    this.intensityInput.min = "0";
    this.intensityInput.max = this.maxIntensity;
    this.intensityInput.value = this.initialIntensity;
    controlWrapper.appendChild(this.intensityInput);

    const xLabel = document.createElement("label");
    xLabel.htmlFor = "x";
    xLabel.textContent = "X:";
    controlWrapper.appendChild(xLabel);

    this.xInput = document.createElement("input");
    this.xInput.type = "number";
    this.xInput.id = "x";
    this.xInput.min = "0";
    this.xInput.max = this.gridInstance.numberOfColumns;
    this.xInput.value = this.initialXCoordinate
    controlWrapper.appendChild(this.xInput);

    const yLabel = document.createElement("label");
    yLabel.htmlFor = "y";
    yLabel.textContent = "Y:";
    controlWrapper.appendChild(yLabel);

    this.yInput = document.createElement("input");
    this.yInput.type = "number";
    this.yInput.id = "y";
    this.yInput.min = "0";
    this.yInput.max = this.gridInstance.numberOfColumns;
    this.yInput.value = this.initialYCoordinate;
    controlWrapper.appendChild(this.yInput);

    this.applyGradientButton = document.createElement("button");
    this.applyGradientButton.id = "applyGradient";
    this.applyGradientButton.textContent = "Submit";
    controlWrapper.appendChild(this.applyGradientButton);

    this.selectedColor = hexToRgb(this.colorInput.value);
    this.selectedIntensity = parseInt(this.intensityInput.value);

    this.applyGradientButton.addEventListener("click", () => {
      this.selectedColor = hexToRgb(this.colorInput.value);
      this.selectedIntensity = parseInt(this.intensityInput.value);
      const x = parseInt(this.xInput.value);
      const y = parseInt(this.yInput.value);
      this.applyGradient(x, y);
    });

    this.gradientControls.appendChild(controlWrapper);
    this.applyGradient(parseInt(this.initialXCoordinate), parseInt(this.initialYCoordinate));
  }

  applyGradient(xCenter, yCenter) {
    const newGradient = [];
    const radius = this.selectedIntensity;

    const minX = Math.max(0, xCenter - radius);
    const maxX = Math.min(this.numberOfColumns - 1, xCenter + radius);
    const minY = Math.max(0, yCenter - radius);
    const maxY = Math.min(this.numberOfRows - 1, yCenter + radius);

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const xDistance = xCenter - x;
        const yDistance = yCenter - y;
        const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        const intensity = Number(Math.max(0, this.selectedIntensity - distance).toFixed(2));
        const color = this.selectedColor;

        if (intensity > 0) {
          newGradient.push({
            x: x,
            y: y,
            color: color,
            intensity: intensity
          });
        }
      }
    }

    if (_.isEmpty(this.gradientIntensityMap)) {
      this.gradientIntensityMap = newGradient;
      this.gradientIndex = this.gridInstance.registerNewIntensity(newGradient);
      return;
    }

    this.gradientIntensityMap = newGradient;
    this.gridInstance.updateIntensity(this.gradientIndex, newGradient);
  }

}
