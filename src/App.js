import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import "./styles/styles.css";
import "./styles/mine.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RecipesAdd from "./components/RecipesAdd";
import RecipesEdit from "./components/RecipesEdit";
import Home from "./components/Home";
import RecipesView from "./components/RecipesView";
import MyRecipes from "./components/MyRecipes";
import Search from "./components/Search";
export default function App() {
  const initalUserState = {
    username:"",
    password:"",
    id:1
  }
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const spinnerRef = useRef(null);
  useEffect(() => {
    fetch("http://localhost:4000/recipes")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setRecipes(data);
      });
  }, []);
  return (
    <>
      <nav>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid"></div>
            <a className="navbar-brand">Full stack application for BooleanUK</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div>
              {user !== null ? (
                <ul>
                  <li>Logged in as: {user.username} </li>
                </ul>
              ) : (
                <>
                  <ul>
                    <li>
                      <Link to="/login">Log in</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/signup">Sign up</Link>
                    </li>
                    
                  </ul>
                </>
              )}
            </div>
          </nav>
        </div>
        <h2>Menu</h2>
        {user == null ? (
          <ul>
            <Link to="/">
              <li>All recipes</li>
            </Link>
            <li>Please log in or sign up to add a recipe</li>
          </ul>
        ) : (
          <ul>
            <Link to="/">
              <li>All recipes</li>
            </Link>
            <Link to="/recipes/add">
              <li>Add New Recipe</li>
            </Link>
            <Link to="/recipes/mine">
              <li>My recipes</li>
            </Link>
          </ul>
        )}
      </nav>
      <main>
        {/* funny looking spinner */}
        <div id="loading-spinner">
          {loading && (
            <div ref={spinnerRef} className="loader">
              <i className="fas fa-spinner fa-spin"></i> Loading...
            </div>
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                recipes={recipes}
                setRecipes={setRecipes}
                user={user}
                setUser={setUser}
              />
            }
          />

          <Route path="/recipes/:id" element={<RecipesView />} />
          {user===null && (
            <Route
            path="/recipes/add"
            element={<RecipesAdd user={user} setUser={setUser} setRecipes = {setRecipes}/>}
          />
          )}
          {user!==null && (
            <Route
            path="/recipes/add"
            element={<RecipesAdd user={user} setUser={setUser} setRecipes = {setRecipes} id = {user.id}/>}
          />
          )}
          
          <Route
            path="/recipes/mine/:id/edit"
            element={
              <RecipesEdit
                recipes={recipes}
                setRecipes={setRecipes}
                user={user}
                
              />
            }
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={<Signup user={user} setUser={setUser} />}
          />
          <Route
            path="/recipes/mine"
            element={
              <MyRecipes
                user={user}
                setRecipes={setRecipes}
                recipes={recipes}
              />
            }
          />
          <Route
            path="/search/:prompt"
            element={
              <Search
                user={user}
                setRecipes={setRecipes}
                recipes={recipes}
              />
            }
          />
          {/* Above should be the basic routes needed, not including search. */}
        </Routes>
      </main>
    </>
  );
}
