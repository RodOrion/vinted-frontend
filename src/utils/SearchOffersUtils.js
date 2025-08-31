/** OFFERS ***/
// /**
//  * Crée une fonction de mise à jour pour les données de recherche
//  * @param {Function} setFormDataSearch - Fonction setState pour les données de recherche
//  * @returns {Function} Fonction de mise à jour
//  */
// export const updateSearchFormData = (setFormDataSearch) => {
//     return (updates) => {
//         setFormDataSearch((prevState) => ({
//             ...prevState,
//             ...updates,
//         }));
//     }
// };

// /**
//  * Gestionnaire de changement pour le champs de recherche
//  * @param {Function} updateFormData - Fonction de mise à jour
//  * @param {Event} e - Événement de changement
//  */
// export const handleChangeSearch = (updateFormData, e) => {
//     const { name, value } = e.target;
//     updateFormData( {[name]: value});
// };

// /**
//  * Gestionnaire de changement pour le range slider
//  * @param {Function} updateFormData - Fonction de mise à jour
//  * @param {Array} valueRange - [min, max] du range
//  */
// export const handleRangeChange = (updateFormData, valueRange) => {
//   const [val1, val2] = valueRange;
//   const min = Math.min(val1, val2);
//   const max = Math.max(val1, val2);

//   updateFormData({
//     priceMin: min,
//     priceMax: max,
//   });
// };

/**
 * Construit la query string à partir des données de recherche
 * @param {Object} formDataSearch - Données de recherche
 * @returns {string} Query string
 */
export const buildQuery = (formDataSearch) => {
    return Object.entries(formDataSearch).map(([key, value]) => {
        return value && `${key}=${value}`;
    })
    .filter(Boolean)
    .join("&");
};