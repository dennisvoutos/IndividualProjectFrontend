import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const initialState = {
    username:"",
    password:"",
    email:""
}
function Login(props) {
    const {user,setUser} = props;
    const navigate = useNavigate();
    const [form,setForm] = useState(initialState);
    const [users,setUsers] = useState([])
    useEffect(() => {
      fetch("http://localhost:4000/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        });
    }, []);
    const clearForm = (e) =>{
        setForm({
            username:"",
            password:"",
            email:""
        });
    }
    const handleSubmit = async (e) =>{
        //when login is happening, we get the data from the server and check to see if the user is in there.
        e.preventDefault();
        for(let temp in users){
            if(temp.email == form.email && temp.password == form.password){
                setUser(temp);
                navigate("/")
            }
        }
        alert("User credentials are wrong")
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: [e.target.value] });
      };
    return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <label htmlFor="email">email</label>
      <input
        value={form.email}
        onChange={handleChange}
        id="email"
        name="email"
        type="email"
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
          Log in
        </button>
        <button className="ClearButton" onClick={clearForm}>
          Clear data
        </button>
      </div>
    </form>
    )
}
export default Login;