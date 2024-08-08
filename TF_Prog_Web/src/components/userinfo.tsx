import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../app.css";
import "../styles/userinfo.css";
import Cookies from 'js-cookie';
import Loading from "../modules/loading";
import User from "../models/user";
import axios from "axios";


const Userinfo = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>();
    const [address, setAddress] = useState<string>();
    const [comp, setComp] = useState<string>();
    const [city, setCity] = useState<string>();
    const [state, setState] = useState<string>();
    const [cep, setCep] = useState<string>();
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
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
            name: target[0].value,
            surname: target[1].value,
            email: target[2].value,
            tell: target[3].value,
            password: target[4].value,
            adress: concatenateAddress,
            adm: false
        }

        try{
            const token = Cookies.get('token');
            const response = await axios.put("http://localhost:3001/updateUser", user, {headers:{'x-access-token': token}});

            if(response.data.type == "S"){
                alert("Usuário atualizado com sucesso!");
            }
            else{
                alert("Error: " + response.data.message);
            }
        }
        catch(error){
            alert("Error: " + error);
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    
      };


      const handleDelete = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const token = Cookies.get('token');
            console.log(token);
            const response = await axios.delete("http://localhost:3001/deleteUser", { headers: { 'x-access-token': token } });
    
            if (response.data.type == "S") {
                alert("Usuário deletado com sucesso!");
                handleLogout(navigate);
            } else {
                alert("Error: " + response.data.message);
            }
        } catch (error) {
            alert("Error: " + error);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(()=>{
        if(Cookies.get('token') == undefined || Cookies.get('loggedUser') == undefined){ 
            handleLogout(navigate);
        }
        else{
            const userLoad: User = JSON.parse(Cookies.get('loggedUser')!!);
            console.log(userLoad);
            setUser(userLoad);
            if(userLoad.adress != undefined && userLoad.adress != ""){
                deconstructAddress(userLoad.adress);
            }
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
                            <input type="text" placeholder="Primeiro nome" value={user?.name} required/>
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
                        <button type="button" onClick={handleDelete}>Deletar</button>
                    </div>
                </form>
            </div>
         </body>
    </>
    );
  };
  
  export default Userinfo;