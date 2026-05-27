// src/components/CategoryCard.jsx
function CategoryCard({ title }) {
  return (
    <div className="category-card">
      <h3>{title}</h3>
      <p>Explore {title.toLowerCase()} content</p>
    </div>
  );
}

export default CategoryCard;