import "../components/css/CategoryCatalog.css";

const categories = [
<<<<<<< HEAD
  { title: "Womens Fashion", image: "/resources/img/woman-clothes.png" },
  { title: "Groceries & Pets", image: "/resources/img/grocery.png" },
  { title: "Health & Beauty", image: "/resources/img/shampoo.png" },
  { title: "Sports & Outdoor", image: "/resources/img/rowboat.png" },
=======
  { title: "", image: "/resources/img/woman-clothes.png" },
  { title: "", image: "/resources/img/grocery.png" },
  { title: "", image: "/resources/img/shampoo.png" },
  { title: "", image: "/resources/img/rowboat.png" },
>>>>>>> 9037be7 (Integrações ao Carrinho)
];

const CategoryCatalog = () => {
  return (
    <div className="catalog-container">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`catalog-item ${
            category.title === "Clearance Sale" ? "highlight" : ""
          }`}
        >
          <img src={category.image} alt={category.title} />
          <p>{category.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryCatalog;
