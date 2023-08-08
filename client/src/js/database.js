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
    const db = await initdb();
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    await store.put(content);
    await tx.done;
    console.log("Content added to the database:", content);
  } catch (error) {
    console.error("Error adding content to the database:", error);
  }
};

// Get all content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const allContent = await store.getAll();
    await tx.done;
    console.log("All content from the database:", allContent);
    return allContent;
  } catch (error) {
    console.error("Error getting content from the database:", error);
    return [];
  }
};

// Initialize the database when the module is imported
initdb();
