function unitLogic(iterator, remainder, measurementArray, unitArray, smallestUnitArray) {
  const unit = Math.floor(remainder / smallestUnitArray[iterator]) + " " + unitArray[iterator];
  remainder = (remainder - smallestUnitArray[iterator] * (remainder / smallestUnitArray[iterator])).toFixed(4);
  measurementArray.push(unit);
  return remainder;
}


function smallestUnit(convertedInput, unitArray, smallestUnitArray) {
  let measurementArray = [];
  let remainder = convertedInput;
  for (let i = smallestUnitArray.length; i >= 0; i--) {
    if (remainder >= smallestUnitArray[i] && remainder >= smallestUnitArray[0]) {
      remainder = unitLogic(i, remainder, measurementArray, unitArray, smallestUnitArray);
      for (let j = smallestUnitArray.length; j >= 0; j--) {
        if (remainder < smallestUnitArray[0]) {
          return measurementArray;
        } else if (remainder >= smallestUnitArray[j]) {
          remainder = unitLogic(j, remainder, measurementArray, unitArray, smallestUnitArray);
          for (let l = smallestUnitArray.length; l >= 0; l--) {
            if (remainder < smallestUnitArray[0]) {
              return measurementArray;
            } else if (remainder >= smallestUnitArray[l]) {
              remainder = unitLogic(l, remainder, measurementArray, unitArray, smallestUnitArray);
              for (let k = smallestUnitArray.length; k >= 0; k--) {
                if (remainder < smallestUnitArray[0]) {
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

function convertUtility(input, unit, scale, measureArray, multiplyArray) {
  let convertInput = (input * multiplyArray[measureArray.indexOf(unit)] * scale).toFixed(4);
  if (convertInput < multiplyArray[0]) {
    convertInput = (convertInput/multiplyArray[0]).toFixed(2);
    return `${convertInput} ${measureArray[0]}`;
  } else {
    return smallestUnit(convertInput, measureArray, multiplyArray);
  }
}

function joinCheck(result) {
  if (typeof result === 'object') {
    return result.join(", ");
  } else {
    return result;
  }
}

export default function scalerLogic(input, unit, scale) {
  const volMetricMultiply = [1, 1000];
  const volMetricMeasure = ["ml", "liter"];
  const massMetricMultiply = [1, 1000, 1000000];
  const massMetricMeasure = ["gram", "kilogram", "metric ton"];
  const volUsMultiply = [0.616115, 1.23223, 2.46446, 4.92892, 14.7868, 59.147, 78.8627, 118.294, 236.5881, 473.176, 946.3525, 3785.41, 35239.1];
  const volUsMeasure = ["pinch", "quarter tsp", "half tsp", "teaspoon", "tablespoon", "quarter cup", "third cup", "half cup", "cup", "pint", "quart", "gallon", "bushel"];
  const massUsMultiply = [3.54369, 7.08738, 14.1748, 28.3495, 453.5925, 907185];
  const massUsMeasure = ["eighth ounce", "quarter ounce", "half ounce", "ounce", "pound", "ton"];
  let result = 0;
  if (volMetricMeasure.indexOf(unit) != -1) {
    result = convertUtility(input, unit, scale, volMetricMeasure, volMetricMultiply)
  } else if (volUsMeasure.indexOf(unit) != -1) {
    result = convertUtility(input, unit, scale, volUsMeasure, volUsMultiply)
  } else if (massMetricMeasure.indexOf(unit) != -1) {
    result = convertUtility(input, unit, scale, massMetricMeasure, massMetricMultiply)
  } else if (massUsMeasure.indexOf(unit) != -1) {
    result = convertUtility(input, unit, scale, massUsMeasure, massUsMultiply)
  } else if (unit === null) {
    result = "";
  } else {
    result = (input * scale) + " " + unit;
  }
  return joinCheck(result);
}