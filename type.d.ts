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
  min_length: number;
  max_length: number;
  height: number;
  short_description: string;
  long_description: string;
  images: string[];
};

type NewTrappe = Omit<Trappe, "id">;

type FetchedTrappe = {
  id: string;
  name: string;
  prices: string;
  setup_price: number;
  shipping_price: number;
  min_width: number;
  max_width: number;
  min_length: number;
  max_length: number;
  height: number;
  short_description: string;
  long_description: string;
  images: string[];
};
type BuyInfo = {
  address: string;
  city: string;
  postalCode: string;
  method: "installation" | "shipping";
};

type Product = {
  trappe: Trappe;
  width: number;
  length: number;
  quantity: number;
  info: BuyInfo | null;
};
