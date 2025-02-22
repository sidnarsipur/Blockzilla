import { streamText, useAnimatedText } from '@/hooks/useAnimatedText';
import { Chat } from '@/lib/types';
import { useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Download } from 'lucide-react';

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
            className={`flex flex-col ${chat.isUser ? 'items-end' : 'items-start'}`}
        >
            <div
                className={`relative max-w-md rounded-xl px-4 py-3 font-medium text-white md:max-w-lg ${chat.isUser ? 'rounded-br-none bg-[#4168f6]' : 'rounded-bl-none bg-[#33ae5a]'}`}
            >
                {chat.message}
            </div>
            {!chat.isUser && (
                <div className="ml-2 mt-2 flex gap-2 text-xs text-gray-400">
                    <button className="hover:text-gray-200">
                        <ThumbsUp size={14} />
                    </button>
                    <button className="hover:text-gray-200">
                        <ThumbsDown size={14} />
                    </button>
                    <button className="hover:text-gray-200">
                        <Download size={14} />
                    </button>
                </div>
            )}
        </div>
    );
}
