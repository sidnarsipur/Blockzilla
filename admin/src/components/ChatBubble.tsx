import { streamText, useAnimatedText } from '@/hooks/useAnimatedText';
import { Chat } from '@/lib/types';
import { useEffect } from 'react';

export default function ChatBubble({ chat }: { chat: Chat }) {
    const [animatedText, setText] = useAnimatedText();

    // useEffect(() => {
    //     const fn = async () => {
    //         const { textStream } = await streamText(chat.message);

    //         for await (const textPart of textStream) {
    //             setText(textPart);
    //         }
    //     };
    //     fn();
    // }, [chat, setText]);

    return (
        <div
            className={`flex ${chat.isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-xs rounded-2xl p-3 text-white shadow-md md:max-w-sm ${
                    chat.isUser
                        ? 'rounded-br-none bg-blue-700'
                        : 'rounded-bl-none bg-green-700'
                }`}
            >
                {/* {animatedText} */}
                {chat.message}
            </div>
        </div>
    );
}
