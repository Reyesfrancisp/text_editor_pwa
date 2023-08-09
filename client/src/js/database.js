import { openDB } from "idb";

const DB_NAME = "jate";
const DB_NUM = 1;

// Initialize the database
const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add content to the database
export const putDb = async (content) => {
  try {
    const db = await openDB(DB_NAME, DB_NUM);
    const tx = db.transaction(DB_NAME, "readwrite");
    const store = tx.objectStore(DB_NAME);
    await store.put({ value: content });
    await tx.done;
    console.log("Content added to the database:", content);
  } catch (error) {
    console.error("Error adding content to the database:", error);
  }
};

// Get content from the database
export const getDb = async () => {
  try {
    console.log("GET route from the database");
    const db = await openDB(DB_NAME, DB_NUM);
    const tx = db.transaction(DB_NAME, "readonly");
    const store = tx.objectStore(DB_NAME);
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
initdb();
