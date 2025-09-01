import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddProductForm from "../../components/forms/AddProductForm";
import Cookies from "js-cookie";

const DashBoard = () => {
    const {owner_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const token = Cookies.get("token");

    useEffect( () => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`https://site--backend-vinted--zcmn9mpggpg8.code.run/owner_offers/${owner_id}`);
                setData(response.data)
                setIsLoading(false)
                console.log(response);
                
            } catch (error) {
                console.log(error);
                setError(error.message)
                setIsLoading(false)
            }
        }
        fetchData()
        console.log(data);
    },[owner_id])

  return isLoading ? <div>En cours de chargement...</div> :
  <>
    <div className="error">{error}</div>
    <header>
        <div>DashBoard</div>  
    </header>
    <section id="products">
        <div className="innerContainer flexContainer">
            {data.offers.map((offer, index) => {
            return (
                <article key={index} className="">
                {offer.product_name}
                <figure>
                    <img src={offer.product_images[0].secure_url} alt="" />
                </figure>
                <button className="del">Supprimer</button>
                <button className="up">Modifier</button>
                </article>
            );
            })}
        </div>
    </section>
    <section id="addProducts">
        <AddProductForm token={token} />
    </section>
  </>
}

export default DashBoard;