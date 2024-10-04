import OpenAI from "openai";

export const generateAITitle = async (req, res) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });

  const { prompt } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Generate a title for a blog from these lines (less than 100 chars) : ${prompt}`,
      },
    ],
  });

  return res.json(completion.choices[0].message.content);
};

export const generateAIKeywords = async (req, res) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });

  const { prompt } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Generate 5 keywords for search engine optimization seperated by commas for a blog from the title (Each less than 20 chars) : ${prompt}`,
      },
    ],
  });

  return res.json(completion.choices[0].message.content);
};

export const createBlog = async (req, res) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });

  const { blogData } = req.body;

  const completion = await openai.chat.completions.create({
    model: blogData.model,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `You are writing a blog for the data provided below. The response should be a strict json format in array and should follow exactly like the example below.
          Rules:
          - DO NOT ADD ANY OTHER CHARACTERS MAKE IT A SIMPLE JSON ARRAY WITH CONTENT IN IT (NO +, newline char etc)
          - It should only be 1 array
          - Match the word count to the size provided accordingly, you can add more objects but make sure that they are same as their type like in example
          - type: title - should be the starting of the blog
          - type: para - must have text in it which is an array with each index lines before we give a one line gap
          - type: unordered list - must have text array, header/header strong(either one)
          - each object can have either header or header strong (not both)
          - Do not add your own types, use the exact ones from the example below
          - Add the end of the json add a word count (this word count includes only the text which will be shown on screen (EG: "text" : ["this is tamim"] has only 3 words because thats the string inside the array))
          - Make sure to use the SEO Keywords

          Example:

          [
            {
              "type": "title",
              "text": ["Pakistan Today: Challenges and Opportunities"]
            },
            {
              "type": "para",
              "text": [
                "What if the challenges facing Pakistan also hold great opportunities? This question leads us to look closely at Pakistan's political, economic, and social scenes. These areas shape its future and impact the world around it.",
                "By examining these aspects, we can see how they affect Pakistan and the wider world. We'll use data from the World Bank and the International Monetary Fund (IMF) to understand both challenges and opportunities. This will give us a full picture of Pakistan today."
              ]
            },
            {
              "type": "unordered list",
              "headerStrong": "Key Takeaways",
              "text": [
                "The political challenges in Pakistan create both uncertainty and potential for reform.",
                "Economic opportunities are emerging in various sectors, including technology and agriculture.",
                "The social dynamics in Pakistan reflect a mixture of resilience and vulnerability.",
                "Understanding the current state of Pakistan is essential for regional collaboration.",
                "Collaboration with international finance organizations could enhance growth pathways."
              ]
            },
            {
              "type": "para",
              "headerStrong": "Current State of Pakistan",
              "text": [
                "The current state of Pakistan is complex. It involves many factors that shape its future. Understanding the political situation is key to solving governance issues and making reforms.",
                "We will look at the political dynamics, economic conditions, and social issues in Pakistan. These are the main factors affecting the nation."
              ]
            },
            {
              "type": "para",
              "header": "Political Situation in Pakistan",
              "text": [
                "The political situation in Pakistan is unstable. Governance issues come from recent elections. Political parties face operational challenges.",
                "The military's role in civilian governance is significant. This makes it hard for the government to make effective policies. Reports from the Center for Strategic and International Studies show how political unrest affects international relations.",
                "This uncertainty impacts decision-making at all levels. It creates a challenging environment for the government."
              ]
            },
            {
              "type": "para",
              "header": "Economic Conditions in Pakistan",
              "text": [
                "Economic conditions in Pakistan are tough. High inflation, growing budget deficits, and rising external debt are major challenges. The Pakistan Bureau of Statistics shows alarming inflation and unemployment rates.",
                "Despite these challenges, there is growth potential in sectors like technology, renewable energy, and agriculture. A strategic approach to these sectors could help balance the economy."
              ]
            },
            {
              "type": "para",
              "header": "Social Issues in Pakistan",
              "text": [
                "Social issues in Pakistan are complex and widespread. Education challenges are a big concern. UNICEF reports show big disparities in educational opportunities.",
                "Health care disparities also affect the population. The need for reforms in women's rights and ethnic tensions is clear. Solving these issues is crucial for a more equitable society."
              ]
            },
            {
              "type": "faq",
              "headerStrong": "FAQs",
              "questions": [
                "What is the current state of Pakistan?",
                "What are the primary political challenges facing Pakistan today?",
                "How are the economic conditions in Pakistan currently?"
              ],
              "answers": [
                "Pakistan is facing both challenges and opportunities. Politically, the country struggles with stability and governance. Economically, high inflation and fiscal issues are big concerns, but tech and agriculture are growing.",
                "Pakistan's main political challenges include governance issues and the military's influence. Recent elections have caused political unrest. This unrest affects the nation's stability and governance.",
                "Pakistan's economy is facing tough times with high inflation and debt. Yet, sectors like renewable energy, agriculture, and tech offer growth opportunities. These areas can help the economy recover."
              ]
            }
          ]

          Below is the data for what you will be making the blog:
            - Size of article : ${blogData.size}
            - Title: ${blogData.title},
            - Language: ${blogData.language}
            - Tone of Voice: ${blogData.voice},
            - Target Audience Country: ${blogData.country}
            - SEO Keywords: ${blogData.seo}
        `,
      },
    ],
  });

  return res.json(completion.choices[0].message.content);
};

export const generateImages = async (req, res) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });

  const { blogData } = req.body;

  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt: `Generate relevant images for the title ${blogData.title} and then make the photos ${blogData.style}`,
    n: Number(blogData.numImages),
    size: blogData.imageSize,
  });

  return res.json(response);
};
