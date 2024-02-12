import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import Component from "./component";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/component" element={<Component/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
      
  );
}

export default App;