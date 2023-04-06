class OneCellOrganism {
  constructor(gridInfo, gradient1) {
    this.numberOfColumns = gridInfo.numberOfColumns;
    this.cellsNumber = gridInfo.cellsNumber;
    this.intensityMap = gridInfo.intensityMap;
    this.selectedColor = gradient1.selectedColor;
    this.selectedIntensity = gradient1.selectedIntensity;
    this.x = Math.floor(Math.random() * this.numberOfColumns);
    this.y = Math.floor(Math.random() * Math.floor(this.cellsNumber / this.numberOfColumns));
    this.prevX = null;
    this.prevY = null;
    this.moveDelay = 500; // Move every 500ms
    this.move();
  }

  brain(thisX, thisY) {
    let newX = thisX;
    let newY = thisY;
    let newXY = {};
    let maxIntensity = 0;

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

    const intensity = this.intensityMap[y][x];

    if (intensity > maxIntensity) {
      maxIntensity = intensity;
      newX = x;
      newY = y;
    }
  }

  newXY.x= newX;
  newXY.y= newY;
  return newXY;
}

  move() {
    setTimeout(() => {
      let decision = this.brain(this.x, this.y);
      let newX = decision.x;
      let newY = decision.y;

      this.prevX = this.x;
      this.prevY = this.y;
      this.x = newX;
      this.y = newY;
      this.draw();
      this.move();
    }, this.moveDelay);
  }

  draw() {
    if (this.prevX !== null && this.prevY !== null) {
      const prevIndex = this.prevY * this.numberOfColumns + this.prevX;
      const prevIntensity = this.intensityMap[this.prevY][this.prevX];
      const prevBgColor = `rgba(${hexToRgb(this.selectedColor)}, ${prevIntensity})`;
      container.children[prevIndex].style.backgroundColor = prevBgColor;
    }

    const index = this.y * this.numberOfColumns + this.x;
    const organismColor = "rgba(255, 0, 0, 0.5)";
    container.children[index].style.backgroundColor = organismColor;
  }
}