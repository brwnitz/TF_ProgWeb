import { useNavigate } from "react-router-dom";
import "../app.css";
import "../styles/home.css";
import { useState } from "preact/hooks";


function handleNavigationLogin(navigator: ReturnType<typeof useNavigate>) {
    navigator('/login');
}

function handleNavigationMain(navigator: ReturnType<typeof useNavigate>) {
    navigator('/');
}

function handleSeeProduct(navigate: ReturnType<typeof useNavigate>) {
    navigate('/viewProducts');
}

function handleSeeCategorie(navigate: ReturnType<typeof useNavigate>) {
    navigate('/viewCategories');
}


const Header = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState<boolean>(false);

    return (
    <>
        <header>
            <div class="contactHeader">
                <span>
                    marmitexplus@gmail.com
                </span>
                <span>
                    (85) 9 9999-9999
                </span>
            </div>
            <div class="navHeader">
                <div class="navFirst">
                    <button type="button" id="btnLateral" style="margin-left:15px;" onClick={()=>{
                        if(menu == false){
                        document.getElementsByClassName("navButtons")[0].setAttribute("style", "left:-150px");
                        setMenu(true);
                        }
                        else{
                        document.getElementsByClassName("navButtons")[0].setAttribute("style", "left:0px");
                        setMenu(false);
                        }
                    }}>Abrir</button>
                    <h1>Marmitex+</h1>
                    <a onClick={()=>{handleNavigationMain}}>Página inicial</a>
                    <a >Kits</a>
                    <a >Menus</a>
                    <a >Ajuda</a>
                </div>
                <div class="navSearch">
                    <input type="text" />
                    <button type="button" id="btnSearch">Buscar</button>
                </div>
                <div class="navThird">
                    <a onClick={()=> handleNavigationLogin(navigate)}>Login</a>
                    <a style="margin-right:15px;">Carrinho</a>
                </div>
            </div>
        </header>
        <div class="navButtons">
            <div id="buttonSeeProduct" onClick={() => handleSeeProduct(navigate)}><i></i><span>Ver produtos</span></div>
            <div id="buttonSeeCateogires" onClick={() => handleSeeCategorie(navigate)}><i></i><span>Ver categorias</span></div>
        </div>
    </>
    )
  };
  
  export default Header;