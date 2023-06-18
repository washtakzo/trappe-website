type CustomizableProduct = {
  title: string;
  image: string;
};

type Trappe = {
  id: string;
  name: string;
  prices: { surface: number; pricePerMetter: number }[];
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  shortDescription: string;
  longDescription: string;
  images: string[];
};
