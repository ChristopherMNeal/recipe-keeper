export default class Scaler {
// change these measurements and units to match what comes from the API
// change output to look nice

smallestUnit(unitNumber, iterator) {
  for (let iterator = volSmallestUnit.length; iterator > 0; iterator--) {
    if (remainder < 1) {
      return unitArray;
    } else if (remainder >= volSmallestUnit[iterator]) {
      const unitNumber Math.floor(remainder / volSmallestUnit[iterator]) + volUnitArray[iterator];
      remainder = remainder % volSmallestUnit[iterator];
      unitArray.push(unitNumber);
    }
}

findUnit(convertedInput) {
    const volSmallestUnit = [1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785];
    const volUnitArray = ["ml", "quarterTsp", "halfTsp", "tsp", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"];
    let unitArray = [];
    let remainder = 1;

    // how could I DRY these loops?
    // should this top loop be a do while loop so it always runs once?
    for (let i = volSmallestUnit.length; i > 0; i--) {
      if (convertedInput >= volSmallestUnit[i] && remainder >= 1) {
        const unitOne = Math.floor(convertedInput / volSmallestUnit[i]) + volUnitArray[i];
        remainder = convertedInput % volSmallestUnit[i];
        console.log("unit one = " + unitOne);
        console.log("remainder = " + remainder);
        unitArray.push(unitOne);
        for (let j = volSmallestUnit.length; j > 0; j--) {
          if (remainder < 1) {
            return unitArray;
          } else if (remainder >= volSmallestUnit[j]) {
            const unitTwo = Math.floor(remainder / volSmallestUnit[j]) + volUnitArray[j];
            remainder = remainder % volSmallestUnit[j];
            console.log("unit two = " + unitTwo);
            console.log("remainder = " + remainder);
            unitArray.push(unitTwo);
            for (let l = volSmallestUnit.length; l > 0; l--) {
              if (remainder < 1) {
                return unitArray;
              } else if (remainder >= volSmallestUnit[l]) {
                const unitThree = Math.floor(remainder / volSmallestUnit[l]) + volUnitArray[l];
                remainder = remainder % volSmallestUnit[l];
                console.log("unit three = " + unitThree);
                console.log("remainder = " + remainder);
                unitArray.push(unitThree);
                for (let k = volSmallestUnit.length; k > 0; k--) {
                  if (remainder < 1) {
                    return unitArray;
                  } else if (remainder >= volSmallestUnit[k]) {
                    const unitFour = Math.floor(remainder / volSmallestUnit[k]) + volUnitArray[k];
                    remainder = remainder % volSmallestUnit[k];
                    console.log("unit four = " + unitFour);
                    console.log("remainder = " + remainder);
                    unitArray.push(unitFour);
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

  scaler(input, unit, scale) {
    const volSmallestUnit = [1, 1.23, 2.46, 4.93, 14.79, 59, 78, 118, 236.6, 473.2, 946.3, 1000, 3785];
    const volUnitArray = ["ml", "quarterTsp", "halfTsp", "tsp", "tablespoon", "quarterCup", "thirdCup", "halfCup", "cup", "pint", "quart", "liter", "gallon"];
    const convertInput = input * volSmallestUnit[volUnitArray.indexOf(unit)] * scale;
    return findUnit(convertInput);
  }

}