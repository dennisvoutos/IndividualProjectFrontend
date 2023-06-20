import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, Route, Routes } from "react-router-dom";

function RecipesView(props) {
    const [recipe,setRecipe] = useState(false)
    const params = useParams()
    useEffect(function () {
        fetch(`http://localhost:4000/recipes/${params.id}`)
          .then((res) => res.json())
          .then((data) => setRecipe(data));
      }, []);
    if(!recipe){
        return(
            <p>Loading</p>
        )
    }
    return (
        <div>
          <h2>{recipe.title}</h2>
          <p>recipe.description</p>
          <div>
            <ul>
                {recipe.ingredients.map((ingredient)=>(
                    <li>{ingredient.quantity} {ingredient.typeOfQUantity} of {ingredient.name}</li>
                ))}
            </ul>
          </div>
          <Link to ={"/"}>Back</Link>
        </div>
        
      )
}
export default RecipesView;