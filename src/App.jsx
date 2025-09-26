import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Home from "./Home";
import Cadastro from "./Cadastro";
import Verificar from "./Verificar";
import Admin from "./Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/verificar" element={<Verificar />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
