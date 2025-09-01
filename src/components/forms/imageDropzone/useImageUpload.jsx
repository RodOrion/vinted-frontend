import { useState, useCallback, useEffect } from 'react';

// Hook personnalisé pour la gestion des images
const useImageUpload = (maxFiles = 4, maxSize = 5 * 1024 * 1024) => {
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const addImages = useCallback((newFiles) => {
    const validFiles = [];
    const newErrors = [];

    newFiles.forEach(file => {
      // Vérification du type
      if (!file.type.startsWith('image/')) {
        newErrors.push(`${file.name} n'est pas une image valide`);
        return;
      }

      // Vérification de la taille
      if (file.size > maxSize) {
        newErrors.push(`${file.name} dépasse la taille maximum (5MB)`);
        return;
      }

      // Vérification du nombre maximum
      if (images.length + validFiles.length >= maxFiles) {
        newErrors.push(`Vous ne pouvez ajouter que ${maxFiles} images maximum`);
        return;
      }

      const imageObject = {
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      };

      validFiles.push(imageObject);
    });

    setImages(prev => [...prev, ...validFiles]);
    setErrors(newErrors);

    // Nettoyage automatique des erreurs après 5 secondes
    if (newErrors.length > 0) {
      setTimeout(() => setErrors([]), 5000);
    }

    return validFiles;
  }, [images.length, maxFiles, maxSize]);

  const removeImage = useCallback((id) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setErrors([]);
  }, [images]);

  // Nettoyage des URLs lors du démontage
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  return {
    images,
    errors,
    addImages,
    removeImage,
    clearAll,
    hasImages: images.length > 0,
    canAddMore: images.length < maxFiles
  };
};
export default useImageUpload