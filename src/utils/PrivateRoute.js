import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useEffect, useState } from "react";
function PrivateRoute() {
  const navigate = useNavigate();
  const [data, setData] = useState()

  useEffect(() => {
    try {
      const userData = localStorage.getItem("accessToken");
      setData(userData)
      if (!userData) {
        navigate("/login");
      }
    }
    catch (e) {
      console.log(e)
    }
  }, [data, navigate]);

  return <Layout />;
}

export default PrivateRoute;
