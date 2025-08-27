import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return isLoading ? <span>En cours de chargement... </span> : 
  <main>
    <section id="products" className="innerContainer flexContainer">
        {
            data.offers.map( (el) => {
                return (
                    <Link to={`/offer/${el._id}`}>
                        <article>
                            <p className="flexContainer contAvatar">
                                { el.owner.account.avatar &&
                                    <img className="avatar" src={el.owner.account.avatar.secure_url} alt="" /> 
                                }
                                <span>{el.owner.account.username}</span>
                            </p>
                            <figure>
                                <img src={el.product_image.secure_url} alt="" />
                            </figure>
                            <p>{el.product_price} €</p>
                            <p>{el.product_details[1].TAILLE}</p>
                            <p>{el.product_details[0].MARQUE}</p>
                            
                        </article>
                    </Link>
                )
            })
        }
    </section>
  </main>;
};
export default Home;
