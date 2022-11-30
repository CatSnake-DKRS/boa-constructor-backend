const { teardown } = require("mocha");
const { Configuration, OpenAIApi } = require("openai");

// setting up authorized access to the Dall-e API

const configuration = new Configuration({
  apiKey: process.env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

const apiController = {};

apiController.basicTestRunner = (req, res, next) => {
  if (req.body.language === "__test") res.status(200).send(req.body.query);
  else next();
};

// middleware for translating code into plain english
apiController.englishToCode = async (req, res, next) => {
  // get the data from the body on the request
  const { query } = req.body; // code...
  // temperature can a stretch feature - if we let user decide on the temperature,
  // we will get on the req.body as well
  try {
    // making a call to the Dall-e API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Use javascript to ${query} `,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0,
    });
    // getting rid of the first 2 '\n' symbols (they will probably be on all of our responses)
    const responseTranslation = response.data.choices[0].text.split('');
    while (responseTranslation[0] === '\n' && responseTranslation.length > 1) {
      responseTranslation.shift();
    }
    // storing translation in form of the string on the response locals object
    res.locals.query = query;
    res.locals.translation = responseTranslation.join("");
  } catch (err) {
    // error handling
    const ourErr = {
      log: 'Express error handler caught error in the englishToCode apiController',
    };
    next(ourErr);
  }
  return next();
};

apiController.codeToEnglish = async (req, res, next) => {
  // get the data from the body on the request
  const { query } = req.body; // code...

  // temperature can a stretch feature - if we let user decide on the temperature,
  // we will get on the req.body as well
  const temperature = 0.7;

  try {
    // making a call to the Dall-e API
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Summarize this for a second-grade student:\n${query}`,
      temperature,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // getting rid of the first 2 '\n' symbols (they will probably be on all of our responses)
    const responseTranslation = response.data.choices[0].text.split("");
    while (responseTranslation[0] === "\n" && responseTranslation.length > 1) {
      responseTranslation.shift();
    }

    // storing translation in form of the string on the response locals object
    res.locals.query = query;
    res.locals.translation = responseTranslation.join("");
  } catch (err) {
    // error handling
    const ourErr = {
      log: "Express error handler caught error in the getTranslation apiController",
    };
    next(ourErr);
  }

  next();
};

apiController.englishToSql = async (req, res, next) => {
  // get the data from the body on the request
  const { query, schema } = req.body; // code...
  // tempreture can a stretch feature - if we let user decide on the tempreture,
  // we will get on the req.body as well
  const temperature = 0.7;
  let schemaString = "";

  for (const table in schema) {
    const tableString = `#${table}(${schema[table]})\n`;
    schemaString += tableString;
  }

  try {
    // making a call to the Dall-e API
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `### Postgres SQL tables, with their properties:\n#\n ${schemaString}\n### ${query}\n SELECT`,
      temperature,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // getting rid of the first 2 '\n' symbols (they will probably be on all of our responses)
    const responseTranslation = response.data.choices[0].text.split("");
    while (responseTranslation[0] === "\n" && responseTranslation.length > 1) {
      responseTranslation.shift();
    }

    // storing translation in form of the string on the response locals object
    res.locals.schemaString = schemaString;
    res.locals.query = query;
    res.locals.translation = `SELECT${responseTranslation.join("")}`;
  } catch (err) {
    // error handling
    const ourErr = {
      log: "Express error handler caught error in the englishToSql apiController",
    };
    next(ourErr);
  }

  next();
};

module.exports = apiController;
