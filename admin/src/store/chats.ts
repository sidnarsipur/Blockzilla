import { Chat } from '@/lib/types';
import { create } from 'zustand';

interface ChatStore {
    chats: Chat[];
    addChat: (chat: Chat) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    chats: [],
    addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
}));
