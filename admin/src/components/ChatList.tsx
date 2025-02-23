import { Chat } from '@/lib/types';
import ChatBubble from './ChatBubble';
import { DotLoader } from 'react-spinners';
import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '@/store/chats';
import IntroCard from './IntroCard';

interface Props {
    isPending: boolean;
}

export default function ChatList({ isPending }: Props) {
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const chats = useChatStore((store) => store.chats);

    useEffect(() => {
        // Scroll to the bottom when a new message is added
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    if (chats.length === 0) return <IntroCard />;

    return (
        <div className="scrollbar-hide flex flex-col gap-6 overflow-y-scroll p-6">
            {chats.map((chat, idx) => (
                <ChatBubble key={idx} chat={chat} />
            ))}
            {isPending && (
                <div className="h-[40px] w-[40px]">
                    <DotLoader size={30} color="#33ae5a" />
                </div>
            )}
            <div ref={chatEndRef} />
        </div>
    );
}
