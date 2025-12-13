import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);

// OLD SDK requires assistantId separately
export const assistantId = process.env.REACT_APP_VAPI_ASSISTANT_ID;

vapi.functions = {
  "farmer-webhook": async ({ question }) => {
    console.log("📩 Frontend sending:", question);

    const res = await fetch(
      "https://uncudgeled-yolande-fatherly.ngrok-free.dev/vapi/farmer-answer",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      }
    );

    const data = await res.json();
    return data.result;
  },
};

console.log("vapi loaded", process.env.REACT_APP_VAPI_ASSISTANT_ID);
console.log("VAPI object:", vapi);
console.log("vapi.isInitialized:", vapi.isInitialized);
console.log("Assistant ID Loaded:", assistantId);

