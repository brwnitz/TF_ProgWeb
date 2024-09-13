import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Loading from "../modules/loading";
import "../styles/register.css"
import User from "../models/user";
import axios from "axios";
import Header from "../modules/header";
import Footer from "../modules/footer";
import Categorie from "../models/categorie";
import Product from "../models/product";

const UpdateProduct = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState<Product>();
    const [categories, setCategories] = useState<Categorie[]>();

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');


    function handleLogout(navigate: ReturnType<typeof useNavigate>) {
        Cookies.remove('loggedUser');
        Cookies.remove('token');
        navigate('/login');
    }

    function handleSucces(navigate: ReturnType<typeof useNavigate>) {
        navigate('/viewProducts');
    }

    const handleLoadProduct = async (id: string) => {
        setLoading(true);

        try{
            const response = await axios.get(`http://localhost:3001/selectProductById?id=${id}`);
            if(response.data.type == "S"){
                setProduct(response.data.data[0]);
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

        const handleUpdateProduct = async (e: Event) => {
            e.preventDefault();
            setLoading(true);
            const target: any = e.target;
            const product:Product = {
                id: parseInt(id!!),
                name: target[0].value,
                description: target[1].value,
                category: target[2].value,
                price: target[3].value,
                stock: target[4].value,
                moreInfors: target[5].value,
                ingredients: "0",
            }
    
            try{
                const response = await axios.put("http://localhost:3001/updateProduct", product, { headers: { 'x-access-token': Cookies.get('token') } });
                if(response.data.type == "S"){
                    alert("Produto cadastrado com sucesso!");
                    handleSucces(navigate);
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

        const handleLoadCategories = async () => {
            setLoading(true);
            try{
                const response = await axios.get("http://localhost:3001/selectCategory");
                if(response.data.type == "S"){
                    setCategories(response.data.data);
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

      useEffect(()=>{
        if(Cookies.get('token') == undefined || Cookies.get('loggedUser') == undefined){ 
            handleLogout(navigate);
        }
        else{
            const userLoad: User = JSON.parse(Cookies.get('loggedUser')!!);
            console.log(userLoad);
            if(userLoad.adm == true){
                console.log("entrou adm");
                handleLoadProduct(id!!);
                handleLoadCategories();
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
                <form onSubmit={handleUpdateProduct}>
                    <h1>Informações gerais</h1>
                    <div class="modalDivision">
                        <div class="modalRow">
                            <input type="text" value={product?.name} required/>
                            <input type="text" value={product?.description} required/>
                        </div>
                        <div class="modalRow">
                            <select name="selectCategorie" id="selectCategorie" value={product?.category}>
                                <option value="placeholder">Selecione uma opção</option>
                                {categories?.map((categorie) => (
                                    <option value={categorie.id}>{categorie.name}</option>
                                ))}
                            </select>
                            <input type="number" value={product?.price} required/>
                        </div>
                        <div class="modalRow">
                            <input type="number" value={product?.stock}/>
                            <input type="text" value={product?.moreInfors}/>
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
         <Footer/>
    </>
  );
};

export default UpdateProduct;