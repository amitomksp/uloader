
import './App.css';
import Cart from './Components/Cart';
import Header from './Components/Headers';
import Home from './Components/Home';

function App() {
  return (
   <>
     <div className="app-container">
      <Header />
      <Home />
      < Cart />
    </div>
   </>
  );
}

export default App;
