import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--zcmn9mpggpg8.code.run/offers/${id}`
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
          <article className="">
            {data.product_images.length > 1 ? (
              <>
                <Swiper
                  // install Swiper modules
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
                >
                    {data.product_images.map((img, index) => {
                      return (
                        <SwiperSlide>
                            <img key={img.asset_id + index} src={img.secure_url} alt="" />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </>
            ) : (
              <figure>
                <img src={data.product_images[0].secure_url} alt="" />
              </figure>
            )}

            <div className="content">
              <section>
                <div className="price">
                  {data.product_price.toFixed(2)} €
                </div>
                {data.product_details.map((el, index) => {
                  return (
                    <div key={index}>
                      {Object.entries(el).map(([key, value]) => {
                        return (
                          <p key={key}>
                            <span className="property">{key} : </span>
                            <span className="value">{value}</span>
                          </p>
                        );
                      })}
                    </div>
                  );
                })}                
              </section>
              <section>
                <div className="name">{data.product_name}</div>
                <div className="desc">{data.product_description}</div>
              </section>
              <section>
                <div className="avatarCont flexContainer">
                  { data.owner.account.avatar && <img className="avatar" src={data.owner.account.avatar.secure_url} alt="" /> }       
                  <span>{ data.owner.account.username }</span>
                </div>
              </section>
              <Link to="/payment" className="btn" state={{ title: data.product_name, amount: data.product_price.toFixed(2), description: data.product_description}}>
                ACHETER
              </Link>
            </div>
          </article>
        )}
      </section>
    </main>
  );
};
export default Offer;
