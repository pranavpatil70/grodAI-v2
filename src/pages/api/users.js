import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('your-database-name');
    
    const { uid, email, name, photoURL } = req.body;
    
    await db.collection('users').updateOne(
      { uid },
      { 
        $set: { 
          email,
          name,
          photoURL,
          updatedAt: new Date()
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );

    await client.close();
    res.status(200).json({ message: 'User data stored successfully' });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Error storing user data' });
  }
} 