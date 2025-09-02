import { useState } from "react";
import avatarDefault from "../../assets/avatar.webp"
import "./avatar_upload.css"

const AvatarUpload = ({ token }) => {
  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleAvatarClick = () => {
    // Créer un input file invisible et le déclencher
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        await uploadAvatar(file);
      }
    };
    // Déclencher le sélecteur de fichier
    input.click();
  };

  const uploadAvatar = async (file) => {
    setUploading(true);
    
    try {
      // Créer FormData pour l'upload
      const formData = new FormData();
      formData.append('avatar', file);
      
      // Envoyer vers ton API
      const response = await fetch(
        'https://site--backend-vinted--zcmn9mpggpg8.code.run/user/update',
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        }
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload');
      }
      
      const data = await response.json();
      
      // Mettre à jour les données utilisateur
      setAvatar(data.user.account.avatar);
      console.log('Avatar mis à jour!');
      
    } catch (error) {
      console.error('Erreur upload avatar:', error.message);
      alert('Erreur lors de l\'upload de l\'avatar');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="avatar-container">
      {/* Image cliquable */}
      <img
        src={avatar?.secure_url || avatarDefault}
        alt="Avatar"
        onClick={handleAvatarClick}
      />
      
      {/* Overlay de chargement */}
      {uploading && (
        <div className="overlayAvatar"
        >
          ⏳
        </div>
      )}
      
      {/* Texte indicatif */}
      <p>
        Cliquer pour changer
      </p>
    </div>
  );
};
export default AvatarUpload