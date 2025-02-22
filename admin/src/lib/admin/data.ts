import { openai } from '../util/init';

export async function AddNewRule() {
    const prompt = `You are AI assistant for a company who wants to protect children browsing the web.
    You will begin a request (or rule) from a parent to block certain words from their child's browsing experience.
    Once you are given a rule, you need to generate the following
    1. A name for the rule. The name should be short, descriptive, and easy to remember.
    2. A description of the rule, in 2-3 sentences
    3. A list of words that should be blocked by the rule. Be comphrensive and include as many words as possible.
    4. A response to the parent, which is a helpful message that explains the rule and why it is important.`;
}
