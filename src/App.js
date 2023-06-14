
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import NewApp from './newApp';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <NewApp/>
      <Home/>
    </div>
  );
}

export default App;
