import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
/** range **/
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
/** utils **/
import { buildQuery } from "../utils/SearchOffersUtils";

const Home = ({ setFormDataSearch, formDataSearch }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originAPI, setOriginAPI] = useState(true);
  const [valueRange, setValueRange] = useState([]);

  useEffect(() => {
    // const url = originAPI
    //   ? "https://site--backend-vinted--zcmn9mpggpg8.code.run/offers?sort=price-desc"
    //   : "https://lereacteur-vinted-api.herokuapp.com/offers";

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--zcmn9mpggpg8.code.run/offers?${buildQuery(
            formDataSearch
          )}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [formDataSearch]);

  useEffect(() => {
    const updateFormData = (updates) => {
      setFormDataSearch((prevState) => ({
        ...prevState,
        ...updates,
      }));
    };
    const [val1, val2] = valueRange;
    const min = Math.min(val1, val2);
    const max = Math.max(val1, val2);

    updateFormData({
      priceMax: max,
      priceMin: min,
    });
  }, [valueRange, setFormDataSearch]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <main>
      <button
        className="origin"
        onClick={() => {
          setOriginAPI((prev) => !prev); // !originAPI
          setIsLoading(true);
        }}
      >
        {originAPI ? "NO API" : "API"}
      </button>
      <div className="filtres">
        <div className="innerContainer">
          <h2>FIltres</h2>
          <form className="flexContainer">
            <label htmlFor="marques">
              Marques
              <select name="marques" id="marques">
                <option value="nike">Nike</option>
                <option value="nike">Oakley</option>
                <option value="nike">Zara</option>
              </select>
            </label>
            <label htmlFor="taille">
              Tailles
              <select name="taille" id="taille">
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </select>
            </label>
            <label htmlFor="etat">
              État
              <select name="etat" id="etat">
                <option value="neuf_avec">Neuf avec étiquette</option>
                <option value="neuf_sans">Neuf san étiquette</option>
                <option value="tbe">Très bon état</option>
                <option value="be">Bon état</option>
                <option value="s">Satisfaisant</option>
              </select>
            </label>
            <div className="contRange">
              <RangeSlider
                value={valueRange.length > 0 ? valueRange : [0, 90]}
                min={0}
                max={500}
                onInput={setValueRange}
              />
            </div>
          </form>
        </div>
      </div>
      {originAPI ? (
        <section id="products" className="flexContainer innerContainer">
          {data.offers.map((offer) => {
            return (
              <Link key={offer._id} to={`/offer/${offer._id}`}>
                <article>
                  <figure>
                    <img src={offer.product_images[0].secure_url} alt="" />
                  </figure>
                  <p>{offer.product_price} €</p>

                  <p>État : {offer.product_details[0].ÉTAT}</p>
                  <p>Taille : {offer.product_details[3].TAILLE}</p>
                  <p>Marque : {offer.product_details[2].MARQUE}</p>
                  {/* <p>{offer.product_description}</p> */}
                  {/* {offer.product_details.map((detail, index) => {
                    return (
                      <div key={index}>
                        {Object.entries(detail).map(([key, value]) => {
                          return (
                            <p key={key}>
                              <span className="property">{key} : </span>
                              <span className="value">{value}</span>
                            </p>
                          );
                        })}
                      </div>
                    );
                  })} */}
                </article>
              </Link>
            );
          })}
        </section>
      ) : (
        <section id="products" className="innerContainer flexContainer">
          {data.offers.map((el) => {
            return (
              <Link key={el._id} to={`/offer/${el._id}`}>
                <article>
                  <p className="flexContainer contAvatar">
                    {el.owner.account.avatar && (
                      <img
                        className="avatar"
                        src={el.owner.account.avatar.secure_url}
                        alt=""
                      />
                    )}
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
            );
          })}
        </section>
      )}
    </main>
  );
};
export default Home;
