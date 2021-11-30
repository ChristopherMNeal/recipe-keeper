function unitLogic(iterator, remainder, measurementArray, unitArray, smallestUnitArray) {
  const unit = Math.floor(remainder / smallestUnitArray[iterator]) + " " + unitArray[iterator];
  remainder = remainder % smallestUnitArray[iterator];
  measurementArray.push(unit);
  return remainder;
}


function smallestUnit(convertedInput, unitArray, smallestUnitArray) {
  let measurementArray = [];
  let remainder = convertedInput;
  for (let i = smallestUnitArray.length; i > 0; i--) {
    if (remainder >= smallestUnitArray[i] && remainder >= 1) {
      remainder = unitLogic(i, remainder, measurementArray, unitArray, smallestUnitArray);
      for (let j = smallestUnitArray.length; j > 0; j--) {
        if (remainder < 1) {
          return measurementArray;
        } else if (remainder >= smallestUnitArray[j]) {
          remainder = unitLogic(j, remainder, measurementArray, unitArray, smallestUnitArray);
          for (let l = smallestUnitArray.length; l > 0; l--) {
            if (remainder < 1) {
              return measurementArray;
            } else if (remainder >= smallestUnitArray[l]) {
              remainder = unitLogic(l, remainder, measurementArray, unitArray, smallestUnitArray);
              for (let k = smallestUnitArray.length; k > 0; k--) {
                if (remainder < 1) {
                  return measurementArray;
                } else if (remainder >= smallestUnitArray[k]) {
                  remainder = unitLogic(k, remainder, measurementArray, unitArray, smallestUnitArray);
                  return measurementArray;
                }
              }
            }
          }
        }
      }
    }
  }
}

export function scalerLogic(input, unit, scale) {
  const volSmallestUnit = [1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785];
  const volUnitArray = ["ml", "quarterTsp", "halfTsp", "teaspoon", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"];
  const massSmallestUnit = [1, 28.35, 453.59];
  const massUnitArray = ["gram", "ounce", "pound"];
  let convertInput = 0;
  if (volUnitArray.indexOf(unit) != -1) {
    convertInput = input * volSmallestUnit[volUnitArray.indexOf(unit)] * scale;
    return smallestUnit(convertInput, volUnitArray, volSmallestUnit);
  } else if (massUnitArray.indexOf(unit) != -1) {
    convertInput = input * massSmallestUnit[massUnitArray.indexOf(unit)] * scale;
    return smallestUnit(convertInput, massUnitArray, massSmallestUnit);
  } else {
    return input * scale + " " + unit;
  }
}