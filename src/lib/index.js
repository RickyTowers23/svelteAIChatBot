const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'genaiadroit1', location: 'us-central1' });
const model = 'gemini-1.0-pro-001';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 4500,
    temperature: 0.75,
    topP: 1,
  },
  safetySettings: [
    {
      // @ts-ignore
      category: 'HARM_CATEGORY_HATE_SPEECH',
      // @ts-ignore
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      // @ts-ignore
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      // @ts-ignore
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      // @ts-ignore
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      // @ts-ignore
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      // @ts-ignore
      category: 'HARM_CATEGORY_HARASSMENT',
      // @ts-ignore
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ],
});

// Function to get the prompt from the user
function getPrompt() {
  return new Promise((resolve) => {
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Please enter your prompt: ', (prompt) => {
      rl.close();
      resolve(prompt);
    });
  });
}

// Function to generate content based on the user prompt and optional context
// @ts-ignore
async function generateContent(prompt, context = null) {
  const req = {
    contents: [
      { role: 'user', parts: [{ text: prompt }] },
      ...(context ? [{ role: 'system', parts: [{ text: context }] }] : [])
    ],
  };

  try {
    const streamingResp = await generativeModel.generateContentStream(req);
    let aggregatedResponse = '';

    for await (const item of streamingResp.stream) {
      process.stdout.write('stream chunk: ' + JSON.stringify(item) + '\n');
      // @ts-ignore
      if (item.parts && item.parts.length > 0) {
        // @ts-ignore
        aggregatedResponse += item.parts[0].text;
      }
    }

    console.log('AdriBot: ', aggregatedResponse);
    return aggregatedResponse;
  } catch (error) {
    console.error('Error generating content:', error);
    return null;
  }
}

// Main function to handle the prompt and content generation
async function main() {
  const userPrompt = await getPrompt();
  await generateContent(userPrompt);
}

main();

