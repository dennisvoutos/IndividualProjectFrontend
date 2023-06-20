import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function MyRecipes(props) {
    const {recipes, user, setRecipes } = props;
    const [myRecipes,setMyRecipes] = useState([])
    useEffect((
      setMyRecipes(recipes.filter((recipe)=> (recipe.creator.id === user.id)))
    ),[]);

    const deleteRecipe = async(e) =>{
        const newRecipes = myRecipes.filter((item) => item.id !== e.target.id);
        setMyRecipes(newRecipes);
        const res = fetch("http://localhost:4000/recipes/" + [e.target.id], {
        method: "DELETE",
        });
        await fetch("http://localhost:4000/recipes")
            .then((res) => res.json())
            .then((data) => setRecipes(data))
        
   }
   
   
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
            <th scope="row" key={index}>
              {index + 1}
            </th>
            <td>{recipe.title}</td>
            <td>{recipe.description}</td>
            <td>{recipe.ingredients}</td>
            <td><Link to ="/recipes/mine/:id/edit">Edit</Link></td>
            <td><button onClick={deleteRecipe}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
   )
}