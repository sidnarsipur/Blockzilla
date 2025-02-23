import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import { AudioLines, Send } from 'lucide-react';
import { AddNewRule } from '@/lib/admin/data';
import ChatList from '@/components/ChatList';
import { useChatStore } from '@/store/chats';

export default function ChatPage() {
    const [inputValue, setInputValue] = useState<string>('');
    const addChat = useChatStore((store) => store.addChat);

    // Use TanStack Query's useMutation to handle the async function
    const mutation = useMutation({
        mutationFn: (query: string) => AddNewRule(query),
        onSuccess: (res) => {
            console.log(res);
            const newChat = {
                message: res.response,
                isUser: false,
                rule: res,
            };
            addChat(newChat);
        },
        onError: (error) => {
            alert(`Error adding rule: ${error.message}`);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            const newChat = {
                message: inputValue,
                isUser: true,
            };
            addChat(newChat);
            setInputValue(''); // Clear input after success
            mutation.mutate(inputValue); // Call the mutation with the input value
        }
    };

    return (
        <div className="flex grow flex-col overflow-hidden">
            <ChatList isPending={mutation.isPending} />
            <form
                onSubmit={handleSubmit}
                className="mt-auto flex w-full flex-row items-center gap-2 rounded-tl-xl rounded-tr-xl p-3"
            >
                <div className="flex grow items-center rounded-lg border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus:outline-none">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Please help me with..."
                        className="flex-1 rounded-l-lg p-3 focus:outline-none"
                        disabled={mutation.isPending}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={mutation.isPending}
                    >
                        <AudioLines />
                    </Button>
                </div>
                <Button
                    type="submit"
                    variant="outline"
                    size="round-icon"
                    className="color-whit"
                    disabled={
                        inputValue.trim().length === 0 || mutation.isPending
                    }
                >
                    <Send />
                </Button>
            </form>
        </div>
    );
}
