export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  discount: string;
  rating: number;
  favorited?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    title: "Casual-men-s-wear",
    image: "./resources/img/produtos/7.png", // use a imagem real ou local
    price: 150,
    discount: "20% Off",
    rating: 4.9,
    favorited: false,
  },
  {
    id: 2,
    title: "Nike Sport light Shoes",
    image: "./resources/img/produtos/3.png", // use a imagem real ou local
    price: 150,
    discount: "30% Off",
    rating: 4.9,
    favorited: true,
  },
];

export default products;
