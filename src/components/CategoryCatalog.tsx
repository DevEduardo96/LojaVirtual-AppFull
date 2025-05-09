import "../components/css/CategoryCatalog.css";

const categories = [
  { title: "", image: "/img/rowboat.png" },
  { title: "", image: "/img/fones-de-ouvido.png" },
  { title: "", image: "/img/guarda-roupa.png" },
  { title: "", image: "/img/price-tag.png" },
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
