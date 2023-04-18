class Memory {
  dataMap = [];
  keyDataMap = {};
  decisionMap = [];
  keyDecisionMap = {};
  numberOfColumns = 0;
  constructor(dataMap, numberofColumns) {
      this.numberOfColumns = numberofColumns;
  }

  //dataMap -> [{x:, y:, intensity:}]
  setDataMap (dataMap) {
    if (!dataMap || !dataMap.length){
      return;
    }

    for (const data of dataMap) {
      if (this.dataMap.length == 18) {
        this.dataMap.shift();
      }
      this.dataMap.push(data);
    }
    this.setKeyDataMap ();
    this.setDecisionMap ();
  }

  setKeyDataMap (){
    let keyDataMap = {};

    for (const data of this.dataMap){
      keyDataMap[data.y * this.numberOfColumns + data.x] = data
    }

    this.keyDataMap = keyDataMap;
  }

  //Makes a desicion based on the avarage intensity of around cells including current cell.
  setDecisionMap (){
    const dataMap = this.getKeyDataMap();
    console.log ("dataMap", dataMap);
    const neighbors = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 0], [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];

    let keyDecisionMap = {};
    let decisionMap = [];

    for (const dataKey in dataMap) {
      const dataInstance = dataMap[dataKey];
      let numberOfneighbours = 0;
      let neighboursIntensitySum = 0;

      for (const [dx, dy] of neighbors) {
        let x = dataInstance.x + dx;
        let y = dataInstance.y + dy;
        let neighbourIntsance = dataMap[y * this.numberOfColumns + x];
        if (neighbourIntsance){
          numberOfneighbours++;
          neighboursIntensitySum = neighboursIntensitySum + neighbourIntsance.intensity;
        }
      }

      const decisionValue = Math.round(neighboursIntensitySum / numberOfneighbours * 1000) / 1000;
      const decision = {
        x: dataInstance.x,
        y: dataInstance.y,
        value: decisionValue
      };
      keyDecisionMap[dataKey] = decision;
      decisionMap.push(decision);
      }

      this.keyDecisionMap = keyDecisionMap;
      this.decisionMap = decisionMap;
    }

  getDataMap (){
    return this.dataMap;
  }

  getKeyDataMap (){
    return this.keyDataMap;
  }

  getDecisionMap (){
    return this.decisionMap;
  }

  getKeyDecisionMap (){
    return this.keyDecisionMap;
  }
}
