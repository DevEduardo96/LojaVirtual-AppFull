export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  badge?: string;
  badgeType?: "new" | "discount" | "sale";
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Roof Lamp",
    price: 99,
    oldPrice: 113,
    badge: "New",
    badgeType: "new",
    image: "./resources/img/produtos/8.png",
  },
  {
    id: 2,
    title: "Sneaker Shoes",
    price: 87,
    oldPrice: 92,
    badge: "-18%",
    badgeType: "discount",
    image: "./resources/img/produtos/5.png",
  },
  {
    id: 3,
    title: "Wooden Chair",
    price: 21,
    oldPrice: 25,
    badge: "-11%",
    badgeType: "discount",
    image: "./resources/img/produtos/9.png",
  },
  {
    id: 4,
    title: "Polo Shirts",
    price: 38,
    oldPrice: 41,
    badge: "On Sale",
    badgeType: "sale",
    image: "./resources/img/produtos/baby-products.png",
  },
];

export default products;
