exports.handler = async (event, context) => {
    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allows all origins
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', // Allowed HTTP methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allowed headers
            },
        };
    }

    // Main function logic
    try {
        // Parse the incoming request body
        const data = JSON.parse(event.body); // Assuming you're sending JSON
        const recipeUrl = data.url;

        // Example logic to process the recipe URL
        // Replace this with your actual logic for handling recipes
        console.log(`Processing recipe URL: ${recipeUrl}`);

        // Create a response object (this is just an example)
        const response = {
            message: `Successfully processed the recipe URL: ${recipeUrl}`,
        };

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow the frontend to access this response
            },
            body: JSON.stringify(response),
        };
    } catch (error) {
        console.error('Error processing recipe:', error);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow the frontend to access error responses
            },
            body: JSON.stringify({ error: 'An error occurred while processing the recipe.' }),
        };
    }
};
