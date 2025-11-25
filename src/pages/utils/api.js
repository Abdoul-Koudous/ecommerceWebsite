const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // On retourne toujours le JSON, même si response.ok est false
    return data;
  } catch (error) {
    console.error(error);
    // On retourne une structure d’erreur pour que le composant puisse afficher le toast
    return { error: true, message: "Erreur serveur" };
  }
};


export const fetchDataFromApi = async (url)=>{
  try {
    const {data} = await axios.get(apiUrl + url, {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      })
    return data;
  } catch (error) {
    console.log(error);
    return error;
    
  }
}