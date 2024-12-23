document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipe-form");
  const input = document.getElementById("recipe-url");
  const container = document.getElementById("ingredients-container");

  form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const url = input.value.trim();

      if (!url) {
          alert("Please enter a recipe URL.");
          return;
      }

      // Send the URL to the backend
      try {
          const response = await fetch("/.netlify/functions/handle-recipe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url }),
          });

          const data = await response.json();
          if (data.ingredients && Array.isArray(data.ingredients)) {
              displayIngredients(data.ingredients);
          } else {
              alert("Unable to process ingredients. Try a different URL.");
          }
      } catch (error) {
          console.error(error);
          alert("Error communicating with the server.");
      }
  });

  function displayIngredients(ingredients) {
      const uniqueIngredients = [...new Set(ingredients)].sort();
      const list = document.createElement("ul");

      uniqueIngredients.forEach((ingredient) => {
          const listItem = document.createElement("li");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.name = "ingredient";
          checkbox.value = ingredient;

          listItem.appendChild(checkbox);
          listItem.appendChild(document.createTextNode(` ${ingredient}`));
          list.appendChild(listItem);
      });

      // Clear and update the container
      container.innerHTML = "";
      container.appendChild(list);
  }
});
