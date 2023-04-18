class OneCellOrganism {
  constructor(gridInstance, xCoordinate, yCoordinate, organismColor) {
    this.numberOfColumns = gridInstance.numberOfColumns;
    this.cellsNumber = gridInstance.cellsNumber;
    this.gridInstance = gridInstance;
    this.moveDelay = 500; // Move every 500ms
    this.organismColor = hexToRgb(organismColor);
    this.x = xCoordinate;
    this.y = yCoordinate;
    this.memory = new Memory(null, this.numberOfColumns);
    this.organismIndex = gridInstance.registerNewIntensity([{x: xCoordinate, y: yCoordinate, color:this.organismColor, organism:true}]);
    this.move();
  }

  getNeighbours(thisX, thisY){
    let neighboursCells = [];
    const neighbors = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 0], [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];

    for (const [dx, dy] of neighbors) {
      const x = thisX + dx;
      const y = thisY + dy;

      if (x < 0 || x >= this.numberOfColumns || y < 0 || y >= Math.floor(this.cellsNumber / this.numberOfColumns)) {
        //checking field's borders
        continue;
      }

      const intensityMap = this.gridInstance.intensityMap;
      const intensityInstance = intensityMap[y * this.numberOfColumns + x];
      const intensity = intensityInstance ? intensityInstance.intensity : 0;
      neighboursCells.push({x:x,y:y,intensity:intensity});
    }

    return neighboursCells;
  }

  getHighDecisionCellFromMemory () {
    const decisionMap = this.memory.getDecisionMap();
    let maxDecisionValue = 0;
    let highDecision = null;


    console.log("decisionMap", decisionMap);
    if (decisionMap.length) {
        for (const decision of decisionMap) {
          if (decision.value > maxDecisionValue) {
            maxDecisionValue = decision.value;
            highDecision = decision;
          }
        }
    }

    return highDecision;
  }


  move() {
    setTimeout(() => {
      const dataMap = this.getNeighbours(this.x, this.y);
      this.memory.setDataMap(dataMap);

      let decision = this.getHighDecisionCellFromMemory(this.x, this.y);
      const newX = decision.x;
      const newY = decision.y;
      if (this.x != newX || this.y != newY){
        this.x = newX;
        this.y = newY;
        this.draw();
      }

      this.move();

    }, this.moveDelay);
  }

  draw() {
    this.gridInstance.updateIntensity(this.organismIndex, [{x:this.x, y:this.y, color:this.organismColor,organism:true}]);
  }
}
