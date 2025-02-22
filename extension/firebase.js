import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

const firebaseConfig = {
};

const app = initializeApp(firebaseConfig);

async function getBlockedWords(userId) {
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
