import OpenAI from "openai";
import { ChatCompletionContentPartImage } from "openai/resources";

import { systemContent } from "./constants";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_KEY,
});

// <-- Support openai on React Native -->
openai.baseURL = "https://api.openai.com/v1";
openai.buildURL = (path: string) => `${openai.baseURL}${path}`;
// <-- end of React Native support -->

export const ImageUrlContent = ({
  url,
  detail,
}: {
  url: string;
  detail: "low" | "high";
}) =>
  ({
    type: "image_url",
    image_url: {
      url,
      detail,
    },
  }) as ChatCompletionContentPartImage;

export const rawPicture2Html = async (prompt: string, base64: string) => {
  let userPrompt = "Generate code for a web page that looks exactly like this.";

  if (prompt) {
    userPrompt = `${userPrompt} The user describes this image as: ${prompt}`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 4096,
      temperature: 0,
      messages: [
        { role: "system", content: systemContent },
        {
          role: "user",
          content: [
            ImageUrlContent({
              url: `data:image/jpeg;base64,${base64}`,
              detail: "high",
            }),
            {
              type: "text",
              text: userPrompt,
            },
          ],
        },
      ],
    });

    return {
      ok: true,
      data: response.choices[0].message.content,
    };
  } catch (error) {
    console.warn("error", error);
    return {
      ok: false,
      data: "",
    };
  }
};
