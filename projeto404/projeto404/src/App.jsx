import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Cadastro from "./Cadastro"
import Verificar from "./Verificar"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />  
        <Route path="/verificar" element={<Verificar/>} />     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
