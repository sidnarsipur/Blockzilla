//@ts-nocheck

import { Dispatch, JSX, useEffect, useState } from 'react';
import TypeIt from 'typeit-react';

export function useAnimatedText(): [any, any] {
    const [instance, setInstance] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        if (!instance) return;

        instance.type(text, { instant: true }).flush();
    }, [text]);

    const el = (
        <TypeIt
            options={{ cursor: false }}
            getAfterInit={(i) => {
                setInstance(i);

                return i;
            }}
        ></TypeIt>
    );

    return [el, setText];
}

export async function streamText(text: string) {
    const chunks = text.split(/\s+/);

    async function* generateStream() {
        for (const chunk of chunks) {
            await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 50)
            );

            yield chunk;
        }
    }

    return {
        textStream: generateStream(),
    };
}
