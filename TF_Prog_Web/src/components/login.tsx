import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Loading from "../modules/loading";
import "../styles/login.css"
import axios from "axios";
import Header from "../modules/header";
import Footer from "../modules/footer";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    function handleLogged(navigator: ReturnType<typeof useNavigate>, userAdm?: string) {
      if(userAdm == "1"){
        navigator(`/admin`);
      }
      else{
        navigator(`/userInfo`);
      }
    }
    function navigateRegister(navigator: ReturnType<typeof useNavigate>) {
        navigator('/register');
    }
    
    const handleLogin = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        const target: any = e.target;

        const email = target[0].value;
        const password = target[1].value;
        try{
          const response = await axios.post('http://localhost:3001/login', {email, password});
          if(response.data.type == "S"){
            const {token, data} = response.data;
            const expirationDate = new Date(new Date().getTime() + 30 * 60 * 1000);
            Cookies.set('loggedUser', JSON.stringify(data[0]), {expires: expirationDate});
            Cookies.set('token', token, {expires: expirationDate});
            handleLogged(navigate, data[0].adm ? "1" : "0");
          }else{
            alert("Error: " + response.data.message);
          }
        } catch (error){
          alert("Error: " + error);
          console.error(error);
        } finally{
          setLoading(false);
        }
      };
    
    useEffect(()=>{
        if(Cookies.get('loggedUser') != undefined){ 
            console.log(Cookies.get('loggedUser'));
            handleLogged(navigate);
        }
    }, [navigate])
  return (
    <>
    <Header />
    <Loading message="Logging in..." isLoading={loading} />
    <body>
        <div class="loginModal">
            <h1>Login</h1>
            <p>Por favor faça login usando os detalhes da conta abaixo</p>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Endereço de e-mail" />
                <input type="password" placeholder="Senha" />
                <button type="submit">Entrar</button>
            </form>
            <p>Não possui uma conta? <a onClick={() => navigateRegister(navigate)}>Cadastre-se</a></p>
        </div>
    </body>
    <Footer/>
    </>
  );
};

export default Login;