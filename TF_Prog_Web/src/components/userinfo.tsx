import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../app.css";
import "../styles/userinfo.css";
import Cookies from 'js-cookie';
import Loading from "../modules/loading";


const Userinfo = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    function handleLogged(navigator: ReturnType<typeof useNavigate>) {
        navigator('/dashboard');
    }
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        navigate('/login');
    }
    const handleInfo = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
    
        const changeSuccessful = await fakeInfoChangeApi();
        if (changeSuccessful) {
        } else {
          alert('Erro ao alterar as informações ');
        }
        setLoading(false);
      };
    
    
      const fakeInfoChangeApi = (): Promise<boolean> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 1000);
        });
      };
    useEffect(()=>{
        if(Cookies.get('loggedUser') != undefined){ 
            console.log(Cookies.get('loggedUser'));
            handleLogged(navigate);
        }
    }, [navigate])
    
    return( 
        <>
        <Loading message="Logging in..." isLoading={loading} />
        <button id="buttonLogout" onClick={() => handleLogout(navigate)}>Logout</button>
        <body>
            <div class="userModal">
                <form onSubmit={handleInfo}>
                    <h1>Suas informações</h1>
                    <div class="modalDivision">
                        <p>Informações de contato</p>
                        <div class="modalRow">
                            <input type="text" placeholder="Primeiro nome" />
                            <input type="text" placeholder="Sobrenome" />
                        </div>
                        <div class="modalRow">
                            <input type="text" placeholder="Endereço de e-mail" />
                            <input type="number" placeholder="Telefone" />
                        </div>
                        <div class="modalRow">
                            <input type="password" placeholder="Senha" />
                            <input type="password" placeholder="Repetir senha" />
                        </div>
                    </div>
                    <div class="modalDivision">
                    <p>Informações para entrega</p>
                        <div class="modalRow">
                            <input type="text" placeholder="Endereço" />
                        </div>
                        <div class="modalRow">
                            <input type="text" placeholder="Complemento" />
                        </div>
                        <div class="modalRow">
                            <input type="text" placeholder="Cidade" />
                        </div>
                        <div class="modalRow">
                            <input type="text" placeholder="Estado" />
                            <input type="number" placeholder="CEP" />
                        </div>
                    </div>
                    <div class="modalRow">
                        <button type="submit">Salvar</button>
                        <button type="button">Deletar</button>
                    </div>
                </form>
            </div>
         </body>
    </>
    );
  };
  
  export default Userinfo;