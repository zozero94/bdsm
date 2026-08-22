import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  Firestore
} from 'firebase/firestore';
import { RoomData, RoomMember } from '@/types/test';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'zozero94-462fc.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'zozero94-462fc',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'zozero94-462fc.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '813038880669',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    '1:813038880669:web:66d414916aa116afe7d174'
};

const isFirebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== 'mock-project-id'
);

let db: Firestore | null = null;
if (typeof window !== 'undefined' && isFirebaseConfigured) {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
}

// LocalStorage Mock Helpers for Room System when Firebase is not configured yet
const LOCAL_ROOMS_KEY = 'bdsm_local_rooms_db';

function getLocalRooms(): Record<string, RoomData> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LOCAL_ROOMS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalRooms(rooms: Record<string, RoomData>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_ROOMS_KEY, JSON.stringify(rooms));
  } catch (e) {
    console.error('Failed to save local room', e);
  }
}

// 방 생성
export async function createRoom(roomName: string, hostMember: RoomMember): Promise<string> {
  const roomId = Math.random().toString(36).substring(2, 8).toLowerCase();
  const roomData: RoomData = {
    id: roomId,
    name: roomName || '우리 모임 케미 맵',
    createdAt: Date.now(),
    members: [hostMember]
  };

  if (db) {
    await setDoc(doc(db, 'rooms', roomId), roomData);
  } else {
    const rooms = getLocalRooms();
    rooms[roomId] = roomData;
    saveLocalRooms(rooms);
  }

  return roomId;
}

// 방에 멤버 멱등성(Idempotent) 추가 / 업데이트
export async function joinRoom(roomId: string, member: RoomMember): Promise<boolean> {
  try {
    if (db) {
      const roomRef = doc(db, 'rooms', roomId);
      const snapshot = await getDoc(roomRef);
      if (!snapshot.exists()) return false;

      const roomData = snapshot.data() as RoomData;
      const members = roomData.members || [];
      const existingIdx = members.findIndex((m) => m.id === member.id);

      let newMembers: RoomMember[];
      if (existingIdx >= 0) {
        newMembers = [...members];
        newMembers[existingIdx] = member; // Update existing
      } else {
        newMembers = [...members, member]; // Append new
      }

      await updateDoc(roomRef, { members: newMembers });
      return true;
    } else {
      const rooms = getLocalRooms();
      if (rooms[roomId]) {
        const existingIdx = rooms[roomId].members.findIndex((m) => m.id === member.id);
        if (existingIdx >= 0) {
          rooms[roomId].members[existingIdx] = member;
        } else {
          rooms[roomId].members.push(member);
        }
        saveLocalRooms(rooms);
        window.dispatchEvent(new Event('local_room_updated'));
        return true;
      }
      return false;
    }
  } catch (e) {
    console.error('Failed to join room', e);
    return false;
  }
}

// 방 실시간 구독 (onError 핸들러 추가로 무한 로딩 방지)
export function subscribeRoom(
  roomId: string,
  callback: (room: RoomData | null) => void
): () => void {
  if (db) {
    const unsubscribe = onSnapshot(
      doc(db, 'rooms', roomId),
      (snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.data() as RoomData);
        } else {
          callback(null);
        }
      },
      (error) => {
        console.error('Firestore subscription error:', error);
        callback(null);
      }
    );
    return unsubscribe;
  } else {
    const emit = () => {
      const rooms = getLocalRooms();
      callback(rooms[roomId] || null);
    };
    emit();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_ROOMS_KEY) emit();
    };
    const handleLocalUpdate = () => emit();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('local_room_updated', handleLocalUpdate);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('local_room_updated', handleLocalUpdate);
    };
  }
}
