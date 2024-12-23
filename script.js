document.querySelector('#recipe-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const input = document.querySelector('#recipe-url');
    const recipeUrl = input.value;

    // Clear any previous response
    const output = document.querySelector('#response');
    output.textContent = 'Processing...';

    try {
        // Send the URL to the backend function
        const response = await fetch('https://kroger-cart-creator.netlify.app/.netlify/functions/handle-recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: recipeUrl }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Display the cooked.wiki URL
        if (data.cookedWikiUrl) {
            output.innerHTML = `Converted URL: <a href="${data.cookedWikiUrl}" target="_blank">${data.cookedWikiUrl}</a>`;
        } else {
            output.textContent = 'Error: Could not generate cooked.wiki URL.';
        }
    } catch (error) {
        console.error('Error:', error);
        output.textContent = 'Failed to process the recipe URL. Please try again.';
    }
});
