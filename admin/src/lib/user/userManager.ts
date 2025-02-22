import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../util/model';

const db = getFirestore();

export async function createUser() {
    try {
        const { user } = useAuth0();

        if (user === null) {
            console.error('User not logged in');
            return;
        }

        const userRef = doc(db, 'users', user?.email ? user.email : 'null');
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            return userSnapshot.data();
        }

        const userRecord = {
            email: user?.email,
            name: user?.name,
        };

        await setDoc(userRef, userRecord);

        return userRecord;
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

export async function getCurrentUserSnapshot() {
    const { user } = useAuth0();

    if (!user) {
        throw new Error('No user found');
    }

    const userRef = doc(db, 'users', user?.email || 'null');
    const userSnapshot = await getDoc(userRef);

    return userSnapshot.exists() ? userSnapshot.data() : null;
}

export async function getCurrentUser() {
    const userSnapshot = await getCurrentUserSnapshot();

    if (!userSnapshot) {
        throw new Error('User not found');
    }

    const useRet = {
        id: userSnapshot.id,
        ...userSnapshot.data(),
    } as User;

    return useRet;
}
