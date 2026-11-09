import { OpenAI } from "openai";

const client = OpenAI({
  apiKey: "",
});

client.chat.completions
  .create({
    model: "gpt-4",
    messages: [{ role: "user", content: "Hello, how are you?" }],
  })
  .then((response) => {
    console.log(response.choices[0].message.content);
  });
