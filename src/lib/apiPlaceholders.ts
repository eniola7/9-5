import { getMongoDb, mongoCollections } from './mongodb';
import { JournalEntry, User, UserProfileModel } from '../types/models';

// Expo does not provide server API routes in this project. These functions document
// the intended backend contract and can move into Next.js, Express, serverless
// functions, or an Expo Router API layer later.

export const apiContract = {
  me: 'GET /api/me',
  createProfile: 'POST /api/profile',
  updateProfile: 'PATCH /api/profile',
  getProfile: 'GET /api/profile',
  createJournal: 'POST /api/journal',
  getJournal: 'GET /api/journal',
  createReview: 'POST /api/reviews',
  getReviews: 'GET /api/reviews',
} as const;

export const createUserPlaceholder = async (user: User) => {
  const db = await getMongoDb();
  // TODO: Replace `unknown` database typing with the official MongoDB driver types
  // when backend dependencies are installed in a server runtime.
  return { db, collection: mongoCollections.users, payload: user };
};

export const saveProfilePlaceholder = async (profile: UserProfileModel) => {
  const db = await getMongoDb();
  return { db, collection: mongoCollections.profiles, payload: profile };
};

export const createJournalPlaceholder = async (entry: JournalEntry) => {
  const db = await getMongoDb();
  return { db, collection: mongoCollections.journalEntries, payload: entry };
};
