type CustomizableProduct = {
  title: string;
  image: string;
};

type Trappe = {
  id: string;
  name: string;
  prices: { surface: number; pricePerMetter: number }[];
  setup_price: number;
  shipping_price: number;
  min_width: number;
  max_width: number;
  min_height: number;
  max_height: number;
  short_description: string;
  long_description: string;
  images: string[];
};

type FetchedTrappe = {
  id: string;
  name: string;
  prices: string;
  setup_price: number;
  shipping_price: number;
  min_width: number;
  max_width: number;
  min_height: number;
  max_height: number;
  short_description: string;
  long_description: string;
  images: string[];
};
