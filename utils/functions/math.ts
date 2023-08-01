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

type PriceData = {
  surface: number;
  pricePerMetter: number;
};

export function getTrappePrice(
  trappe: FetchedTrappe,
  width: number,
  height: number
) {
  const centimetersToMetters = 10;

  const surface = (width * height) / centimetersToMetters;

  const pricesJson = JSON.parse(trappe.prices);

  pricesJson.sort((a: PriceData, b: PriceData) => a.surface - b.surface);

  let priceData: PriceData = pricesJson[0];

  pricesJson.forEach((pd: PriceData) => {
    if (surface > pd.surface) priceData = pd;
  });

  const price = surface * priceData.pricePerMetter;

  return price.toFixed(2);
}
