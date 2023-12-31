import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialIngredientState = {
  name: "",
  quantity: "",
  typeOfQuantity: "",
};

function RecipesEdit(props) {
  
  const [recipe, setRecipe] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:4000/recipes/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        console.log(data);
      });
  }, [params.id]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    userId: 0,
    ingredients: [],
  });

  useEffect(() => {
    if (recipe) {
      setForm({
        title: recipe.title,
        description: recipe.description,
        userId: recipe.userId,
        ingredients: recipe.ingredients,
      });
    }
  }, [recipe]);
  const [ingredient, setIngredient] = useState(initialIngredientState);

  if (!recipe) {
    return <p>Loading</p>;
  }
  const { recipes, setRecipes} = props;

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (e) => {
    setIngredient({ ...ingredient, [e.target.name]: e.target.value });
  };

  const handleAddIngredient = (e) => {
    const newIngredient = {
      name: ingredient.name,
      quantity: ingredient.quantity,
      typeOfQuantity: ingredient.typeOfQuantity,
    };
    //here i have 2 options. post the ingredients in the server and use their id in the POST of the recipe, or try to see if i can post them all together.
    // setIngredients([...ingredients, newIngredient]);
    setForm((prevForm) => ({
      ...prevForm,
      ingredients: [...prevForm.ingredients, newIngredient],
    }));
    setIngredient({
      name: "",
      quantity: "",
      typeOfQuantity: "",
    });
    alert("Ingredient added!");
  };
  const removeIngredient = (e) => {
    const newIngredients = form.ingredients.filter(
      (ingredient) => ingredient.name !== e.target.name
    );
    setForm((prevForm) => ({
      ...prevForm,
      ingredients: newIngredients,
    }));
    // setIngredients(newIngredients);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can perform any additional actions, such as submitting the form or displaying a success message
    try {
      const res = fetch(`http://localhost:4000/recipes/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setRecipes([...recipes, data]);
    } catch (error) {
      console.error("Error:", error);
    }
    alert("Recipe added!");
    navigate("/");
  };

  return (
    <div>
    <h1>Edit Recipe</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title" className="form-label">
        Title:
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={form.title}
        onChange={handleFormChange}
        required
        className="form-control"
      />
      <div>
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleFormChange}
          required
          className="form-control"
        />
      </div>
      <h2>Ingredients:</h2>
      <div>
        <ul className="list-group">
          {form.ingredients.map((ingredient, index) => (
            <li key={index} className="list-group-item">
              {ingredient.quantity} {ingredient.typeOfQuantity} of {ingredient.name}
              <button
                type="reset"
                onClick={removeIngredient}
                name={ingredient.name}
                className="btn btn-danger"
              >
                Remove ingredient
              </button>
            </li>
          ))}
        </ul>
      </div>
      <label htmlFor="ingredientName" className="form-label">
        Name:
      </label>
      <input
        type="text"
        id="ingredientName"
        name="name"
        value={ingredient.name}
        onChange={handleIngredientChange}
        className="form-control"
      />

      <label htmlFor="ingredientQuantity" className="form-label">
        Quantity:
      </label>
      <input
        type="number"
        id="ingredientQuantity"
        name="quantity"
        value={ingredient.quantity}
        onChange={handleIngredientChange}
        className="form-control"
      />

      <label htmlFor="ingredientTypeOfQuantity" className="form-label">
        Type of Quantity:
      </label>
      <input
        type="text"
        id="ingredientTypeOfQuantity"
        name="typeOfQuantity"
        value={ingredient.typeOfQuantity}
        onChange={handleIngredientChange}
        className="form-control"
      />

      <button type="button" onClick={handleAddIngredient} className="btn btn-primary">
        Add Ingredient
      </button>

      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  </div>
  );
}
export default RecipesEdit;
