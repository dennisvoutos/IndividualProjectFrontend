import { useState } from "react";
import { useNavigate } from "react-router-dom";
const initialState = {
  username: "",
  password: "",
  email: "",
};

function SignUp(props) {
  const { user, setUser } = props;
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const ClearForm = (e) => {
    setForm({
      username: "",
      password: "",
      email: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    await fetch("http://localhost:3030/contacts/")
      .then((res) => res.json())
      .then((data) => setUser(data));
    //i am already doing the update in the update function
    // navigate('/') can do this, gonna troubleshoot
    navigate("/");
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  };
  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create User</h2>
      <label htmlFor="email">email</label>
      <input
        value={form.email}
        onChange={handleChange}
        id="email"
        name="email"
        type="email"
        required
      />
      <label htmlFor="username">username</label>
      <input
        value={form.username}
        onChange={handleChange}
        id="username"
        name="username"
        type="text"
        required
      />
      <label htmlFor="password">password</label>
      <input
        value={form.password}
        onChange={handleChange}
        id="password"
        name="password"
        type="text"
        required
      />
      <div className="actions-section">
        <button className="button blue" type="submit">
          Sign up
        </button>
        <button className="ClearButton" onClick={ClearForm}>
          Clear data
        </button>
      </div>
    </form>
  );
}
export default SignUp;
