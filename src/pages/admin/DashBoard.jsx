import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AddProductForm from "../../components/forms/AddProductForm";
import Cookies from "js-cookie";
import "./dashboard.css"

const DashBoard = ({user}) => {
    const {owner_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [refresh, setRefresh] = useState(false)
    const token = Cookies.get("token");

    useEffect( () => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`https://site--backend-vinted--zcmn9mpggpg8.code.run/owner_offers/${owner_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                });
                setData(response.data)
                setIsLoading(false)
                setRefresh(false)
            } catch (error) {
                console.log(error);
                setError(error.message)
                setIsLoading(false)
            }
        }
        fetchData()
        //console.log(data);
    },[owner_id, data, refresh, token])

    // // check les infos du form ds formData
    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

  return isLoading ? <div>En cours de chargement...</div> :
  <>
    {error && <div className="error">{error}</div>}
    {!token ? <Navigate to="/" /> : 
    <main>
        <div className="innerContainer headings">
            {user.username && <p>Bonjour {user.username}</p>}
            <h1>Welcome in your DashBoard</h1>  
        </div>
        <section id="products">
            <div className="innerContainer flexContainer">
                <h2>Vos offres</h2>
                {data.offers.map((offer, index) => {
                return (
                    <article key={index} className="offer">
                    
                    <figure>
                        <img src={offer.product_images[0].secure_url} alt="" />
                    </figure>
                    <div className="content">
                        <p>{offer.product_name}</p>
                        <div className="flexContainer">
                            <button className="up">Modifier</button>
                            <button className="del">Supprimer</button>
                        </div>
                    </div>
                    </article>
                );
                })}
            </div>
        </section>
        <section id="addProducts">
            <div className="innerContainer flexContainer">
                <h2>Ajouter une offre</h2>
                <AddProductForm token={token} setRefresh={setRefresh} />
            </div>
        </section>
    </main>
    }
  </>
}

export default DashBoard;