class Scaler {
  constructor(volSmallestUnit, volUnitArray) {
    this.volSmallestUnit = volSmallestUnit;
    this.volUnitArray = volUnitArray;
  }
}

function unitLogic(unitNumber, iterator, remainder, unitArray) {
  const refObject = new Scaler([1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785],["ml", "quarterTsp", "halfTsp", "tsp", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"]);
  const volSmallestUnit = refObject.volSmallestUnit;
  const volUnitArray = refObject.volUnitArray;
  unitNumber = Math.floor(remainder / volSmallestUnit[iterator]) + volUnitArray[iterator];
  remainder = remainder % volSmallestUnit[iterator];
  unitArray.push(unitNumber);

  return remainder;
}


function smallestUnit(convertedInput) {
  let unitArray = [];
  let remainder = convertedInput;
  const refObject = new Scaler([1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785],["ml", "quarterTsp", "halfTsp", "tsp", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"]);
  const volSmallestUnit = refObject.volSmallestUnit;
  // const volUnitArray = refObject.volUnitArray;
  for (let i = volSmallestUnit.length; i > 0; i--) {
    if (convertedInput >= volSmallestUnit[i] && remainder >= 1) {
      const unitOne = "";
      remainder = unitLogic(unitOne, i, remainder, unitArray);
      for (let j = volSmallestUnit.length; j > 0; j--) {
        if (remainder < 1) {
          return unitArray;
        } else if (remainder >= volSmallestUnit[j]) {
          const unitTwo = "";
          remainder = unitLogic(unitTwo, j, remainder, unitArray);
          for (let l = volSmallestUnit.length; l > 0; l--) {
            if (remainder < 1) {
              return unitArray;
            } else if (remainder >= volSmallestUnit[l]) {
              const unitThree =  "";
              remainder = unitLogic(unitThree, l, remainder, unitArray);
              for (let k = volSmallestUnit.length; k > 0; k--) {
                if (remainder < 1) {
                  return unitArray;
                } else if (remainder >= volSmallestUnit[k]) {
                  const unitFour =  "";
                  remainder = unitLogic(unitFour, k, remainder, unitArray);
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
  const refObject = new Scaler([1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785],["ml", "quarterTsp", "halfTsp", "tsp", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"]);
  const volSmallestUnit = refObject.volSmallestUnit;
  const volUnitArray = refObject.volUnitArray;
  const convertInput = input * volSmallestUnit[volUnitArray.indexOf(unit)] * scale;
  return smallestUnit(convertInput);
}
