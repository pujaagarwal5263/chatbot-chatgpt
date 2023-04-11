const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

//model takes 35 secs to bring response
const askGPT = async (prompt) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  console.log(response["data"]["choices"][0]["message"]["content"]);
  return response["data"]["choices"][0]["message"]["content"];
};

const getData = async (req, res) => {
  const prompt = req.query.prompt;
  const data = await askGPT(prompt);
  return res.status(200).send(data);
};

app.get("/chatbot", getData);

app.listen(8000, () => {
  console.log("listening to port 8000");
});
