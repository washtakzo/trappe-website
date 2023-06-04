type RectanglePercentage = {
  heightPercentage: number;
  widthPercentage: number;
};

export function getRectanglePercentages(
  height: number,
  width: number
): RectanglePercentage {
  if (height > width) {
    const widthPercentage = (width * 100) / height;
    return { heightPercentage: 100, widthPercentage };
  } else if (width > height) {
    const heightPercentage = (height * 100) / width;
    return { heightPercentage, widthPercentage: 100 };
  } else {
    return { heightPercentage: 100, widthPercentage: 100 };
  }
}
