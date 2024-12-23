document.getElementById('recipe-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    
    const recipeUrl = document.getElementById('recipe-url').value;
    const responseElement = document.getElementById('response');

    try {
        // Replace this with your Netlify backend URL
        const response = await fetch('https://clinquant-caramel-1d98db.netlify.app', {
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
