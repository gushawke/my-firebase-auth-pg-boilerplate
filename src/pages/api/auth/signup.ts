// pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import pool from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Insert user into PostgreSQL
    const client = await pool.connect();
    const queryText = 'INSERT INTO users(id, email) VALUES($1, $2)';
    await client.query(queryText, [user.uid, email]);
    client.release();

    res.status(200).json({ userId: user.uid });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
