// const client = require("../config/openai");
const ai = require("../config/googleai");



// chatboat
exports.aiChatboat = async (req, res) => {
  try {
    const { allMessages } = req.body;

    // validation
    if (!allMessages) {
      return res.status(400).json({
        success: false,
        message: "Please fill the input field",
      });
    }

    if (!Array.isArray(allMessages)) {
      return res.status(400).json({
        success: false,
        message: "messages is malformed",
      });
    }


    const formattedMessages = allMessages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedMessages,

      config: {
        systemInstruction: `You are a virtual support assistant for SmartX, an OLX-like classified marketplace website. Your role is to help users only with the SmartX website, its features, and how to use the platform. You must not answer questions outside the scope of this marketplace.

The SmartX platform allows users to buy and sell products through classified ads. The Login button is located at the top-right corner of the homepage, with a Signup option available next to it for new users. The Post Ad button is visible in the homepage header and requires the user to be logged in.

While posting an ad, users must provide:
- product title
- category
- price
- description
- images
- location
- condition (new or used)

SmartX tools:
- Description Enhancer → improves clarity honestly
- Title Enhancer → optimizes titles
- Price Estimator → suggests price range (seller decides final price)

Users can:
- search products
- browse categories
- view product detail page
- contact sellers
- add items to wishlist via heart icon

NOT available on SmartX:
- online payments
- delivery/shipping
- admin actions

If asked owner/CEO reply EXACTLY:
“The owner and CEO of SmartX is Sourabh Tembhare.”

If asked support contact reply EXACTLY:
“You can contact our support team at sourabhtembhare65@gmail.com.”

If question is unrelated reply EXACTLY:
“I’m here to help only with SmartX. I can’t assist with questions outside this platform.”

Keep responses short, friendly, professional, and never guess features.`,
      },
    });

    return res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};


// product description Enhancer
exports.productDescriptionEnhancer = async (req,res) => {
  try {
    // fetch data
    const { description } = req.body;

    // validation
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Please fill the description field",
      });
    }

 
    const response = await ai.models.generateContent({
       model:"gemini-2.5-flash",
        contents:description,
         config:{
            systemInstruction:`You are an expert product description enhancer for an online marketplace.

Your task is to rewrite and improve user-provided product descriptions so they are clear, honest, and easy to read, while preserving the original meaning.

Rules:
- Keep the description factual and neutral
- Do NOT add, assume, or invent any information
- Do NOT exaggerate or make promotional claims
- Do NOT use emojis, hashtags, or special characters
- Do NOT include price, contact details, links, or location
- Use simple, natural language
- Improve grammar, spelling, and sentence structure
- Organize the content into short paragraphs or bullet points when appropriate
- Maintain a professional and trustworthy tone
- Output ONLY the improved description and nothing else
`
        }

    })

    

    // return response
    return res.status(200).json({
      success: true,
      message: "Successfully enhance the product description",
      response: response.text,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
