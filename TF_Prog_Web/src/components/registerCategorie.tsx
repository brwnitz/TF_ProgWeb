import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Loading from "../modules/loading";
import "../styles/register.css"
import User from "../models/user";
import axios from "axios";
import Header from "../modules/header";
import Footer from "../modules/footer";
import Categorie from "../models/categorie";

const RegisterCategorie = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    function handleAdmin(navigate: ReturnType<typeof useNavigate>) {
        navigate('/viewCategories');
    }

      const handleRegisterCategorie = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        const target: any = e.target;
    
        const categorie: Categorie = {
            name: target[0].value,
            description: target[1].value,
            icon: "123icone"
        }

        try{
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/registerCategory', categorie, {headers:{'x-access-token': token}});
            if(response.data.type == "S"){
                handleAdmin(navigate);
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
        if(Cookies.get('token') == undefined || Cookies.get('loggedUser') == undefined){ 
            handleLogout(navigate);
        }
        else{
            const userLoad: User = JSON.parse(Cookies.get('loggedUser')!!);
            console.log(userLoad);
            if(userLoad.adm == true){
            if(userLoad.adress != undefined && userLoad.adress != ""){
            }
            } else{
                alert("Você não tem permissão para acessar essa página!");
                handleLogout(navigate);
            }
        }
    }, [navigate])
  return (
    <>
    <Header />
        <Loading message="Carregando..." isLoading={loading} />
        <button id="buttonLogout" onClick={() => handleLogout(navigate)}>Logout</button>
        <body>
            <div class="userModal">
                <form onSubmit={handleRegisterCategorie}>
                    <h1>Informações gerais</h1>
                    <div class="modalDivision">
                        <div class="modalRow">
                            <input type="text" placeholder="Nome da categoria" required/>
                            <input type="text" placeholder="Descrição da categoria" required/>
                        </div>
                    </div>
                    <div class="modalRow">
                        <button type="submit">Salvar informações</button>
                    </div>
                </form>
            </div>
         </body>
         <Footer/>
    </>
  );
};

export default RegisterCategorie;