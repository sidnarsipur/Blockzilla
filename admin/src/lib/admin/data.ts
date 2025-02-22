/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFirestore } from 'firebase/firestore';
import { openai } from '../util/init';

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { getCurrentUser } from '../user/userManager';

const db = getFirestore();

export async function AddNewRule(query: string) {
    const PromptResponse = z.object({
        name: z.string(),
        description: z.string(),
        blockedWords: z.array(z.string()),
        response: z.string(),
    });

    const prompt = `You are AI assistant for a company who wants to protect children browsing the web.
    You will begin a request (or rule) from a parent to block certain words from their child's browsing experience.
    Once you are given a rule, you need to generate the following
    1. A name for the rule. The name should be short, descriptive, and easy to remember.
    2. A one-sentence description of the rule.
    3. A list of words that should be blocked by the rule. Be comphrensive and include as many words as possible.
    4. A response to the parent, which is a helpful message that confirms the addition of the rule to the system.`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'developer',
                content: prompt,
            },
            {
                role: 'user',
                content: query,
            },
        ],
        response_format: zodResponseFormat(PromptResponse, 'prompt_response'),
        store: true,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
        throw new Error('Failed to generate rule');
    }

    const result = JSON.parse(response);

    if (!result) {
        throw new Error('Failed to generate rule');
    }

    // const user = await getCurrentUser();

    const rulesCollection = collection(db, 'rules');

    const rulesData = {
        userID: 'sRJis8S0RVC68dti8pg7',
        name: result.name,
        description: result.description,
        blockedWords: result.blockedWords,
    };

    const ruleRef = await addDoc(rulesCollection, rulesData);

    if (!ruleRef) {
        throw new Error('Failed to create rule');
    }

    return result;
}

export async function GetBlockedWords() {
    const blockedWords: string[] = [];

    const rulesSnapshot = await getDocs(collection(db, 'rules'));

    rulesSnapshot.forEach((rule: any) => {
        blockedWords.push(...rule.data().blockedWords);
    });

    return blockedWords;
}
