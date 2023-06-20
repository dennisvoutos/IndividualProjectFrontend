import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
    const [items,setItems] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    const [users,setUsers] = useState([])
    useEffect(()=>{
        loadRecipes();
    },[])
    const loadRecipes = async() =>{
        fetch('http://localhost:4000/recipes')
        .then(res => res.json())
        .then(json => {
            setItems(json)
            setIsLoaded(true);
            console.log(json);
        })
    }
    if(!isLoaded){
        return(
            <div>Data loading</div>
        )
    } 
  return (
    <div className="container">
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
            {
                items.map((recipe,index)=>(
                    <tr>
                        <th scope="row" key={index}>{index+1}</th>
                        <td>{recipe.title}</td>
                        <td>{recipe.description}</td>
                        <td>{recipe.ingredients}</td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
