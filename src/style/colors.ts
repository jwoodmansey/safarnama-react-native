// eslint-disable-next-line import/prefer-default-export
export const rgbToRgba = (rgb: string, a: number = 0.9) =>
  rgb.replace("rgb", "rgba").replace(")", `, ${a})`);
