import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Loading from "../modules/loading";
import "../styles/register.css"

// interface UserProps{
//     username: string;
//     password: string;
//     email: string;
// }

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    function handleRegistered(navigator: ReturnType<typeof useNavigate>) {
        navigator('/login');
    }

    const handleRegister = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        // const target: any = e.target;
    
        // const user: UserProps = {
        //     username: target[0].value,
        //     password: target[1].value,
        //     email: target[2].value
        // }
        const registerSuccessful = await fakeRegisterApi();
        if (registerSuccessful) {
          handleRegistered(navigate);
        } else {
          alert('Login failed');
        }
        setLoading(false);
      };
    
    
      const fakeRegisterApi = (): Promise<boolean> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true)
          }, 1000);
        });
      };
    useEffect(()=>{
        if(Cookies.get('loggedUser') != undefined){ 
            console.log(Cookies.get('loggedUser'));
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
                <input type="text" placeholder="Endereço de e-mail" />
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