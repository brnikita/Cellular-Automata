class Grid {
  constructor(rows, columns, maxIntensity, container) {
    //stores all indexes, created during whole live of the grid instance
    this.intensityIndexes = [];
    //stores all actual intensity instances, format of the instance is an array [{x:,y:,color:,intensity:}]
    this.intensityInstances = {};
    //stores actual state of the whole map of merged intencities {color:,intensity:}
    this.intensityMap = {};
    this.maxIntensity = maxIntensity;
    this.numberOfRows = rows;
    this.numberOfColumns = columns;
    this.cellsNumber = rows * columns;
    this.container = container;
    this.gridElement = null;
    return this;
  }


  //instanceIntensityArray an array [{x:,y:,color:,intensity:}]
  registerNewIntensity(instanceIntensityArray) {
    const newIndex = this.intensityIndexes.length + 1;
    this.intensityIndexes.push(newIndex);
    this.intensityInstances[newIndex] = _.cloneDeep(instanceIntensityArray);
    this.mergeIntensities();
    return newIndex;
  }

  //instanceIntensityArray an array [{x:,y:,color:,intensity:}]
  updateIntensity(index, instanceIntensityArray) {
    const intensityInstance = this.intensityInstances[index];

    if (intensityInstance) {
      delete this.intensityInstances[index];
    }
    this.intensityInstances[index] = _.cloneDeep(instanceIntensityArray);
    this.mergeIntensities();
  }

  removeIntensity(index) {
    const intensityInstance = this.intensityInstances[index];

    if (intensityInstance) {
      delete this.intensityInstances[index];
      this.mergeIntensities();
    }
  }


  mergeIntensities() {
  this.intensityMap = {};

    for (const key in this.intensityInstances) {
      const instanceIntensityArray = this.intensityInstances[key];
      for (const cell of instanceIntensityArray) {
        const numberOfTheCell = cell.y * this.numberOfColumns + cell.x;

        const currentIntensityInstance = this.intensityMap[numberOfTheCell];

        if (cell.organism) {
          this.intensityMap[numberOfTheCell] = {
            color: cell.color,
            organism: true,
            intensity: currentIntensityInstance?.intensity || 0
          };
          continue;
        }

        let mergedIntensities;
        if (!currentIntensityInstance) {
          mergedIntensities = cell.intensity;
          this.intensityMap[numberOfTheCell] = {
            color: cell.color,
            intensity: cell.intensity,
          };
          continue;
        }

        mergedIntensities = (Number(currentIntensityInstance.intensity) + Number(cell.intensity));
        if (mergedIntensities > this.maxIntensity) {
            mergedIntensities = this.maxIntensity;
        }
        const mergedColors = mergeRGBColors(currentIntensityInstance.color, cell.color);
        this.intensityMap[numberOfTheCell] = {
          color: mergedColors,
          intensity: mergedIntensities,
        };
      }
    }

    this.reDrawTheGrid();
  }


  reDrawTheGrid() {
    if (this.container.innerHTML){
      this.container.innerHTML = "";
    }

    const gridElement = document.createElement("div");
    this.gridElement = gridElement;
    gridElement.className = "grid";
    gridElement.style.gridTemplateColumns = `repeat(${this.numberOfColumns}, 10px)`;
    gridElement.style.gridTemplateRows = `repeat(${this.numberOfRows}, 10px)`;


    for (let i = 0; i < this.cellsNumber; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gridElement.appendChild(cell);
    }

    if (_.isEmpty(this.intensityMap)){
      this.container.appendChild(gridElement);
      return;
    }

    const intensityMap = this.intensityMap;
    for (let key in intensityMap) {
      const index = parseInt(key);
      if (intensityMap[key].organism){
        gridElement.children[index].style.backgroundColor = intensityMap[key].color;
        continue;
      }
      gridElement.children[index].style.backgroundColor = adjustRGBColorIntensity(intensityMap[key].color, intensityMap[key].intensity, this.maxIntensity);
    }

    this.container.appendChild(gridElement);
  }

}
