import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import ImageDropzone from "./imageDropzone/ImageDropzone";
import Cookies from "js-cookie";
import "./AddProductForm.css";

const UpdateProductForm = ({ setRefresh, offerID }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    city: "",
    brand: "",
    size: "",
    color: "",
    pictures: [],
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const token = Cookies.get("token");

  useEffect( () => {
    const fetchData = async() => {
        try {
            setIsLoading(true)
            const response = await axios.get(
            `https://site--backend-vinted--zcmn9mpggpg8.code.run/offers/${offerID}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              },
            }
          );
          console.log(response.data);
          setFormData( prev => {
            return {...prev,
                title : response.data.product_name
            }
          })
        } catch (error) {
            console.log(error.message);
        }
    }
    fetchData()
  },[offerID, token])

  // check les img uploadées
  const handleImagesChange = useCallback((images) => {
    setUploadedImages(images);
    setFormData((prev) => ({
      ...prev,
      pictures: images,
    }));
  }, []);

  // check les infos du form ds formData
  useEffect(() => {
    console.log(formData);
    console.log("Images uploadées:", uploadedImages);
  }, [formData, uploadedImages]);

  const handleChange = (name, e) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataSend = new FormData();
      formDataSend.append("title", formData.title);
      formDataSend.append("description", formData.description);
      formDataSend.append("price", formData.price);
      formDataSend.append("condition", formData.condition);
      formDataSend.append("city", formData.city);
      formDataSend.append("brand", formData.brand);
      formDataSend.append("size", formData.size);
      formDataSend.append("color", formData.color);

      if (formData.pictures && formData.pictures.length > 0) {
        formData.pictures.forEach((file) => {
          formDataSend.append("pictures", file); // Ajouter chaque File object
        });
      }

      //   // pour inspecter votre formdata, vous pouvez procéder comme suit :
      //     for (var pair of formDataSend.entries()) {
      //       const key = pair[0];
      //       const value = pair[1];
      //       console.log(key + ", " + value);
      //     }

      const response = await axios.post(
        "https://site--backend-vinted--zcmn9mpggpg8.code.run/offer/publish",
        formDataSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response : " + response);
      // Réinitialiser le formulaire après succès
      setFormData({
        title: "",
        description: "",
        price: "",
        condition: "",
        city: "",
        brand: "",
        size: "",
        color: "",
        pictures: "",
      });
      setUploadedImages([])
      // Déclencher le refresh du parent
      setRefresh((prev) => !prev); // Mieux que setRefresh(true)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <form id="productForm" onSubmit={HandleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Titre du produit</label>
        <input
          value={formData.title}
          onChange={(e) => {
            handleChange("title", e);
          }}
          type="text"
          id="title"
          name="title"
          placeholder="Ex: Nike AIR Max"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Prix</label>
        <div className="price-input">
          <input
            value={formData.price}
            onChange={(e) => {
              handleChange("price", e);
            }}
            type="text"
            id="price"
            name="price"
            placeholder="145.00"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="condition">État</label>
        <select
          value={formData.condition}
          onChange={(e) => {
            handleChange("condition", e);
          }}
          id="condition"
          name="condition"
          required
        >
          <option value="">Sélectionnez l'état</option>
          <option value="Neuf">Neuf</option>
          <option value="Comme neuf">Comme neuf</option>
          <option value="Très bon état">Très bon état</option>
          <option value="Bon état">Bon état</option>
          <option value="État correct">État correct</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="city">Emplacement</label>
        <input
          value={formData.city}
          onChange={(e) => {
            handleChange("city", e);
          }}
          type="text"
          id="city"
          name="city"
          placeholder="Ex: Paris"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="brand">Marque</label>
        <input
          value={formData.brand}
          onChange={(e) => {
            handleChange("brand", e);
          }}
          type="text"
          id="brand"
          name="brand"
          placeholder="Ex: Nike"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="size">Taille</label>
        <input
          value={formData.size}
          onChange={(e) => {
            handleChange("size", e);
          }}
          type="text"
          id="size"
          name="size"
          placeholder="Ex: 43"
        />
      </div>

      <div className="form-group">
        <label htmlFor="color">Couleur</label>
        <input
          value={formData.color}
          onChange={(e) => {
            handleChange("color", e);
          }}
          type="text"
          id="color"
          name="color"
          placeholder="Ex: Camel case"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => {
            handleChange("description", e);
          }}
          id="description"
          name="description"
          placeholder="Décrivez votre produit en détail..."
        ></textarea>
      </div>

      <ImageDropzone
        onImagesChange={handleImagesChange}
        maxFiles={4}
        maxSize={5 * 1024 * 1024}
      />

      {uploadedImages.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f3f4f6",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ margin: "0 0 1rem 0", color: "#374151" }}>
            Fichiers sélectionnés:
          </h3>
          <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
            {uploadedImages.map((file, index) => (
              <li
                key={index}
                style={{ marginBottom: "0.5rem", color: "#6b7280" }}
              >
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p>{error}</p>}
      <button className="submit-btn" disabled={isLoading}>
        Ajouter le produit
      </button>
    </form>
  );
};

export default UpdateProductForm;
