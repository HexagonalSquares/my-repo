document.querySelector("#recipeForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const recipeUrl = document.querySelector("#recipeUrl").value;
  const responseOutput = document.querySelector("#responseOutput");

  try {
    const response = await fetch("/.netlify/functions/handle-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: recipeUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    responseOutput.textContent = `Success! Processed URL: ${data.message}`;
  } catch (error) {
    console.error("Error:", error);
    responseOutput.textContent =
      "An error occurred while processing the recipe. Please try again.";
  }
});
