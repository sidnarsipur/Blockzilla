import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

import OpenAI from 'openai';

const firebaseConfig = {
    apiKey: 'AIzaSyCX5RS1ne6-XDekEqWvP_M764TEnSZih8Q',
    authDomain: 'aiblock-d6c7a.firebaseapp.com',
    projectId: 'aiblock-d6c7a',
    storageBucket: 'aiblock-d6c7a.firebasestorage.app',
    messagingSenderId: '407363370051',
    appId: '1:407363370051:web:4fde3260aa7c5fc33fe8f6',
    measurementId: 'G-KPC8RTS8Q0',
};

initializeApp(firebaseConfig);

const openAIKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: openAIKey, dangerouslyAllowBrowser: true });

export { openai };
