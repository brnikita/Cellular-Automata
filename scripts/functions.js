function rgbStringToObject(rgbString) {
  const matches = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return {
    r: parseInt(matches[1]),
    g: parseInt(matches[2]),
    b: parseInt(matches[3]),
  };
}

function rgbObjectToString(rgbObject) {
  return `rgb(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b})`;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
}

function mergeHexColors(hexColor1, hexColor2) {
  const color1 = hexToRgb(hexColor1);
  const color2 = hexToRgb(hexColor2);

  const mergedColor = {
    r: Math.round((color1.r + color2.r) / 2),
    g: Math.round((color1.g + color2.g) / 2),
    b: Math.round((color1.b + color2.b) / 2),
  };

  return `rgb(${mergedColor.r}, ${mergedColor.g}, ${mergedColor.b})`;
}


function mergeRGBColors(color1, color2) {
  const rgbColor1 = rgbStringToObject(color1);
  const rgbColor2 = rgbStringToObject(color2);

  const mergedColor = {
    r: Math.round((rgbColor1.r + rgbColor2.r) / 2),
    g: Math.round((rgbColor1.g + rgbColor2.g) / 2),
    b: Math.round((rgbColor1.b + rgbColor2.b) / 2),
  };

  return rgbObjectToString(mergedColor);
}

function adjustRGBColorIntensity(rgbColor, intensity, maxIntensity) {
  const factor = 1 - (intensity / maxIntensity);
  const rgbObject = rgbStringToObject(rgbColor);

  const adjustedColor = {
    r: Math.min(255, Math.round(rgbObject.r + (255 - rgbObject.r) * factor)),
    g: Math.min(255, Math.round(rgbObject.g + (255 - rgbObject.g) * factor)),
    b: Math.min(255, Math.round(rgbObject.b + (255 - rgbObject.b) * factor)),
  };

  return rgbObjectToString(adjustedColor);
}
