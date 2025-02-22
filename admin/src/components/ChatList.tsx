import { Chat } from '@/lib/types';
import ChatBubble from './ChatBubble';
import { DotLoader } from 'react-spinners';
import { useEffect, useRef, useState } from 'react';

interface Props {
    chats: Chat[];
    isPending: boolean;
}

export default function ChatList({ chats, isPending }: Props) {
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Scroll to the bottom when a new message is added
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    return (
        <div className="scrollbar-hide flex flex-col gap-5 overflow-y-scroll p-6">
            {chats.map((chat, idx) => (
                <ChatBubble key={idx} chat={chat} />
            ))}
            {isPending && (
                <div className="h-[40px] w-[40px]">
                    <DotLoader size={30} />
                </div>
            )}
            <div ref={chatEndRef} />
        </div>
    );
}
