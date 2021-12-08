import scalerLogic from "../src/js/scaler";

describe('scalerLogic', () => {

  test('should return X ounces when X ounce scaled 1 time is entered', () => {
    // expect(scalerLogic(1, "ounce", 1)).toEqual("1 ounce");
    // expect(scalerLogic(2, "ounce", 1)).toEqual("2 ounce");
    expect(scalerLogic(3, "ounce", 1)).toEqual("3 ounce");
    // expect(scalerLogic(4, "ounce", 1)).toEqual("4 ounce");
    // expect(scalerLogic(5, "ounce", 1)).toEqual("5 ounce");
    // expect(scalerLogic(6, "ounce", 1)).toEqual("6 ounce");
    expect(scalerLogic(7, "ounce", 1)).toEqual("7 ounce");
    expect(scalerLogic(8, "ounce", 1)).toEqual("8 ounce");
    expect(scalerLogic(9, "ounce", 1)).toEqual("9 ounce");
    expect(scalerLogic(10, "ounce", 1)).toEqual("10 ounce");
    expect(scalerLogic(11, "ounce", 1)).toEqual("11 ounce");
    expect(scalerLogic(12, "ounce", 1)).toEqual("12 ounce");
    expect(scalerLogic(13, "ounce", 1)).toEqual("13 ounce");
    expect(scalerLogic(14, "ounce", 1)).toEqual("14 ounce");
    expect(scalerLogic(15, "ounce", 1)).toEqual("15 ounce");
  });
});
