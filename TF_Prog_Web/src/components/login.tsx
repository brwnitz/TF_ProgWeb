import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Loading from "../modules/loading";
import "../styles/login.css"

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    function handleLogged(navigator: ReturnType<typeof useNavigate>) {
        navigator('/dashboard');
    }
    function navigateRegister(navigator: ReturnType<typeof useNavigate>) {
        navigator('/register');
    }
    
    const handleLogin = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        const target: any = e.target;
    
        const loginSuccessful = await fakeLoginApi(target[0].value, target[1].value);
        if (loginSuccessful) {
          Cookies.set('loggedUser', 'admin', { expires: 1 });
          handleLogged(navigate);
        } else {
          alert('Login failed');
        }
        setLoading(false);
      };
    
    
      const fakeLoginApi = (username: string, password: string): Promise<boolean> => {
        if (!username || !password) return Promise.resolve(false);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(username === 'admin' && password === 'admin');
          }, 1000);
        });
      };
    useEffect(()=>{
        if(Cookies.get('loggedUser') != undefined){ 
            console.log(Cookies.get('loggedUser'));
            handleLogged(navigate);
        }
    }, [navigate])
  return (
    <>
    <Loading message="Logging in..." isLoading={loading} />
    <body>
        <div class="loginModal">
            <h1>Login</h1>
            <p>Por favor faça login usando os detalhes da conta abaixo</p>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Endereço de e-mail" />
                <input type="password" placeholder="Senha" />
                <button type="submit">Entrar</button>
            </form>
            <p>Não possui uma conta? <a onClick={() => navigateRegister(navigate)}>Cadastre-se</a></p>
        </div>
    </body>
    </>
  );
};

export default Login;