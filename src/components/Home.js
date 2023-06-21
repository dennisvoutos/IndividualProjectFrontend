import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import seachImage from "../mg.png"
export default function Home(props) {
  const handleSearch = (e) =>{
    setSearchbar(e.target.value)
  }
  const handleSubmit = async (e) =>{
    navigate(`/search/${searchbar}`)
  }
  const navigate = useNavigate();
  // const [recipes,setRecipes] = useState([])
  const { recipes, setRecipes, user, setuser } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchbar,setSearchbar] = useState();
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
    if(user===null){
      return (
      <div>
        <p>Data loading</p>
        <p>Not logged in</p>
      </div>);
    }else{
      return <div>Data loading</div>;
    }
    
  }
  return (
    <div className="container">
  <div className="search-bar">
    <form onSubmit={handleSubmit}>
      <label className="search-label" htmlFor="searchBar" placeholder="Search">
        <input
          type="text"
          id="searchBar"
          name="searchBar"
          value={searchbar}
          onChange={handleSearch}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <img src ={seachImage} alt = "search" className="search-icon"></img>
        </button>
      </label>
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
            <th scope="row" key={index} className="recipe-index">
              {index + 1}
            </th>
            <td className="recipe-title">{recipe.title}</td>
            <td className="recipe-description">{recipe.description}</td>
            <td className="recipe-ingredients">
              <ul>
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>
                    {ingredient.quantity} {ingredient.typeOfQuantity} of {ingredient.name}
                  </li>
                ))}
              </ul>
            </td>
            <td className="recipe-creator">{recipe.creator.username}</td>
            <td className="recipe-view">
              <Link to={`recipes/${recipe.id}`} className="view-link">
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}
