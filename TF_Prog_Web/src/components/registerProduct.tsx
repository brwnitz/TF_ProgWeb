import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Loading from "../modules/loading";
import "../styles/register.css"
import User from "../models/user";
import axios from "axios";

const RegisterProduct = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    const handleRegisterProduct = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        const target: any = e.target;
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
        <Loading message="Carregando..." isLoading={loading} />
        <button id="buttonLogout" onClick={() => handleLogout(navigate)}>Logout</button>
        <body>
            <div class="userModal">
                <form onSubmit={handleRegisterProduct}>
                    <h1>Informações gerais</h1>
                    <div class="modalDivision">
                        <div class="modalRow">
                            <input type="text" placeholder="Nome do produto" required/>
                            <input type="text" placeholder="Descrição do produto" required/>
                        </div>
                        <div class="modalRow">
                            <input type="email" placeholder="Categoria do produto" required/>
                            <input type="number" placeholder="Valor (R$)" required/>
                        </div>
                        <div class="modalRow">
                            <input type="number" placeholder="Quantidade em estoque"/>
                            <input type="text" placeholder="Mais informações"/>
                        </div>
                    </div>
                    <div class="modalImage">
                    <p>Informações para entrega</p>
                        <div class="modalRow imageRow">
                            <img src="" alt="Imagem" />
                            <button type="button" id="addImage"><p>+</p>Adicionar imagem</button>
                        </div>
                    </div>
                    <div class="modalRow">
                        <button type="submit">Salvar informações</button>
                    </div>
                </form>
            </div>
         </body>
    </>
  );
};

export default RegisterProduct;