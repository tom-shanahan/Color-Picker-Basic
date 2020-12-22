import tinycolor from 'tinycolor2';

function fromRatio(color) {
  return tinycolor.fromRatio(color);
}

function toFullColor(color) {
  const { h } = tinycolor(color).toHsl();
  return tinycolor({ h, s: 100, l: 50, a: 1, });
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
