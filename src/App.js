import { useEffect, useState, useRef } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./styles/styles.css";
import "./styles/mine.css";
import Navbar from "./Navbar";
import Login from "./project_components/Login";
import Signup from "./project_components/Signup";
import RecipesAdd from "./project_components/RecipesAdd";
import RecipesEdit from "./project_components/RecipesEdit";
import Home from "./project_components/Home";
import RecipesView from "./project_components/RecipesView";
import MyRecipes from "./project_components/MyRecipes";

export default function App() {
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
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Full stack application for BooleanUK
              </a>
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
                    <li>Logged in as: {user.username}</li>
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
            </div>
          </nav>
        </div>
        <h2>Menu</h2>
        if(user!==null)
        {
          <ul>
            <Link to="/">
              <li>All recipes</li>
            </Link>
            <li>Please log in or sign up to add a recipe</li>
          </ul>
        }
        else
        {
          <ul>
            <Link to="/">
              <li>All recipes</li>
            </Link>
            <Link to="/recipes/add">
              <li>Add New Recipe</li>
            </Link>
            <Link to="/recipes/mone">
              <li>My recipes</li>
            </Link>
          </ul>
        }
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
            element={<Home recipes={recipes} setRecipes={setRecipes} user = {user} setUser = {setUser} />}
          />
          <Route
            path="/app"
            element={<App/>}
          />
          <Route path="/recipes/:id" element={<RecipesView />} />
          <Route
            path="/recipes/add"
            element={<RecipesAdd user={user} setUser={setRecipes} />}
          />
          <Route
            path="/recipes/mine/:id/edit"
            element={<RecipesEdit recipes={recipes} setRecipes={setRecipes} user = {user}/>}
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
            element={<MyRecipes user={user} setRecipes = {setRecipes}recipes = {recipes}/>}
          />
          {/* Above should be the basic routes needed, not including search. */}
        </Routes>
      </main>
    </>
  );
}
