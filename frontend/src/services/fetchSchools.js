const fetchSchools = async () => {
  try {
    const response = await fetch("https://skoluradarsapi.brocco.eu/schools", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while recording favorite:", error);
  }
};

export default fetchSchools;
