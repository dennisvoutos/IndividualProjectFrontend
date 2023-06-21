import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Home(props) {
  const navigate = useNavigate();
  // const [recipes,setRecipes] = useState([])
  const { recipes, setRecipes, user, setuser } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    loadRecipes();
  }, []);
  const loadRecipes = async () => {
    fetch("http://localhost:4000/recipes")
      .then((res) => res.json())
      .then((json) => {
        setRecipes(json);
        setIsLoaded(true);
        console.log(json);
      });
  };
  if (!isLoaded) {
    return <div>Data loading</div>;
  }
  return (
    <div className="container">
      <div className="search-bar">
        <form>
          <label placeholder="Search"><input></input></label>
        </form>
      </div>
      <div className="py-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">description</th>
              <th scope="col">ingredients</th>
              <th scope="col">Creator</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={index}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{recipe.title}</td>
                <td>{recipe.description}</td>
                <td>
                  <ul>
                    {recipe.ingredients.map((ingredient) => (
                      <li>
                        {ingredient.quantity} {ingredient.typeOfQuantity} of{" "}
                        {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{recipe.creator.username}</td>
                <td>
                  <Link to={`recipes/${recipe.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
