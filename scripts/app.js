(function(){
  const container = document.getElementById("container");
  const gradientControls = document.getElementById("gradient-controls");
  const grid = new Grid(70, 120, 30, container);
  const gradient1 = new Gradient("#0000ff", 11, 5, 11, container, gradientControls, grid);
  const gradient2 = new Gradient("#0000ff", 11, 18, 11, container, gradientControls, grid);
  const gradient3 = new Gradient("#0000ff", 11, 18, 17, container, gradientControls, grid);
  const organism = new OneCellOrganism(grid, 12, 13, "#f01111");
})();
