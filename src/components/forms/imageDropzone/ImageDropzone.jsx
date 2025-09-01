import { useCallback, useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import useImageUpload from "./useImageUpload";
import "./imageDropzone.css"

// Composant principal
const ImageDropzone = ({ onImagesChange, maxFiles = 4, maxSize = 5 * 1024 * 1024 }) => {
  const { images, errors, addImages, removeImage, clearAll, hasImages, canAddMore } = useImageUpload(maxFiles, maxSize);

  // Notifier le parent des changements
  useEffect(() => {
    if (onImagesChange) {
      onImagesChange(images.map(img => img.file));
    }
  }, [images, onImagesChange]);

  const onDrop = useCallback((acceptedFiles) => {
    addImages(acceptedFiles);
  }, [addImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize,
    disabled: !canAddMore
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="image-dropzone">

      <div className="form-group">
        <label>Photos (maximum {maxFiles})</label>
        
        <div 
          className={`photo-upload ${isDragActive ? 'drag-active' : ''} ${!canAddMore ? 'disabled' : ''}`}
          {...getRootProps()}
        >
          <div className="upload-icon">📸</div>
          <p>
            <strong>
              {canAddMore ? 'Cliquez ici' : `Maximum ${maxFiles} images atteint`}
            </strong>
            {canAddMore && ' ou glissez vos photos'}
          </p>
          {canAddMore && <p>JPG, PNG, WebP - Max 5MB par image</p>}
        </div>

        <input
          {...getInputProps()}
          className="upload-input"
        />

        {/* Affichage des erreurs */}
        {errors.length > 0 && (
          <div className="errors">
            {errors.map((error, index) => (
              <div key={index} className="error-item">
                ⚠️ {error}
              </div>
            ))}
          </div>
        )}

        {/* Preview des images */}
        {hasImages && (
          <>
            <div className="photo-preview">
              {images.map((image) => (
                <div key={image.id} className="image-item">
                  <button
                    className="remove-btn"
                    onClick={() => removeImage(image.id)}
                    title="Supprimer cette image"
                  >
                    ×
                  </button>
                  <img
                    src={image.preview}
                    alt={image.name}
                    className="image-preview"
                  />
                  <div className="image-info">
                    <div className="image-name">{image.name}</div>
                    <div className="image-size">{formatFileSize(image.size)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="photo-count">
              <span>{images.length} / {maxFiles} images</span>
              {hasImages && (
                <button 
                  className="clear-all-btn"
                  onClick={clearAll}
                >
                  Tout supprimer
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ImageDropzone