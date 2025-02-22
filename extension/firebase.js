import 'dotenv/config'; // For Node-like environments; adapt if needed
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export async function getBlockedWords(userId) {
    if (!userId) {
        throw new Error('User ID is required');
    }

    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, 'rules'));

    const words = querySnapshot.docs
        .filter(doc => doc.data().userID === userId)
        .flatMap(doc => doc.data().blockedWords || []);

    return words;
}
