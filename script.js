document.getElementById('recipe-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const recipeUrl = document.getElementById('recipe-url').value; // Get user input
    const responseElement = document.getElementById('response'); // Placeholder for response

    try {
        // Update with your Netlify function URL
        const response = await fetch('https://kroger-cart-creator.netlify.app/.netlify/functions/handle-recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: recipeUrl }),
        });

        const result = await response.json();
        responseElement.textContent = `Response: ${result.message}`;
    } catch (error) {
        responseElement.textContent = 'Error: Unable to process the request.';
        console.error(error);
    }
});
