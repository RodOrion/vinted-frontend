import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AddProductForm from "../../components/forms/AddProductForm";
import Cookies from "js-cookie";
import "./dashboard.css"
import AvatarUpload from "../../components/forms/AvatarUpload";
import ModalUpdate from "./ModalUpdate";

const DashBoard = ({user}) => {
    const {owner_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [refresh, setRefresh] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [offerID, setOfferID] = useState(null)
    const token = Cookies.get("token");
    const userID = Cookies.get('userID')

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
    },[owner_id, data, refresh, token])

    // // check les infos du form ds formData
    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

    const handClickDelete = async (offer_id, e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.delete(`https://site--backend-vinted--zcmn9mpggpg8.code.run/offer/delete/${offer_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            console.log("response del =>"+response.data);
            setIsLoading(false);          
        } catch (error) {
            console.log("error =>"+error.message);
            setIsLoading(false);
        }
        
    }

    const handClickUpdate = async(offer_id, e) => {
        e.preventDefault();
        setModalVisible(prev => !prev)
        setOfferID(offer_id)
    }

  return isLoading ? <div>En cours de chargement...</div> :
  <>
    {error && <div className="error">{error}</div>}
    {!token ? <Navigate to="/" /> : 
    <div>
    { modalVisible &&
        <ModalUpdate offerID={offerID} setModalVisible={setModalVisible} modalVisible={modalVisible} />
    }
    <main>
        <div className="innerContainer flexContainer dasheader">
            <div className="headings">
                {user.username && <p>Bonjour {user.username}</p>}
                <h1>Welcome in your DashBoard</h1>  
            </div>
            { modalVisible &&
                <AvatarUpload userID={userID} token={token} />
            }

        </div>
        { data.offers.length > 0 && 
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

                                <button className="up" onClick={ (e) => {
                                    handClickUpdate(offer._id, e)
                                }}>Modifier</button>

                                <button className="del" onClick={ (e) => {
                                    handClickDelete(offer._id, e)
                                }}>Supprimer</button>
                            </div>
                        </div>
                        </article>
                    );
                    })}
                </div>
            </section>
        }
        <section id="addProducts">
            <div className="innerContainer flexContainer">
                <h2>Ajouter une offre</h2>
                <AddProductForm token={token} setRefresh={setRefresh} />
            </div>
        </section>
    </main>
    </div>
    }
  </>
}

export default DashBoard;