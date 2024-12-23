exports.handler = async (event) => {
    try {
        const { url } = JSON.parse(event.body);

        if (!url) {
            throw new Error("URL is missing");
        }

        const cookedUrl = url.replace('https://', 'https://cooked.wiki/');

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins
                'Access-Control-Allow-Headers': 'Content-Type', // Allow specific headers
            },
            body: JSON.stringify({ message: `Converted URL: ${cookedUrl}` }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ message: 'An error occurred.', error: error.message }),
        };
    }
};
