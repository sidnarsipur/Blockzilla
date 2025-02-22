import { Chat } from '@/lib/types';

export default function ChatBubble({ chat }: { chat: Chat }) {
    return (
        <div
            className={`flex ${chat.isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-xs rounded-2xl p-3 text-white shadow-md md:max-w-sm ${
                    chat.isUser
                        ? 'rounded-br-none bg-blue-400'
                        : 'rounded-bl-none bg-green-400'
                }`}
            >
                {chat.message}
            </div>
        </div>
    );
}
