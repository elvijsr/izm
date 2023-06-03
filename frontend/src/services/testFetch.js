const recordFavorite = async () => {
  try {
    const response = await fetch("http://api.skoluradars.com/test", {
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

export default recordFavorite;
