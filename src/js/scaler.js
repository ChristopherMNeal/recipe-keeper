class Scaler {
  constructor(volSmallestUnit, volUnitArray, massSmallestUnit, massUnitArray) {
    this.volSmallestUnit = volSmallestUnit;
    this.volUnitArray = volUnitArray;
    this.massSmallestUnit = massSmallestUnit;
    this.massUnitArray = massUnitArray;

  }
}

function unitVolLogic(iterator, remainder, unitArray) {
  const refObject = new Scaler([1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785],["ml", "quarterTsp", "halfTsp", "teaspoon", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"],[1, 28.35, 453.59],["gram", "ounce", "pound"]);
  const volSmallestUnit = refObject.volSmallestUnit;
  const volUnitArray = refObject.volUnitArray;
  const unitNumber = Math.floor(remainder / volSmallestUnit[iterator]) + " " + volUnitArray[iterator];
  remainder = remainder % volSmallestUnit[iterator];
  unitArray.push(unitNumber);
  return remainder;
}


function smallestVolUnit(convertedInput) {
  let unitArray = [];
  let remainder = convertedInput;
  const refObject = new Scaler([1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785],["ml", "quarterTsp", "halfTsp", "teaspoon", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"],[1, 28.35, 453.59],["gram", "ounce", "pound"]);
  const volSmallestUnit = refObject.volSmallestUnit;
  for (let i = volSmallestUnit.length; i > 0; i--) {
    if (convertedInput >= volSmallestUnit[i] && remainder >= 1) {
      remainder = unitVolLogic(i, remainder, unitArray);
      for (let j = volSmallestUnit.length; j > 0; j--) {
        if (remainder < 1) {
          return unitArray;
        } else if (remainder >= volSmallestUnit[j]) {
          remainder = unitVolLogic(j, remainder, unitArray);
          for (let l = volSmallestUnit.length; l > 0; l--) {
            if (remainder < 1) {
              return unitArray;
            } else if (remainder >= volSmallestUnit[l]) {
              remainder = unitVolLogic(l, remainder, unitArray);
              for (let k = volSmallestUnit.length; k > 0; k--) {
                if (remainder < 1) {
                  return unitArray;
                } else if (remainder >= volSmallestUnit[k]) {
                  remainder = unitVolLogic(k, remainder, unitArray);
                  return unitArray;
                }
              }
            }
          }
        }
      }
    }
  }
}

function unitMassLogic(iterator, remainder, unitArray) {
  const refObject = new Scaler([1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785],["ml", "quarterTsp", "halfTsp", "teaspoon", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"],[1, 28.35, 453.59],["gram", "ounce", "pound"]);
  const massSmallestUnit = refObject.massSmallestUnit;
  const massUnitArray = refObject.massUnitArray;
  const unitNumber = Math.floor(remainder / massSmallestUnit[iterator]) + " " + massUnitArray[iterator];
  remainder = remainder % massSmallestUnit[iterator];
  unitArray.push(unitNumber);

  return remainder;
}


function smallestMassUnit(convertedInput) {
  let unitArray = [];
  let remainder = convertedInput;
  const refObject = new Scaler([1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785],["ml", "quarterTsp", "halfTsp", "teaspoon", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"],[1, 28.35, 453.59],["gram", "ounce", "pound"]);
  const massSmallestUnit = refObject.massSmallestUnit;
  for (let i = massSmallestUnit.length; i > 0; i--) {
    if (convertedInput >= massSmallestUnit[i] && remainder >= 1) {
      remainder = unitMassLogic(i, remainder, unitArray);
      for (let j = massSmallestUnit.length; j > 0; j--) {
        if (remainder < 1) {
          return unitArray;
        } else if (remainder >= massSmallestUnit[j]) {
          remainder = unitMassLogic(j, remainder, unitArray);
          for (let l = massSmallestUnit.length; l > 0; l--) {
            if (remainder < 1) {
              return unitArray;
            } else if (remainder >= massSmallestUnit[l]) {
              remainder = unitMassLogic(l, remainder, unitArray);
              for (let k = massSmallestUnit.length; k > 0; k--) {
                if (remainder < 1) {
                  return unitArray;
                } else if (remainder >= massSmallestUnit[k]) {
                  remainder = unitMassLogic(k, remainder, unitArray);
                  return unitArray;
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
  const refObject = new Scaler([1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785],["ml", "quarterTsp", "halfTsp", "teaspoon", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"],[1, 28.35, 453.59],["gram", "ounce", "pound"]);
  const volSmallestUnit = refObject.volSmallestUnit;
  const volUnitArray = refObject.volUnitArray;
  const massSmallestUnit = refObject.massSmallestUnit;
  const massUnitArray = refObject.massUnitArray;
  let convertInput = 0;
  if (volUnitArray.indexOf(unit) !== -1) {
    convertInput = input * volSmallestUnit[volUnitArray.indexOf(unit)] * scale;
    return smallestVolUnit(convertInput, volUnitArray, volSmallestUnit);
  } else if (massUnitArray.indexOf(unit) !== -1) {
    convertInput = input * massSmallestUnit[massUnitArray.indexOf(unit)] * scale;
    return smallestMassUnit(convertInput, massUnitArray, massSmallestUnit);
  } else {
    return input * scale;
  }
}