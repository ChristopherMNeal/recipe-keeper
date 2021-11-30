class Scaler {
  constructor(volSmallestUnit, volUnitArray) {
    this.volSmallestUnit = volSmallestUnit;
    this.volUnitArray = volUnitArray;
  }
}

function unitLogic(iterator, remainder, unitArray) {
  const refObject = new Scaler([0.62, 1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785],["pinch", "ml", "quarterTsp", "halfTsp", "teaspoon", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"]);
  const volSmallestUnit = refObject.volSmallestUnit;
  const volUnitArray = refObject.volUnitArray;
  const unitNumber = Math.floor(remainder / volSmallestUnit[iterator]) + " " + volUnitArray[iterator];
  remainder = remainder % volSmallestUnit[iterator];
  unitArray.push(unitNumber);

  return remainder;
}


function smallestUnit(convertedInput) {
  let unitArray = [];
  let remainder = convertedInput;
  const refObject = new Scaler([0.62, 1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785],["pinch", "ml", "quarterTsp", "halfTsp", "teaspoon", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"]);

  const volSmallestUnit = refObject.volSmallestUnit;
  // const volUnitArray = refObject.volUnitArray;
  for (let i = volSmallestUnit.length; i > 0; i--) {
    if (convertedInput >= volSmallestUnit[i] && remainder >= 1) {
      remainder = unitLogic(i, remainder, unitArray);
      for (let j = volSmallestUnit.length; j > 0; j--) {
        if (remainder < 1) {
          return unitArray;
        } else if (remainder >= volSmallestUnit[j]) {
          remainder = unitLogic(j, remainder, unitArray);
          for (let l = volSmallestUnit.length; l > 0; l--) {
            if (remainder < 1) {
              return unitArray;
            } else if (remainder >= volSmallestUnit[l]) {
              remainder = unitLogic(l, remainder, unitArray);
              for (let k = volSmallestUnit.length; k > 0; k--) {
                if (remainder < 1) {
                  return unitArray;
                } else if (remainder >= volSmallestUnit[k]) {
                  remainder = unitLogic(k, remainder, unitArray);
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
  const refObject = new Scaler([0.62, 1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785],["pinch", "ml", "quarterTsp", "halfTsp", "teaspoon", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"]);
  const volSmallestUnit = refObject.volSmallestUnit;
  const volUnitArray = refObject.volUnitArray;
  const convertInput = input * volSmallestUnit[volUnitArray.indexOf(unit)] * scale;
  return smallestUnit(convertInput);
}


/* TO DO:
* try using map
* change units to match API
* change smallest units to match API?
* add support for mass (g, ounces, lbs, kg) and "each" measurements?
*/
// [pinch]
// [gram, ounce, pound, kilogram]
// [1, 28.35, 453.59, 1000]
// [null, <unit>, head, clove, piece, serving, stalk, block, bunch]