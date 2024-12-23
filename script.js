document.getElementById('submit-btn').addEventListener('click', async () => {
  const url = document.getElementById('recipe-url').value;

  if (!url) {
    alert('Please enter a valid URL!');
    return;
  }

  try {
    // Send the URL to the Netlify function
    const response = await fetch('/.netlify/functions/handle-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) throw new Error('Failed to fetch ingredients.');

    const data = await response.json();

    const ingredientsList = document.getElementById('ingredients-list');

    if (!data.ingredients || data.ingredients.length === 0) {
      ingredientsList.innerHTML = '<p>No ingredients found. Please check the URL.</p>';
      return;
    }

    // Display ingredients with checkboxes
    ingredientsList.innerHTML =
      '<ul>' +
      data.ingredients
        .map(
          (item) =>
            `<li><input type="checkbox" /> ${item.amount} ${item.ingredient}</li>`
        )
        .join('') +
      '</ul>';
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    alert('An error occurred while fetching ingredients.');
  }
});
