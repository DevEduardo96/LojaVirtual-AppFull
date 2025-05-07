import "../components/css/CategoryCatalog.css";

const categories = [
  { title: "", image: "/resources/img/woman-clothes.png" },
  { title: "", image: "/resources/img/grocery.png" },
  { title: "", image: "/resources/img/shampoo.png" },
  { title: "", image: "/resources/img/rowboat.png" },
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
