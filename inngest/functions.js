import { inngest } from "./client";
import {generateScript} from "@/lib/scriptGenerator";
import {ConvexHttpClient} from "convex/browser"
import {DeepgramClient} from "@deepgram/sdk"
import axios from "axios";
import { api } from "@/convex/_generated/api";
const ImagePromptScript = `
Generate Image prompts in {style} style for a 30-second video.

SCRIPT:
{script}

INSTRUCTIONS:
- You MUST break the script into EXACTLY 8 scenes
- You MUST generate EXACTLY 8 image prompts
- Each scene must be different and meaningful
- Focus on objects, environment, characters, mood, lighting, and action
- DO NOT include camera angles or cinematic instructions
- Each prompt must be highly detailed and visually rich

OUTPUT FORMAT:
Return ONLY valid JSON array:

[
  {
    "imagePrompt": "",
    "sceneContent": ""
  }
]

RULES:
- Exactly 8 items only
- No markdown
- No explanation
- No extra text
- Return only JSON
`;
export const aiShortGen = inngest.createFunction(
  {
    id: "ai-short-gen",
    triggers:{ event: "ai/short.gen" },
  },
  async ({ event, step }) => {
    return { message: "Working ✅" };
  }
);
const BASE_URL = process.env.AIGURULAB_BASE_URL;
//const BASE_URL='https://aigurulab.tech';
export const GenerateVideoData=inngest.createFunction(
   {
   id: "generate-video-data",
   triggers: [{ event: "generate-video-data" }]
    
  },
  async({event,step})=>{
    const {script,topic,title,caption,videoStyle,voice,recordId}=event?.data;
    console.log("FULL EVENT:", event);
console.log("Event Data :",event.data);
console.log("SCRIPT:", script);
console.log("VOICE:", voice);
if (!script || !voice) {
  throw new Error("Missing script or voice");
}
    const convex=new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    //Generate Audio File MP3
      const GenerateAudioFile=await step.run(
        "GenerateAudioFile",
        async()=>{
          console.log("SCRIPT:", script);
    console.log("VOICE:", voice);
    console.log("BASE_URL:", BASE_URL);
     const result = await axios.post(BASE_URL+'/api/text-to-speech',
        {
            input: script,
            voice: voice
        },
        {
            headers: {
                'x-api-key': process.env.AIGURULAB_API_KEY, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
     console.log("Its full responce:",result.data) //Output Result: Audio Mp3 Url
          return result.data.audio;
        }
      );
    //Generate Captions
   const GenerateCaptions = await step.run(
  "generateCaptions",
  async () => {
    try {

      const deepgram = new DeepgramClient(
        process.env.DEEPGRAM_API_KEY
      );

      const response =
        await deepgram.listen.prerecorded.transcribeUrl(
          {
            url: GenerateAudioFile,
          },
          {
            model: "nova-2",
            smart_format: true,
          }
        );
  console.log(
        "FULL DEEPGRAM:",
        JSON.stringify(response, null, 2)
      );
     const words =
        response?.result?.results?.channels?.[0]
          ?.alternatives?.[0]?.words || [];

      console.log("WORDS:", words);

      return words;

    } catch (err) {
      console.log("DEEPGRAM ERROR:", err);
      throw err;
    }
  }
);
    //Generate Image Prompt from Script
    const generateImagePrompts = await step.run(
  "generate-image-prompts",
  async () => {
    const prompt = `
${ImagePromptScript}

STYLE: ${videoStyle}
SCRIPT: ${script}
`;

   const result = await generateScript(prompt);

console.log("RAW AI RESPONSE:");
console.log(result);

try {

  const cleaned = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);

} catch (err) {

  console.log("JSON PARSE ERROR:");
  console.log(err);

  console.log("BROKEN JSON:");
  console.log(result);

  throw err;
}
  }
);
  //Generate Image using AI
const GenerateImages = await step.run(
"generateImages",
async () => {

let images = [];

images = await Promise.all(
  generateImagePrompts.map(async (element, index) => {

    try {

      console.log("IMAGE PROMPT:", index);

    const cleanPrompt = element.imagePrompt
  .replace(/\n/g, " ")
  .trim();

const imageUrl =
  `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=1024&height=1024&model=flux&nologo=true`;
      const response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
          });

    const contentType = response.headers["content-type"];

          console.log("CONTENT TYPE:", contentType);

          // verify valid image
          if (!contentType.includes("image")) {
            throw new Error("Invalid image returned");
          }

          return imageUrl;

    } catch (err) {

      console.log("IMAGE FAILED:", index);
      console.log(err);

     return null;
    }

  })
);

return images.filter(Boolean);

}
);
    //Save All Data to DB
    const updateDB = await step.run(
  "UpdateDB",
  async () => {
    const result = await convex.mutation(
      api.videoData.UpdateVideoRecord,
      {
        recordId: recordId,
        audioUrl: GenerateAudioFile,

        // IMPORTANT: always store real value or fallback
        captionJson: GenerateCaptions?.length ? GenerateCaptions : [{
          error: "EMPTY_CAPTIONS",
          raw: GenerateCaptions
        }],

        images: GenerateImages?.length ? GenerateImages : [{
          error: "EMPTY_IMAGES",
          raw: GenerateImages
        }]
      }
    );

    return result;
  }
);
    return 'Executed Succesfully!';
  }
)