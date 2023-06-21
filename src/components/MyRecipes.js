import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
export default function MyRecipes(props) {
  const navigate = useNavigate()
  const { recipes, user, setRecipes } = props;
  const [myRecipes, setMyRecipes] = useState(recipes.filter((recipe)=> recipe.creator.id === user.id));
  useEffect(() => {
    setMyRecipes(recipes.filter((recipe) => recipe.creator.id === user.id));
  }, [recipes, user]);

  const deleteRecipe = async (e) => {
  const recipeId = e.target.id;

  const newRecipes = myRecipes.filter((recipe) => recipe.id !== recipeId);
  setMyRecipes(newRecipes);

  try {
    await fetch(`http://localhost:4000/recipes/${recipeId}`, {
      method: "DELETE",
    });

    const res = await fetch("http://localhost:4000/recipes");
    const data = await res.json();
    setRecipes(data);
  } catch (error) {
    console.error("Error:", error);
  }

  navigate("/recipes/mine");
};

  return (
    <div className="py-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">description</th>
            <th scope="col">ingredients</th>
          </tr>
        </thead>
        <tbody>
          {myRecipes.map((recipe, index) => (
            <tr>
              <th scope="row" key={index} className="recipe-index" >
                {index + 1}
              </th>
              <td className="recipe-title">{recipe.title}</td>
              <td className="recipe-description">{recipe.description}</td>
              <td className="recipe-ingredients">
                <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key = {i}>
                      {ingredient.quantity} {ingredient.typeOfQuantity} of{" "}
                      {ingredient.name}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <Link to={`/recipes/mine/${recipe.id}/edit`} className="edit-link">Edit</Link>
              </td>
              <td>
                  <Link to={`http://localhost:3000/recipes/${recipe.id}`} className="view-link">View</Link>
                </td>
              <td>
                <button onClick={deleteRecipe} type="delete" id = {recipe.id} className="delete-button">Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
