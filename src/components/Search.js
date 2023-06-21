import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function Search(){
    const params = useParams()
    const prompt = params.prompt;
    const [seachedRecipes,setSearchedRecipes] = useState(null)
    useEffect(()=>{
        fetch(`http://localhost:4000/recipes/search/${prompt}`)
        .then((res) => res.json())
        .then((data) => {setSearchedRecipes(data); console.log(data)});
    },[])
    if(!seachedRecipes){
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
              <th scope="col">description</th>
              <th scope="col">ingredients</th>
              <th scope="col">Creator</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {seachedRecipes.map((recipe, index) => (
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
                  <Link to={`http://localhost:3000/recipes/${recipe.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
            <Link to = "/">return</Link>
        </div>
      </div>
    </div>
    )
}