import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../app.css";
import "../styles/viewProduct.css";
import Cookies from 'js-cookie';
import Loading from "../modules/loading";
import User from "../models/user";
import axios from "axios";


const ViewProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    function handleRegisterProduct(navigate: ReturnType<typeof useNavigate>) {
        navigate('/registerProduct');
    }


      const handleDeleteProduct = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const token = Cookies.get('token');
            console.log(token);
            const response = await axios.delete("http://localhost:3001/deleteProduct", { headers: { 'x-access-token': token } });
    
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
            <button id="buttonCadProduct" onClick={() => handleRegisterProduct(navigate)}>Cadastrar produto novo</button>
        </div>
        <body>
            <div class="userModalProduct">
                <div class="divProduct">
                    <img src="" alt="Imagem" />
                    <p class="nameProduct">Título</p>
                    <span class="descImage">Sopa de macaco fresquinha bem boazinha nham nham</span>
                </div>
                <div class="divProduct">
                    <img src="" alt="Imagem" />
                    <p class="nameProduct">Título</p>
                    <span class="descImage">Sopa de macaco fresquinha bem boazinha nham nham</span>
                </div>
                <div class="divProduct">
                    <img src="" alt="Imagem" />
                    <p class="nameProduct">Título</p>
                    <span class="descImage">Sopa de macaco fresquinha bem boazinha nham nham</span>
                </div>
                <div class="divProduct">
                    <img src="" alt="Imagem" />
                    <p class="nameProduct">Título</p>
                    <span class="descImage">Sopa de macaco fresquinha bem boazinha nham nham</span>
                </div>
                <div class="divProduct">
                    <img src="" alt="Imagem" />
                    <p class="nameProduct">Título</p>
                    <span class="descImage">Sopa de macaco fresquinha bem boazinha nham nham</span>
                </div>
                <div class="divProduct">
                    <img src="" alt="Imagem" />
                    <p class="nameProduct">Título</p>
                    <span class="descImage">Sopa de macaco fresquinha bem boazinha nham nham</span>
                </div>
            </div>
        </body>
    </>
    );
  };
  
  export default ViewProduct;