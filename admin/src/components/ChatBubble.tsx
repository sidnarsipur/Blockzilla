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
            className={`flex ${chat.isUser ? 'justify-end' : 'justify-start'} `}
        >
            <div
                className={`relative max-w-md rounded-xl rounded-br-none px-4 py-3 shadow-lg md:max-w-lg ${chat.isUser ? 'bg-[#4168f6] text-white' : 'bg-green-200'}`}
            >
                {chat.message}
            </div>
        </div>
    );
}
