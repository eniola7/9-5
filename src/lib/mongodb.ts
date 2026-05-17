type MongoClientLike = {
  connect: () => Promise<MongoClientLike>;
  db: (name: string) => unknown;
};

type MongoModule = {
  MongoClient: new (uri: string) => MongoClientLike;
};

type CachedMongo = {
  client?: MongoClientLike;
  promise?: Promise<MongoClientLike>;
};

const globalWithMongo = globalThis as typeof globalThis & {
  __loloMongo?: CachedMongo;
  process?: { env?: Record<string, string | undefined> };
};

const getEnv = (key: string) => globalWithMongo.process?.env?.[key];

const loadMongoModule = async (): Promise<MongoModule> => {
  // Keep the Expo client bundle free of a hard MongoDB dependency. This helper is
  // intended for future server/API usage where the `mongodb` package is installed.
  const dynamicImport = new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<MongoModule>;
  return dynamicImport('mongodb');
};

export const getMongoClient = async () => {
  const uri = getEnv('MONGODB_URI');
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to your server environment before using MongoDB helpers.');
  }

  if (!globalWithMongo.__loloMongo) {
    globalWithMongo.__loloMongo = {};
  }

  if (globalWithMongo.__loloMongo.client) {
    return globalWithMongo.__loloMongo.client;
  }

  if (!globalWithMongo.__loloMongo.promise) {
    const { MongoClient } = await loadMongoModule();
    globalWithMongo.__loloMongo.promise = new MongoClient(uri).connect();
  }

  globalWithMongo.__loloMongo.client = await globalWithMongo.__loloMongo.promise;
  return globalWithMongo.__loloMongo.client;
};

export const getMongoDb = async () => {
  const dbName = getEnv('MONGODB_DB_NAME') ?? 'lolo';
  const client = await getMongoClient();
  return client.db(dbName);
};

export const mongoCollections = {
  users: 'users',
  profiles: 'profiles',
  journalEntries: 'journal_entries',
  productReviews: 'product_reviews',
  financialSnapshots: 'financial_snapshots',
  userPreferences: 'user_preferences',
} as const;
