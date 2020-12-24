import tinycolor from 'tinycolor2';

function fromRatio(color) {
  return tinycolor.fromRatio(color);
}

function toFullColor(color) {
  var { h } = tinycolor(color).toHsv();
  return tinycolor({ h:h, s: 100, v: 100 });
}

function toHSV(value) {
  if (typeof value === 'string') {
    return tinycolor(value).toHsv();
  }
  return {
    h: value.h,
    s: value.s,
    v: value.v,
    a: value.a,
  };
}

function toStringValue(color) {
  const val = tinycolor(color);
  return tinycolor(val).toRgb().a === 1 ? val.toHexString(): val.toRgbString();
}

export {
  fromRatio,
  toFullColor,
  toHSV,
  toStringValue,
};
