import { OpenAI } from 'openai';
import 'dotenv/config';
import envConf from '../../envconf.js';





const client = new OpenAI({
    apiKey: envConf.openAIApiKey
});

// Prompting tips and system prompt:
    const effectivePromptTips = [
        {
            type: "Adding and removing elements",
            info: "Provide an image and describe your change. The model will match the original image's style, lighting, and perspective.",
            template: `Using the provided image of [subject], please [add/remove/modify] [element]
        to/from the scene. Ensure the change is [description of how the change should
        integrate].`
        },
        {
            type: "Inpainting (Semantic masking)",
            info: "Conversationally define a 'mask' to edit a specific part of an image while leaving the rest untouched.",
            template: `Using the provided image, change only the [specific element] to [new
        element/description]. Keep everything else in the image exactly the same,
        preserving the original style, lighting, and composition.`
        },
        {
            type: "Style transfer",
            info: "Provide an image and ask the model to recreate its content in a different artistic style.",
            template: `Transform the provided photograph of [subject] into the artistic style of [artist/art style]. Preserve the original composition but render it with [description of stylistic elements].`
        },
        {
            type: "Accurate text in image",
            info: "The Model excels at rendering text. Be clear about the text, the font style (descriptively), and the overall design.",
            template: `Create a [image type] for [brand/concept] with the text "[text to render]"
        in a [font style]. The design should be [style description], with a
        [color scheme].`
        },

    ]

    const promptingTips = `
    Best Practices
    To elevate your results from good to great, incorporate these professional strategies into your workflow.

    Be Hyper-Specific: The more detail you provide, the more control you have. Instead of "fantasy armor," describe it: "ornate elven plate armor, etched with silver leaf patterns, with a high collar and pauldrons shaped like falcon wings."
    Provide Context and Intent: Explain the purpose of the image. The model's understanding of context will influence the final output. For example, "Create a logo for a high-end, minimalist skincare brand" will yield better results than just "Create a logo."
    Iterate and Refine: Don't expect a perfect image on the first try. Use the conversational nature of the model to make small changes. Follow up with prompts like, "That's great, but can you make the lighting a bit warmer?" or "Keep everything the same, but change the character's expression to be more serious."
    Use Step-by-Step Instructions: For complex scenes with many elements, break your prompt into steps. "First, create a background of a serene, misty forest at dawn. Then, in the foreground, add a moss-covered ancient stone altar. Finally, place a single, glowing sword on top of the altar."
    Use "Semantic Negative Prompts": Instead of saying "no cars," describe the desired scene positively: "an empty, deserted street with no signs of traffic."
`



    const systemPrompt = `
    You are a query enhancer for an you tube thumbnail generation model.

    You would be provided with some user details and preferences about generating you tube thumbnails forhis videos and in return you have to give a professional prompt that would be passed to other image generation model as it is for generating the thumbnail.

    The user will always provide his photo along with the prompt you would give, these both would be combinely sent to the image generating LLM for better output quality.

    Always tell the model in your response that it is a YouTube thumbnail generation model and the main purpose is to create an eye-catching thumbnail that accurately represents the video content.

    Here are some official prompt tips for better quality images from the image generation model platform:

    These are some image editing tips: ${JSON.stringify(effectivePromptTips, null, 2)}


    These are some prompting tips provided at the documentation: ${JSON.stringify(promptingTips)}


    Rule:
    - Write the prompt strictly according to provided prompt tips and image editing tips for better output quality.


`

async function enhanceQuery(details) {
    // const userPreferences = {
    //     category: "News/Politics",
    //     purposeOfThumbnail: "Fun/entertaining",
    //     colorPreferences: "Bright/contrasting (red, yellow, green)",
    //     wantTextOnThumbnail: true,
    //     titleOfVideo: "The Sunday Show",
    //     targetAudience: "General audience",
    //     keepCurrentOutfit: false,
    //     removeBackground: true
    // }

    const userPreferences = details;



    const response = await client.chat.completions.create({
        model: "gpt-4.1",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: `Here're the details and preferences for generating the thumbnail: 
                ${JSON.stringify(userPreferences, null, 2)}
            `
            }
        ]
    })

    return response.choices[0].message.content;
}

// console.log("Bot: ", await enhanceQuery());

export default enhanceQuery;