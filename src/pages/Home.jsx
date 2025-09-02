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
  const [valueRange, setValueRange] = useState([0, 90]);
  const [localRange, setLocalRange] = useState([0, 90]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 6,
  });
  console.log("totalPages =>", data.count);

 // 🔹 Fonction de fetch - se relance à chaque changement de page ou de recherche
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log(`📡 Fetch page ${pagination.currentPage}`);
        
        const response = await axios.get(
          `https://site--backend-vinted--zcmn9mpggpg8.code.run/offers?${buildQuery(formDataSearch)}&page=${pagination.currentPage}&limit=${pagination.itemsPerPage}`
        );
        
        setData(response.data);
        setIsLoading(false);
        
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [formDataSearch, pagination.currentPage, pagination.itemsPerPage]);

  // Reset pagination quand recherche change
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
    }));
  }, [formDataSearch]);


  // Updates des filtres priceMax et priceMin
  useEffect(() => {
    // Débounce de 500ms pour éviter les appels trop fréquents
    const timeoutId = setTimeout(() => {
      const updateFormData = (updates) => {
        setFormDataSearch((prevState) => ({
          ...prevState,
          ...updates,
        }));
      };
      
      const [val1, val2] = localRange;
      const min = Math.min(val1, val2);
      const max = Math.max(val1, val2);

      console.log("🎚️ Mise à jour range:", min, "-", max);
      updateFormData({
        priceMax: max,
        priceMin: min,
      });
      
      setValueRange([min, max]); // Sync avec l'état principal
    }, 500);

    // Nettoyage du timeout si localRange change avant la fin
    return () => clearTimeout(timeoutId);
  }, [localRange, setFormDataSearch]);

  // Pagination : next() et prev()
  const goToNext = () => {
    setPagination((prev) => {
      return { ...prev, currentPage: prev.currentPage + 1 };
    });
  };
  const goToPrev = () => {
    setPagination((prev) => {
      return { ...prev, currentPage: prev.currentPage - 1 };
    });
  };

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <main>
      <div className="filtres">
        <div className="innerContainer">
          <h2>Filtres</h2>
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
                value={localRange}
                min={0}
                max={500}
                onInput={setLocalRange}
              />
            </div>
          </form>
        </div>
      </div>

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
      <div className="pagination innerContainer">
        <button
          className="prev small"
          onClick={goToPrev}
          disabled={pagination.currentPage <= 1}
        >
          prev
        </button>
        <button
          className="next samll"
          onClick={goToNext}
          disabled={pagination.currentPage >= Math.ceil(data.count / pagination.itemsPerPage)}
        >
          next
        </button>
      </div>
    </main>
  );
};
export default Home;
