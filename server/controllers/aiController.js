// const client = require("../config/openai");
const ai = require("../config/googleai");

const resolveAiError = (error) => {
  const status = error?.status || error?.error?.code;
  const rawMessage =
    error?.error?.message || error?.message || "AI service failure";
  const normalized = rawMessage.toLowerCase();

  if (
    normalized.includes("api key was reported as leaked") ||
    normalized.includes("permission_denied")
  ) {
    return {
      statusCode: 503,
      message:
        "AI service key is invalid or leaked. Please rotate google_api_key in server .env and restart server.",
    };
  }

  if (normalized.includes("api key") || normalized.includes("credential")) {
    return {
      statusCode: 503,
      message:
        "AI service is not configured correctly. Please check google_api_key in server .env.",
    };
  }

  if (status === 429 || normalized.includes("quota") || normalized.includes("rate")) {
    return {
      statusCode: 429,
      message: "AI service limit reached. Please try again after some time.",
    };
  }

  return {
    statusCode: 500,
    message: "Internal Server error",
  };
};



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
        systemInstruction: `You are a virtual support assistant for TradeX, an OLX-like classified marketplace website. Your role is to help users only with the TradeX website, its features, and how to use the platform. You must not answer questions outside the scope of this marketplace.

The TradeX platform allows users to buy and sell products through classified ads. The Login button is located at the top-right corner of the homepage, with a Signup option available next to it for new users. The Post Ad button is visible in the homepage header and requires the user to be logged in.

While posting an ad, users must provide:
- product title
- category
- price
- description
- images
- location
- condition (new or used)

TradeX tools:
- Description Enhancer → improves clarity honestly
- Title Enhancer → optimizes titles
- Price Estimator → suggests price range (seller decides final price)

Users can:
- search products
- browse categories
- view product detail page
- contact sellers
- add items to wishlist via heart icon

NOT available on TradeX:
- online payments
- delivery/shipping
- admin actions

If asked owner/CEO reply EXACTLY:
"The owner and CEO of TradeX is Sourabh Tembhare."

If asked support contact reply EXACTLY:
“You can contact our support team at sourabhtembhare65@gmail.com.”

If question is unrelated reply EXACTLY:
"I'm here to help only with TradeX. I can't assist with questions outside this platform."

Keep responses short, friendly, professional, and never guess features.`,
      },
    });

    return res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.log(error);

    const { statusCode, message } = resolveAiError(error);

    return res.status(statusCode).json({
      success: false,
      message,
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

    const { statusCode, message } = resolveAiError(error);

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
