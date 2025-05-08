import "../components/css/CategoryCatalog.css";

const categories = [
  { title: "", image: "/resources/img/rowboat.png" },
  { title: "", image: "/resources/img/fones-de-ouvido.png" },
  { title: "", image: "/resources/img/guarda-roupa.png" },
  { title: "", image: "/resources/img/price-tag.png" },
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
