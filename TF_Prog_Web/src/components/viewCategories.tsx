import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../app.css";
import "../styles/viewCategorie.css";
import Cookies from 'js-cookie';
import Loading from "../modules/loading";
import User from "../models/user";
import axios from "axios";


const ViewCategorie = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    function handleRegisterCategorie(navigate: ReturnType<typeof useNavigate>) {
        navigate('/registerCategorie');
    }


      const handleDeleteCategorie = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const token = Cookies.get('token');
            console.log(token);
            const response = await axios.delete("http://localhost:3001/deleteCategorie", { headers: { 'x-access-token': token } });
    
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
            if(userLoad.adm == true){
        } else{
            alert("Você não tem permissão para acessar essa página!");
            handleLogout(navigate);
        }
        }
    }, [navigate])

    return( 
        <>
        <Loading message="Logging in..." isLoading={loading} />
        <div class="navButtons">
            <button id="buttonLogout" onClick={() => handleLogout(navigate)}>Logout</button>
            <button id="buttonCadProduct" onClick={() => handleRegisterCategorie(navigate)}>Cadastrar categoria novo</button>
        </div>
        <body>
            <div class="userModalCategorie">
                <div class="categorieItem">
                    <div class="itemColumn">
                        <p>Cateogira</p>
                        <span>Cateogira bla bla bla bla bla bla bla bla bla bla cateogira waycon é hétero</span>
                    </div>
                    <div class="itemColumn">
                        <p class="tinyP">5</p>
                        <span class="tinySpan">Produtos nessa categoria</span>
                    </div>
                    <div class="itemRow">
                        <button class="buttonEdit" type="button">Editar</button>
                        <button class="buttonDelete" type="button" onClick={handleDeleteCategorie}>Deletar</button>
                    </div>
                </div>
            </div>
        </body>
    </>
    );
  };
  
  export default ViewCategorie;