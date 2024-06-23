import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    navigate("/");
  };
  return (
    <div>
      <h1>welcome {sessionStorage.getItem("name")}</h1>
      <div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
}
export default Home;
