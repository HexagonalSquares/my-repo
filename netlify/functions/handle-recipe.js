exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { url } = JSON.parse(event.body);

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid input: No URL provided" }),
      };
    }

    // Here you'd process the URL
    console.log("Processing URL:", url);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Successfully processed: ${url}` }),
    };
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
//Testing comment