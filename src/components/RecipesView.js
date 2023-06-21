import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";

function RecipesView(props) {
  const [recipe, setRecipe] = useState(false);
  const params = useParams();
  useEffect(function () {
    fetch(`http://localhost:4000/recipes/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        console.log(data);
      });
  }, []);
  if (!recipe) {
    return <p>Loading</p>;
  }
  return (
    <div className="recipe-view">
      <h2 className="recipe-title">{recipe.title}</h2>
      <p className="recipe-description">{recipe.description}</p>
      <div className="recipe-ingredients">
        <ul>
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i} className="ingredient">
              {ingredient.quantity} {ingredient.typeOfQuantity} of{" "}
              {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
      <Link to={"/"}>Back</Link>
    </div>
  );
}
export default RecipesView;
