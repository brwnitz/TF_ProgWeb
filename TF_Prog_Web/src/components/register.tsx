import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Loading from "../modules/loading";
import "../styles/register.css"
import User from "../models/user";
import axios from "axios";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    function handleRegistered(navigator: ReturnType<typeof useNavigate>) {
        navigator('/login');
    }

    const handleRegister = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        const target: any = e.target;
    
        const user: User = {
            name: target[0].value,
            password: target[2].value,
            email: target[1].value,
            adm: false
        }

        try{
            const response = await axios.post('http://localhost:3001/registerUser', user);
            if(response.data.type == "S"){
                alert("Usuário cadastrado com sucesso!");
                handleRegistered(navigate);
            }else{
                alert("Error: " + response.data.message);
            }
        } catch (error){
            alert("Error: " + error);
            console.error(error);
        }
        finally{
            setLoading(false);
        }
      };
    useEffect(()=>{
        if(Cookies.get('loggedUser') != undefined){ 
            handleRegistered(navigate);
        }
    }, [navigate])
  return (
    <>
    <Loading message="Criando conta" isLoading={loading} />
    <body>
        <div class="registerModal">
            <h1>Cadastre-se</h1>
            <p>Por favor, preencha os dados abaixo para efetuar cadastro.</p>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Usuário" />
                <input type="email" placeholder="Endereço de e-mail" />
                <input type="password" placeholder="Senha" />
                <input type="password" placeholder="Confirmar senha" />
                <div class="checkboxForm">
                    <input type="checkbox" id="terms" name="terms" value="terms"/>
                    <label for="terms">Eu aceito os termos e condições</label>
                </div>
                <button type="submit">Entrar</button>
            </form>
            <p>Já possui uma conta? <a onClick={() => handleRegistered(navigate)}>Faça login</a></p>
        </div>
    </body>
    </>
  );
};

export default Register;