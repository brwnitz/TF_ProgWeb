import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../app.css";
import "../styles/userinfo.css";
import Cookies from 'js-cookie';
import Loading from "../modules/loading";
import User from "../models/user";


const Userinfo = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>();
    const [address, setAddress] = useState<string>();
    const [comp, setComp] = useState<string>();
    const [city, setCity] = useState<string>();
    const [state, setState] = useState<string>();
    const [cep, setCep] = useState<string>();
    function handleLogged(navigator: ReturnType<typeof useNavigate>) {
        navigator('/dashboard');
    }
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        navigate('/login');
    }

    function deconstructAddress(address: string): Array<String>{
        const addressArray = address.split(";");
        setAddress(addressArray[0]);
        setComp(addressArray[1]);
        setCity(addressArray[2]);
        setState(addressArray[3]);
        setCep(addressArray[4]);
        return addressArray;
    }

    const handleInfo = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        const target: any = e.target;
        const concatenateAddress = target[6].value + ';' + target[7].value + ';' + target[8].value + ';' + target[9].value + ';' + target[10].value;

        const user: User = {
            username: target[0].value,
            surname: target[1].value,
            email: target[2].value,
            tell: target[3].value,
            password: target[4].value,
            address: concatenateAddress,
        }
    
        const changeSuccessful = await fakeInfoChangeApi(user);
        if (changeSuccessful) {
            alert('Informações alteradas com sucesso');
        } else {
            alert('Erro ao alterar as informações ');
        }
        setLoading(false);
      };
    
    
      const fakeInfoChangeApi = (user: User): Promise<boolean> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if(user.username == "adm"){
                resolve(true);
            }
            resolve(false);
          }, 1000);
        });
      };
    useEffect(()=>{
        if(Cookies.get('loggedUser') != undefined){ 
            console.log(Cookies.get('loggedUser'));
            handleLogged(navigate);
        }
        const searchParams = new URLSearchParams(window.location.search);
        const userId = searchParams.get('user');
        if(userId == '1'){
            setUser({
                username: 'admin',
                password: 'admin',
                email: "admin@admin.com"
            })
        }
        deconstructAddress(user?.address!!);
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
                            <input type="text" placeholder="Primeiro nome" value={user?.username} required/>
                            <input type="text" placeholder="Sobrenome" value={user?.surname} required/>
                        </div>
                        <div class="modalRow">
                            <input type="email" placeholder="Endereço de e-mail" value={user?.email} required/>
                            <input type="number" placeholder="Telefone" value={user?.tell} required/>
                        </div>
                        <div class="modalRow">
                            <input type="password" placeholder="Senha"/>
                            <input type="password" placeholder="Repetir senha"/>
                        </div>
                    </div>
                    <div class="modalDivision">
                    <p>Informações para entrega</p>
                        <div class="modalRow">
                            <input type="text" placeholder="Endereço" value={address} required/>
                        </div>
                        <div class="modalRow">
                            <input type="text" placeholder="Complemento" value={comp} required/>
                        </div>
                        <div class="modalRow">
                            <input type="text" placeholder="Cidade" value={city} required/>
                        </div>
                        <div class="modalRow">
                            <input type="text" placeholder="Estado" value={state} required/>
                            <input type="number" placeholder="CEP" value={cep} required/>
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