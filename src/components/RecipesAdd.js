import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
const initialState = {
    title:"",
    description:""
}
const initialIngredientState = {
    name:"",
    quantity:"",
    type:""
}
function RecipesAdd(props) {
  const {recipes, setRecipes} = props;
  const navigate = useNavigate();
  const [form,setForm] = useState(initialState);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient,setIngredient] = useState(initialIngredientState);

  const handleFormChange = (e) =>{
    setForm({ ...form, [e.target.name]: [e.target.value] });
  }

  const handleIngredientChange = (e) =>{
    setIngredient({...ingredient, [e.target.name]: [e.target.value]});
  } 

  const handleAddIngredient = () => {
    const newIngredient = {
      name: ingredient.name,
      quantity: ingredient.quantity,
      typeofQuantity: ingredient.type
    };
    //here i have 2 options. post the ingredients in the server and use their id in the POST of the recipe, or try to see if i can post them all together.
    setIngredients([...ingredients, newIngredient]);
    setIngredient({
        name:"",
        quantity:"",
        type:""
    })
    alert('Ingredient added!');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can perform any additional actions, such as submitting the form or displaying a success message
    alert('Recipe added!');
    const res = fetch("http://localhost:4000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    await fetch("http://localhost:4000/recipes")
    .then ((res) => res.json)
    .then ((data) => setRecipes(data));
    //refresh all recipes.
    navigate("/app")
  };

  return (
    <div>
      <h1>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={form.title} onChange={handleFormChange} required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" value={form.description} onChange={handleFormChange} required />

        <h2>Ingredients:</h2>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <p>{ingredient.name}</p>
            <p>{ingredient.quantity} {ingredient.typeofQuantity}</p>
          </div>
        ))}

        <label htmlFor="ingredientName">Name:</label>
        <input type="text" id="ingredientName" value={ingredient.name} onChange={handleIngredientChange} />

        <label htmlFor="ingredientQuantity">Quantity:</label>
        <input type="text" id="ingredientQuantity" value={ingredient.quantity} onChange={handleIngredientChange} />

        <label htmlFor="ingredientTypeOfQuantity">Type of Quantity:</label>
        <input type="text" id="ingredientTypeOfQuantity" value={ingredient.type} onChange={handleIngredientChange} />

        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default RecipesAdd;