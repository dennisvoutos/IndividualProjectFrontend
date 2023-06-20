
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import NewApp from './newApp';
import SignUp from './pages/Signup';

function App() {
  return (
    <div className="App">
      {/* <Navbar/>
       */}
       <SignUp/>
      <Home/>
    </div>
  );
}

export default App;
