import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        //const result = response.data.offers.find((el) => el._id === id);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  console.log(data);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <main>
      <section id="product" className="innerContainer flexContainer">
        {data && (
          <article className="flexContainer">
            {data.product_pictures.length > 1 ? (
              <Carousel
                showDots={true}
                responsive={responsive}
              >
                {data.product_pictures.map((img, index) => {
                  return (
                    <figure key={img.asset_id+index}>
                      <img src={img.secure_url} alt="" />
                      <p>test</p>
                  </figure>
                  );
                })}
              </Carousel>
            ) : (
              <figure>
                <img src={data.product_pictures[0].secure_url} alt="" />
                <p>test</p>
              </figure>
            )}

            <div className="content">
              <div className="flexContainer">
                <span>Prix :</span>
                <span>{data.product_price.toFixed(2)} €</span>
              </div>
              {data.product_details.map((el, index) => {
                return (
                  <div key={index}>
                    {Object.entries(el).map(([key, value]) => {
                      return (
                        <p key={key}>
                          <span className="property">{key}:</span>
                          <span className="value">{value}</span>
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </article>
        )}
      </section>
    </main>
  );
};
export default Offer;
