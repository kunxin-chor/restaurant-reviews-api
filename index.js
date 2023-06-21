const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

let reviewsCollection;

(async () => {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db();
    reviewsCollection = db.collection('reviews');

    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  } catch (err) {
    console.error(err);
  }
})();

app.get('/reviews', async (req, res) => {
  try {
    const reviews = await reviewsCollection.find().toArray();
    res.send(reviews);
  } catch (err) {
    res.status(500).send('Error fetching reviews');
  }
});

app.post('/reviews', async (req, res) => {
  const { restaurant, review, rating } = req.body;

  // Simple validation
  if (typeof restaurant !== 'string' || typeof review !== 'string' || typeof rating !== 'number') {
    return res.status(400).send('Invalid payload');
  }

  try {
    const newReview = { restaurant, review, rating };
    const result = await reviewsCollection.insertOne(newReview);
    res.send(result);
  } catch (err) {
    res.status(500).send('Error inserting review');
  }
});

app.put('/reviews/:id', async (req, res) => {
  const { restaurant, review, rating } = req.body;

  // Simple validation
  if ( typeof restaurant !== 'string' || typeof review !== 'string' || typeof rating !== 'number') {
    return res.status(400).send('Invalid payload');
  }

  try {
    const result = await reviewsCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { restaurant, review, rating } },
      { returnOriginal: false }
    );
    res.send(result.value);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating review');
  }
});

app.delete('/reviews/:id', async (req, res) => { 
 try {
    const result = await reviewsCollection.findOneAndDelete({ _id: new ObjectId(req.params.id) });
    res.send(result.value);
  } catch (err) {
    res.status(500).send('Error deleting review');
  }
});
