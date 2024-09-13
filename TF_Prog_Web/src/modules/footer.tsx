import { useNavigate } from "react-router-dom";

function handleNavigationLogin(navigator: ReturnType<typeof useNavigate>) {
    navigator('/login');
}

function handleNavigationMain(navigator: ReturnType<typeof useNavigate>) {
    navigator('/');
}

const Footer = () => {
    const navigate = useNavigate();
    return (
        <>
        <div class="footer">
            <div class="mailFooter">
                <h1>MARMITEX+</h1>
                <div class="navSearch">
                    <input type="text" placeholder="Insira seu e-mail"/>
                    <button type="button" id="btnMail">Registrar-se</button>
                </div>
            </div>
            <div class="menusFooter">
                <h2>Menus</h2>
                <a >Escolhas do chef</a>
                <a >Comidas rápidas</a>
                <a >Marmitas saudáveis</a>
                <a >Opções para toda família</a>
            </div>
            <div class="clientFooter">
                <h2>Área do cliente</h2>
                <a >Minha conta</a>
                <a >Minhas compras</a>
                <a >Meus favoritos</a>
                <a >Dúvidas</a>
            </div>
            <div class="pagesFooter">
                <h2>Pages</h2>
                <a >Blog</a>
                <a >Browse the shop</a>
                <a >Category</a>
                <a >Pre-built pages</a>
                <a >Elements</a>
                <a >Woo Commerce</a>
            </div>
        </div>
        </>
    )
}

export default Footer;