const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async (event) => {
    try {
        const { url } = JSON.parse(event.body);

        if (!url) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No URL provided." }),
            };
        }

        // Convert to cooked.wiki URL
        const cookedWikiUrl = convertToCookedWikiUrl(url);

        // Fetch the cooked.wiki page
        const response = await axios.get(cookedWikiUrl);
        const html = response.data;

        // Parse the HTML to extract ingredients
        const ingredients = parseIngredients(html);

        return {
            statusCode: 200,
            body: JSON.stringify({ ingredients }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to process the recipe." }),
        };
    }
};

// Helper to convert URL to cooked.wiki format
function convertToCookedWikiUrl(originalUrl) {
    // Example transformation logic
    return `https://cooked.wiki/recipes?source=${encodeURIComponent(originalUrl)}`;
}

// Helper to extract ingredients from HTML
function parseIngredients(html) {
    const $ = cheerio.load(html);
    const ingredients = [];

    $("li.ingredient").each((index, element) => {
        ingredients.push($(element).text().trim());
    });

    return ingredients;
}
