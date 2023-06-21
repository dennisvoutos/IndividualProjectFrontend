import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const initialState = {
  password: "",
  email: "",
};
function Login(props) {
  const { user, setUser } = props;
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const clearForm = (e) => {
    setForm({
      password: "",
      email: "",
    });
  };
  const handleSubmit = async (e) => {
    console.log(JSON.stringify(form));
    //when login is happening, we get the data from the server and check to see if the user is in there.
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        if(!res.ok){
          throw new Error('Network response was not ok');
        }
       const data = await res.json();
       setUser(data)
       
    } catch (error) {
      console.error('Error:', error);
    }
      navigate("/");
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
    <h2 className="form-heading">Log in</h2>
    <label htmlFor="email" className="form-label">
      email
    </label>
    <input
      value={form.email}
      onChange={handleChange}
      id="email"
      name="email"
      type="email"
      className="form-input"
      required
    />
    <label htmlFor="password" className="form-label">
      password
    </label>
    <input
      value={form.password}
      onChange={handleChange}
      id="password"
      name="password"
      type="text"
      className="form-input"
      required
    />
    <div className="actions-section">
      <button className="button blue" type="submit">
        Log in
      </button>
      <button className="ClearButton" onClick={clearForm} type="reset">
        Clear data
      </button>
    </div>
  </form>
  );
}
export default Login;
