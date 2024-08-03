import { useNavigate } from "react-router-dom";
import "../app.css";

function handleNavigation(navigator: ReturnType<typeof useNavigate>) {
    navigator('/login');
}

const Home = () => {
    const navigate = useNavigate();
    return (
    <>
        <h1>Home Page</h1>
        <button onClick={()=> handleNavigation(navigate)}>Go to Login</button>
    </>
    )
  };
  
  export default Home;