const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event) => {
  try {
    const { url } = JSON.parse(event.body);

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL is required' }),
      };
    }

    // Fetch the HTML content of the URL
    const { data: html } = await axios.get(url);

    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);
    const ingredients = [];

    // Adjust selectors to match cooked.wiki's structure
    $('.ingredient').each((i, el) => {
      const amount = $(el).find('.amount').text();
      const ingredient = $(el).find('.name').text();
      if (amount && ingredient) {
        ingredients.push({ amount, ingredient });
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ingredients }),
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch ingredients' }),
    };
  }
};
