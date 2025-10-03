import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Cadastro from "./Cadastro";
import Verificar from "./Verificar";
import Admin from "./Admin";
import Cadastro from "./Cadastro"
import Verificar from "./Verificar"
import Admin from "./Admin"
import Forms from "./Forms"
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/verificar" element={<Verificar />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/cadastro" element={<Cadastro />} />  
        <Route path="/verificar" element={<Verificar/>} />     
        <Route path="/admin" element={<Admin/>} />     
        <Route path="/Dashboard" element={<Dashboard/>} />     

      </Routes>
    </BrowserRouter>
  );
}

export default App;
