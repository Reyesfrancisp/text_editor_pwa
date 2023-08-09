import { openDB } from "idb";

const DB_NAME = "jate";
const DB_STORE_NAME = "content";

const DB_KEY = 1;

// Initialize the database
const initDB = async () => {
  try {
    const db = await openDB(DB_NAME, DB_KEY, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
          const store = db.createObjectStore(DB_STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
          console.log(`Object store '${DB_STORE_NAME}' created`);
        }
      },
    });
    console.log("Database initialized");
    return db;
  } catch (error) {
    console.error("Error initializing the database:", error);
    return null;
  }
};

// Add content to the database
export const putDb = async (content) => {
  try {
    const db = await initDB();
    if (!db) return;

    const tx = db.transaction(DB_STORE_NAME, "readwrite");
    const store = tx.objectStore(DB_STORE_NAME);
    await store.put({ id: DB_KEY, value: content });
    await tx.complete;
    console.log("Content added to the database:", content);
  } catch (error) {
    console.error("Error adding content to the database:", error);
  }
};

// Get content from the database
export const getDb = async () => {
  try {
    const db = await initDB();
    if (!db) return null;

    console.log("GET route from the database");
    const tx = db.transaction(DB_STORE_NAME, "readonly");
    const store = tx.objectStore(DB_STORE_NAME);
    const request = store.get(DB_NUM);
    const result = await request;
    if (result) {
      console.log("Data retrieved from the database:", result.value);
      return result.value;
    } else {
      console.log("Data not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting data from the database:", error);
    return null;
  }
};

// Initialize the database when the module is imported
initDB();