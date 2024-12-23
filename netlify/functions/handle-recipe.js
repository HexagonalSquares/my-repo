exports.handler = async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        };
    }

    try {
        const data = JSON.parse(event.body); // Extract input URL
        const recipeUrl = data.url;

        // Remove "https://" from the original URL and prepend "https://cooked.wiki/"
        const cookedWikiUrl = `https://cooked.wiki/${recipeUrl.replace(/^https?:\/\//, '')}`;

        // Respond with the converted URL
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'Recipe URL successfully converted!',
                cookedWikiUrl,
            }),
        };
    } catch (error) {
        console.error('Error converting recipe URL:', error);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ error: 'Failed to process the recipe URL.' }),
        };
    }
};
