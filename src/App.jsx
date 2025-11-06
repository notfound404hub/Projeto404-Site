import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Cadastro from "./Cadastro";
import Verificar from "./Verificar";
import EsqueciMinhaSenha from "./EsqueciMinhaSenha";
import Admin from "./Admin";
import Forms from "./Forms"
import Dashboard from "./Dashboard";
import CadastroAlunos from "./CadastroAlunos";
import CadastroAlunoMentor from "./CadastroAlunoMentor"
import CadastroColaborador from "../src/components/cadastroUsuario";
import ResetSenha from "./ResetSenha";
import EmailVerificado from "./emailVerificado";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/enviaremail/:token" element={<Verificar />} /> 
        <Route path="/verificar/:tokenVerifyMail" element={<EmailVerificado />} /> 
        <Route path="/esquecer-senha" element={<EsqueciMinhaSenha />} /> 
        <Route path="/reset-senha/:token" element={<ResetSenha />} /> 
        <Route path="/admin" element={<Admin />} />
        <Route path="/forms" element={<Forms />} />     
        <Route path="/dashboard" element={<Dashboard/>} />   
        <Route path="/cadastroalunos" element={<CadastroAlunos/>} />      
        <Route path="/cadastroalunomentor" element={<CadastroAlunoMentor />} />
        <Route path="/CadastroColaborador" element={<CadastroColaborador />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
