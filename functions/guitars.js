const { v4: uuidv4 } = require("uuid");
let guitars = require("../guitarData.js");

exports.handler = async (event) => {
  const { httpMethod, body } = event;

  if (httpMethod === "GET") {
    // Get guitars logic
    return {
      statusCode: 200,
      body: JSON.stringify(guitars),
    };
  }

  if (httpMethod === "POST") {
    const newGuitar = JSON.parse(body);
    newGuitar.id = uuidv4();
    guitars.push(newGuitar);

    return {
      statusCode: 201,
      body: JSON.stringify(newGuitar),
    };
  }

  if (httpMethod === "DELETE") {
    const id = JSON.parse(body);
    guitars = guitars.filter((guitar) => guitar.id !== id);

    return {
      statusCode: 200,
      body: JSON.stringify(guitars),
    };
  }

  // Handle unsupported methods
  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method Not Allowed" }),
  };
};
