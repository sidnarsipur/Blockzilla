import { streamText, useAnimatedText } from '@/hooks/useAnimatedText';
import { Chat } from '@/lib/types';
import RuleBox from './RuleBox';

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
                className={`relative max-w-md rounded-3xl px-4 py-3 font-medium text-white md:max-w-lg ${chat.isUser ? 'ml-8 rounded-br-none bg-[#4168f6]' : 'mr-8 rounded-bl-none bg-[#2ea654]'}`}
            >
                {chat.message}
            </div>
            {!chat.isUser && chat.rule && <RuleBox rule={chat.rule} />}
        </div>
    );
}
