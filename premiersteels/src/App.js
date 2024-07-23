import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import CategoryTable from './Components/Admin/CategoryTable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './Components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/admin' element={<CategoryTable />} />
        </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
