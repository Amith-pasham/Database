const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

async function initMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    const db = client.db("SAMPLE");
    const collection = db.collection("QUESTIONS");

    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(SAMPLE_QUESTIONS);
      console.log("Inserted SAMPLE_QUESTIONS into MongoDB!");
    }

    return collection;
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
}

app.get('/questions', async (req, res) => {
  try {
    const collection = await initMongo();
    const questions = await collection.find({}).toArray();
    res.json(questions);
  } catch (err) {
    res.status(500).send("Error retrieving questions");
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

