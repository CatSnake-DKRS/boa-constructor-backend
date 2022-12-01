const { Configuration, OpenAIApi } = require('openai');

// setting up authorized access to the Dall-e API

const configuration = new Configuration({
  apiKey: process.env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);
const apiController = {};
const manageRequest = async (req, res, next, prompt, temperature, schema) => {
  // get the query from data on request
  let { query } = req.body;
  // append SELECT to query for SQL queries
  query += schema ? ' \n SELECT' : '';
  try {
    // making a call to the Dall-e API
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `${prompt} ${query}`,
      temperature,
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
    // selectively add SELECT to translation for SQL queries
    res.locals.translation = `${
      schema ? 'SELECT' : ''
    }${responseTranslation.join('')}`;
    res.locals.schema = schema;
  } catch (err) {
    // error handling
    const ourErr = {
      log: 'Express error handler caught error in the englishToCode apiController',
    };
    next(ourErr);
  }
  return next();
};

apiController.basicTestRunner = (req, res, next) => {
  if (req.body.language === '__test') res.status(200).send(req.body.query);
  else next();
};

// middleware for translating code into plain english
apiController.englishToCode = async (req, res, next) => {
  // takes req, res, next, DALL-E prompt, and temperature
  await manageRequest(req, res, next, 'Use javascript to', 0);
};

apiController.codeToEnglish = async (req, res, next) => {
  // takes req, res, next, DALL-E prompt, and temperature
  await manageRequest(
    req,
    res,
    next,
    'Summarize this for a second-grade student:\n',
    0
  );
};

apiController.englishToSql = async (req, res, next) => {
  const { schema } = req.body;

  // builds string of all arrays of SQL schema provided by user
  let schemaString = '';
  for (const table in schema) {
    const tableString = `#${table}(${schema[table]})\n`;
    schemaString += tableString;
  }

  // takes req, res, next, DALL-E prompt, temperature, and schema
  await manageRequest(
    req,
    res,
    next,
    '### Postgres SQL tables, with their properties:\n#\n',
    0,
    schemaString
  );
};

module.exports = apiController;
