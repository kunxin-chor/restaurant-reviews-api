const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let reviewsCollection;

(async () => {
  await client.connect();
  console.log('Connected successfully to MongoDB');
  const db = client.db();
  reviewsCollection = db.collection('reviews');

  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
})();

app.get('/reviews', async (req, res) => {
  const reviews = await reviewsCollection.find().toArray();
  res.send(reviews);
});

app.post('/reviews', async (req, res) => {
  const { restaurant, review, rating } = req.body;

  // Simple validation
  if (typeof restaurant !== 'string' || typeof review !== 'string' || typeof rating !== 'number') {
    return res.status(400).send('Invalid payload');
  }

  const newReview = { restaurant, review, rating };
  const result = await reviewsCollection.insertOne(newReview);
  res.send(result.ops[0]);
});

app.put('/reviews/:id', async (req, res) => {
  const { restaurant, review, rating } = req.body;

  // Simple validation
  if (typeof restaurant !== 'string' || typeof review !== 'string' || typeof rating !== 'number') {
    return res.status(400).send('Invalid payload');
  }

  const result = await reviewsCollection.findOneAndUpdate(
    { _id: new ObjectID(req.params.id) },
    { $set: { restaurant, review, rating } },
    { returnOriginal: false }
  );
  res.send(result.value);
});

app.delete('/reviews/:id', async (req, res) => {
  const result = await reviewsCollection.findOneAndDelete({ _id: new ObjectID(req.params.id) });
  res.send(result.value);
});
