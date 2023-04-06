const container = document.getElementById("container");
const colorInput = document.getElementById("color");
const intensityInput = document.getElementById("intensity");
const xInput = document.getElementById("x");
const yInput = document.getElementById("y");
const applyGradientButton = document.getElementById("applyGradient");

const gridInfo = createGrid(80, 120, container);
const gradient1 = new Gradient(container, colorInput, intensityInput, xInput, yInput, applyGradientButton, gridInfo);
const organism = new OneCellOrganism(gridInfo, gradient1);