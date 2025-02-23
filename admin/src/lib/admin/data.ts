/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFirestore } from 'firebase/firestore';
import { openai } from '../util/init';

import {
    collection,
    addDoc,
    deleteDoc,
    getDocs,
    query,
    orderBy,
    getDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { Rule } from '../util/model';

const db = getFirestore();

export async function AddNewRule(query: string) {
    const PromptResponse = z.object({
        name: z.string(),
        description: z.string(),
        blockedWords: z.array(z.string()),
        response: z.string(),
        timeFrom: z.string(),
        timeTo: z.string(),
    });

    const prompt = `You are AI assistant for a company who wants to protect children browsing the web.
    You will begin a request (or rule) from a parent to block certain words from their child's browsing experience.
    Once you are given a rule, you need to generate the following
    1. A name for the rule. The name should be short, descriptive, and easy to remember.
    2. A one-sentence description of the rule.
    3. A list of words that should be blocked by the rule. Be comphrensive and include as many words as possible, think of all the kinds of variations of the query, 
    words related to the query and such. Include subwords, and related words. Adding more words to be cautious is better than adding fewer words.
    4. Behave like a helpful friend or a child'd teacher, and give a light hearted response to the parent. Do not say thank you in the beginning. Have one sentence to confirm that the block was set in place
    5. TimeFrom: If mentioned in the query, the time from which the rule should be applied. If not mentioned, return 12:00 AM.
    6. TimeTo: If mentioned in the query, the time to which the rule should be applied. If not mentioned, return 11:59 PM.
    The format is "HH:mm", "HH:mm:ss" or "HH:mm:ss.SSS" where HH is 00-23, mm is 00-59, ss is 00-59, and SSS is 000-999.`;

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

    const rulesCollection = collection(db, 'rules');

    const rulesData = {
        userID: 'sRJis8S0RVC68dti8pg7',
        enabled: true,
        name: result.name,
        description: result.description,
        blockedWords: result.blockedWords,
        timestamp: Date.now(),
        timeFrom: result.timeFrom,
        timeTo: result.timeTo,
    };

    const ruleRef = await addDoc(rulesCollection, rulesData);

    if (!ruleRef) {
        throw new Error('Failed to create rule');
    }

    return result;
}

export async function DeleteRule(ruleID: string) {
    const ruleRef = doc(db, 'rules', ruleID);

    await deleteDoc(ruleRef);
}

export async function GetRules() {
    const rules: Rule[] = [];

    const rulesQuery = query(
        collection(db, 'rules'),
        orderBy('timestamp', 'asc')
    );

    const rulesSnapshot = await getDocs(rulesQuery);

    rulesSnapshot.forEach((rule: any) => {
        const ruleData = rule.data();

        const ruleModel: Rule = {
            userID: ruleData.userID,
            id: rule.id,
            name: ruleData.name,
            enabled: ruleData.enabled,
            description: ruleData.description,
            blockedWords: ruleData.blockedWords,
            timestamp: ruleData.timestamp,
            timeFrom: ruleData.timeFrom,
            timeTo: ruleData.timeTo,
        };
        rules.push(ruleModel);
    });

    return rules;
}

export async function GetBlockedWords() {
    const blockedWords: string[] = [];

    const rulesSnapshot = await getDocs(collection(db, 'rules'));

    rulesSnapshot.forEach((rule: any) => {
        blockedWords.push(...rule.data().blockedWords);
    });

    return blockedWords;
}

export async function GetBlockedWordsByRule(ruleID: string) {
    const blockedWords: string[] = [];

    const ruleSnapshot = await getDoc(doc(db, 'rules', ruleID));

    if (ruleSnapshot.exists()) {
        blockedWords.push(...ruleSnapshot.data().blockedWords);
    }

    return blockedWords;
}

export async function UpdateEnabledRule(ruleID: string, enabled: boolean) {
    const ruleRef = doc(db, 'rules', ruleID);
    await updateDoc(ruleRef, {
        enabled,
    });
}

export async function UpdateTime(
    ruleID: string,
    timeFrom: string,
    timeTo: string
) {
    const ruleRef = doc(db, 'rules', ruleID);
    await updateDoc(ruleRef, {
        timeFrom,
        timeTo,
    });
}
