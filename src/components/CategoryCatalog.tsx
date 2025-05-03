import "../components/css/CategoryCatalog.css";

const categories = [
  { title: "Womens Fashion", image: "/resources/img/woman-clothes.png" },
  { title: "Groceries & Pets", image: "/resources/img/grocery.png" },
  { title: "Health & Beauty", image: "/resources/img/shampoo.png" },
  { title: "Sports & Outdoor", image: "/resources/img/rowboat.png" },
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
