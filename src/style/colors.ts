export const rgbToRgba = (rgb: string, a: number) =>
  rgb.replace("rgb", "rgba").replace(")", ", 0.9)");
