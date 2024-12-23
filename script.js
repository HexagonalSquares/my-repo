document.getElementById('recipeForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission

  const recipeUrl = document.getElementById('recipeUrl').value;
  const responseOutput = document.getElementById('responseOutput');

  try {
    const response = await fetch('/.netlify/functions/handle-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: recipeUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    responseOutput.innerHTML = `<p>Processed Link: <a href="${data.processedUrl}" target="_blank">${data.processedUrl}</a></p>`;
  } catch (error) {
    console.error('Error:', error);
    responseOutput.innerHTML = `<p style="color: red;">An error occurred: ${error.message}</p>`;
  }
});
