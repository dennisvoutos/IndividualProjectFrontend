import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function Search(){
    const params = useParams()
    const prompt = params.prompt;
    const [searchedRecipes,setSearchedRecipes] = useState(null)
    useEffect(()=>{
        fetch(`http://localhost:4000/recipes/search/${prompt}`)
        .then((res) => res.json())
        .then((data) => {setSearchedRecipes(data); console.log(data)});
    },[])
    if(!searchedRecipes){
        return(
            <p>Loading data</p>
        )
    }
    return(
        <div className="container">
      <div className="py-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Ingredients</th>
              <th scope="col">Creator</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {searchedRecipes.map((recipe, index) => (
              <tr key={index} className="recipe-row">
                <th scope="row" className="recipe-index">{index + 1}</th>
                <td className="recipe-title">{recipe.title}</td>
                <td className="recipe-description">{recipe.description}</td>
                <td className="recipe-ingredients">
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="ingredient">
                        {ingredient.quantity} {ingredient.typeOfQuantity} of {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="recipe-creator">{recipe.creator.username}</td>
                <td className="recipe-view">
                  <Link to={`http://localhost:3000/recipes/${recipe.id}`} className="view-link">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="return-section">
          <Link to="/" className="return-link">Return</Link>
        </div>
      </div>
    </div>
    )
}