(function(){
  const container = document.getElementById("container");
  const gradientControls = document.getElementById("gradient-controls");
  const grid = new Grid(70, 120, 30, container);
  const gradient1 = new Resource("#f00f92", 20, 5, 11, container, gradientControls, grid);
  const gradient2 = new Resource("#48ef0b", 20, 18, 11, container, gradientControls, grid);
  const gradient3 = new Resource("#0000ff", 20, 18, 17, container, gradientControls, grid);
  const organism = new OneCellOrganism(grid, 12, 13, "#f01111");
})();