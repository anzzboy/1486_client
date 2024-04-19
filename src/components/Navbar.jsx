import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="topnav">
        <button onClick={() => routeChange("/admin")}>Admin</button>
        <button onClick={() => routeChange("/")}>Home</button>
      </div>
    </>
  );
}

export default Navbar;
