import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Loading from "../modules/loading";
import "../styles/register.css"
import User from "../models/user";
import axios from "axios";
import Header from "../modules/header";
import Footer from "../modules/footer";
import Categorie from "../models/categorie";

const UpdateCategory = () => {
    const [loading, setLoading] = useState(false);
    const [categorie, setCategories] = useState<Categorie>();
    const navigate = useNavigate();
    const location = useLocation();


    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    function handleAdmin(navigate: ReturnType<typeof useNavigate>) {
        navigate('/viewCategories');
    }

    const handleLoadCategories = async () => {
        setLoading(true);
        try{
            const response = await axios.get(`http://localhost:3001/selectCategoryById?id=${id}`);
            console.log(response.data);
            if(response.data.type == "S"){
                setCategories(response.data.data[0]);
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
    }

      const handleUpdateCategorie = async (e: Event) => {
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
            const response = await axios.put(`http://localhost:3001/updateCategory`, categorie, {headers:{'x-access-token': token}});
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
            handleLoadCategories();
        }
    }, [navigate])
  return (
    <>
    <Header />
        <Loading message="Carregando..." isLoading={loading} />
        <button id="buttonLogout" onClick={() => handleLogout(navigate)}>Logout</button>
        <body>
            <div class="userModal">
                <form onSubmit={handleUpdateCategorie}>
                    <h1>Informações gerais</h1>
                    <div class="modalDivision">
                        <div class="modalRow">
                            <input type="text" value={categorie?.name} required/>
                            <input type="text" value={categorie?.description} required/>
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

export default UpdateCategory;