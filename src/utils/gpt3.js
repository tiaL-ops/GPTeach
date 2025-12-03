import OpenAI from 'openai';

export async function callGPT3(myPrompt, onResponse) {
	const openai = new OpenAI({
		apiKey: process.env.REACT_APP_GPT_KEY,
		// Warning: calling OpenAI from the browser exposes the key. Prefer server-side in production.
		dangerouslyAllowBrowser: true,
	});

	console.log("what is my prompt??");
	console.log(myPrompt);

	try {
		const response = await openai.completions.create({
			model: "gpt-3.5-turbo-instruct",
			prompt: myPrompt,
			temperature: 0.7,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
			stop: ["TA:"],
		});

		console.log("i'm here!");
		const text = response.choices?.[0]?.text ?? "";
		console.log(text);
		const trimmed = text.trim().replace(/[\n]/gm, "");

		if (trimmed === "") {
			console.log("abort mission chief");
			onResponse("hmmm");
		} else if (trimmed === "Sally:") {
			console.log("abort mission chief #2");
			onResponse("[no response ...]");
		} else {
			onResponse(text);
		}
	} catch (error) {
		console.error("OpenAI API Error:", error);
		onResponse("[Error: Could not get response]");
	}
}

// need to have some logic for the case where we don't get any response back...
// we need to just send the prompt again?
