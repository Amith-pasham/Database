const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://amithpasham:QL6SuzrHOU8MVt6O@cluster0.btwllvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const SAMPLE_QUESTIONS = [
  {
    "id": "q1",
    "text": "Which hook is used for side effects in React?",
    "options": [
      { "id": "a", "label": "useState" },
      { "id": "b", "label": "useEffect" },
      { "id": "c", "label": "useMemo" },
      { "id": "d", "label": "useRef" }
    ],
    "correctOptionId": "b"
  },
  {
    "id": "q2",
    "text": "Which method is used to create a React component from a function?",
    "options": [
      { "id": "a", "label": "function Component() { ... }" },
      { "id": "b", "label": "new Component()" },
      { "id": "c", "label": "Component.create()" },
      { "id": "d", "label": "React.component()" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "q3",
    "text": "What prop in a list helps React identify which items have changed?",
    "options": [
      { "id": "a", "label": "id" },
      { "id": "b", "label": "key" },
      { "id": "c", "label": "index" },
      { "id": "d", "label": "name" }
    ],
    "correctOptionId": "b"
  },
  {
    "id": "q4",
    "text": "Which hook returns a memoized value?",
    "options": [
      { "id": "a", "label": "useMemo" },
      { "id": "b", "label": "useCallback" },
      { "id": "c", "label": "useReducer" },
      { "id": "d", "label": "useLayoutEffect" }
    ],
    "correctOptionId": "a"
  }
];

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("SAMPLE");           
    const collection = database.collection("QUESTIONS"); 

    // Insert questions (only if collection is empty)
    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(SAMPLE_QUESTIONS);
      console.log("Inserted SAMPLE_QUESTIONS into MongoDB!");
    }

    // Retrieve all documents
    const questions = await collection.find({}).toArray();
    console.log("Retrieved questions from MongoDB:", questions);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
