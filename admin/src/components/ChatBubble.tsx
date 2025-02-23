import { streamText, useAnimatedText } from '@/hooks/useAnimatedText';
import { Chat, Rule } from '@/lib/types';
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
                className={`relative max-w-md rounded-3xl px-4 py-3 font-medium text-white md:max-w-lg ${chat.isUser ? 'ml-8 rounded-br-none bg-[#4168f6]' : 'mr-8 rounded-bl-none bg-[#33ae5a]'}`}
            >
                {chat.message}
            </div>
            {!chat.isUser && <RuleBox rule={chat.rule} />}
        </div>
    );
}

function RuleBox({ rule }: { rule?: Rule }) {
    return (
        <div>
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
            <p className="mb-2 mt-6 text-center text-gray-400">
                New Rule Added
            </p>
            <div className="mx-6 rounded-lg border border-gray-200 bg-white px-5 py-3 shadow-md transition-shadow">
                <h3 className="mb-1 text-lg font-semibold text-gray-800">
                    {rule?.name}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-500">
                    {rule?.description}
                </p>
            </div>
        </div>
    );
}
