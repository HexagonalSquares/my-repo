exports.handler = async (event) => {
    try {
        if (!event.body) {
            throw new Error("Request body is missing");
        }

        const { url } = JSON.parse(event.body);

        if (!url) {
            throw new Error("URL is missing in the request body");
        }

        const cookedUrl = url.replace('https://', 'https://cooked.wiki/');

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ message: `Converted URL: ${cookedUrl}` }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ message: "An error occurred.", error: error.message }),
        };
    }
};
