import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Add content to the database
export const putDb = async (content) => {
  try {
    const db = await openDB();
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    await store.put({id: 1, value: content});
    await tx.done;
    console.log("Content added to the database:", content);
  } catch (error) {
    console.error("Error adding content to the database:", error);
  }
};

// Get all content from the database
export const getDb = async () => {console.log('GET from the database');
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readonly');
const store = tx.objectStore('jate');
const request = store.get(1);
const result = await request;
result
  ? console.log('🚀 - data retrieved from the database', result.value)
  : console.log('🚀 - data not found in the database');
// Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
return result?.value;
};

// Initialize the database when the module is imported
initdb();
