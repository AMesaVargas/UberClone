import { collection,doc,addDoc,updateDoc,deleteDoc,orderBy,query,where,serverTimestamp,writeBatch,
 getDocs,getDoc,setDoc} from 'firebase/firestore';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,} from 'firebase/auth';
import{db,auth} from '../config/firebase';

const usersRef = collection(db, 'users');
const tripsRef = collection(db, 'trips');
const paymentsRef = collection(db, 'payments');

export const registerFirebase = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, error: error.message };
  }
};

export const loginFirebase = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: error.message };
  }
};

export const logoutFirebase = async  () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false, error: error.message };
  }
};

export const saveUser = async (uid, userData) => {
  try {
    await setDoc(doc(usersRef, uid), {
      ...userData,
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving user:', error);
    return { success: false, error: error.message };
  }
};

export const getUser = async (uid) => {
  try {
    const docSnap = await getDoc(doc(usersRef, uid));
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }
    return { success: false, error: 'User not found' };
  } catch (error) {
    console.error('Error getting user:', error);
    return { success: false, error: error.message };
  }
};

export const updateUser = async (uid, userData) => {
  try {
    await updateDoc(doc(usersRef, uid), {
      ...userData,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: error.message };
  }
};

export const saveTrip = async (uid, tripData) => {
  try {
    const docRef = await addDoc(tripsRef, {
      ...tripData,
      userId: uid,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return { success: true, tripId: docRef.id };
  } catch (error) {
    console.error('Error saving trip:', error);
    return { success: false, error: error.message };
  }
};

export const getUserTrips = async (uid) => {
  try {
    const q = query(
      tripsRef,
      where('userId', '==', uid),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const trips = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return { success: true, trips };
  } catch (error) {
    console.error('Error getting trips:', error);
    return { success: false, error: error.message };
  }
};

export const getTripsByStatus = async (uid, status) => {
  try {
    const q = query(
      tripsRef,
      where('userId', '==', uid),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const trips = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return { success: true, trips };
  } catch (error) {
    console.error('Error getting trips by status:', error);
    return { success: false, error: error.message };
  }
};

export const updateTripStatus = async (tripId, status) => {
  try {
    await updateDoc(doc(tripsRef, tripId), {
      status,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating trip status:', error);
    return { success: false, error: error.message };
  }
};

export const savePayment = async (uid, paymentData) => {
  try {
    const docRef = await addDoc(paymentsRef, {
      ...paymentData,
      userId: uid,
      status: 'completed',
      createdAt: serverTimestamp(),
    });
    return { success: true, paymentId: docRef.id };
  } catch (error) {
    console.error('Error saving payment:', error);
    return { success: false, error: error.message };
  }
};

export const getUserPayments = async (uid) => {
  try {
    const q = query(
      paymentsRef,
      where('userId', '==', uid),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const payments = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return { success: true, payments };
  } catch (error) {
    console.error('Error getting payments:', error);
    return { success: false, error: error.message };
  }
};