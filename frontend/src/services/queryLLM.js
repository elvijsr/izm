const queryLLM = async (question) => {
  try {
    const response = await fetch("https://skoluradarsmodel.brocco.eu/ask", {
      method: "POST",
      timeout: 300000,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: question }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error("Error while recording favorite:", error);
  }
};

export default queryLLM;
