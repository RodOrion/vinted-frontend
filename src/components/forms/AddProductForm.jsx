import axios from "axios";
import { useState } from "react";
import "./AddProductForm.css";

const AddProductForm = ({ token }) => {
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
    pictures: "",
  });
  console.log(formData);

  const handleChange = (name, e) => {
    if (name === "pictures") {
      setFormData({
        ...formData,
        [name]: e.target.files[0], // ou e.target.files pour plusieurs fichiers
      });
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataSend = new FormData();
        formDataSend.append("title", formData.title)
        formDataSend.append("description", formData.description)
        formDataSend.append("price", formData.price)
        formDataSend.append("condition", formData.condition)
        formDataSend.append("city", formData.city)
        formDataSend.append("brand", formData.brand)
        formDataSend.append("size", formData.size)
        formDataSend.append("color", formData.color)
        
        // Pour les fichiers, utilisez l'objet File directement
        if (formData.pictures) {
            formDataSend.append("pictures", formData.pictures)
        }

    //   // pour inspecter votre formdata, vous pouvez procéder comme suit :
    //     for (var pair of formDataSend.entries()) {
    //       const key = pair[0];
    //       const value = pair[1];
    //       console.log(key + ", " + value);
    //     }

      const response = axios.post(
        "https://site--backend-vinted--zcmn9mpggpg8.code.run/offer/publish", formDataSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
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
          onChange={(e) => {
            handleChange("description", e);
          }}
          id="description"
          name="description"
          placeholder="Décrivez votre produit en détail..."
        ></textarea>
      </div>

      <div className="form-group">
        <label>Photos (maximum 4)</label>
        <div className="photo-upload" id="photoUpload">
          <div className="upload-icon">📸</div>
          <p>
            <strong>Cliquez ici</strong> ou glissez vos photos
          </p>
          <p>JPG, PNG, WebP - Max 5MB par image</p>
        </div>
        <input
          type="file"
          name="pictures"
          id="photoInput"
          multiple={true}
          accept="image/*"
          onChange={(e) => {
            handleChange("pictures", e);
          }}
        />
        <div className="photo-preview" id="photoPreview"></div>
        <div className="photo-count" id="photoCount"></div>
      </div>
      <p>{error}</p>
      <button className="submit-btn" disabled={isLoading}>
        Ajouter le produit
      </button>
    </form>
  );
};

export default AddProductForm;
