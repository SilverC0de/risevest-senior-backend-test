import db from '../config/database';
import { QueryResult } from 'pg';

 const createUser = async (email: string, hashedPassword: string, name: string): Promise<QueryResult> => {
  const result: QueryResult = await db.query(
    'INSERT INTO users (email, password, name) VALUES ($1, $2, $3)',
    [email, hashedPassword, name]
  );

  return result;
};

const listUser = async () => {
  const result: QueryResult = await db.query(`SELECT id, email, password, name, created_at FROM users LIMIT 100`, null);

  return result;
}


const getUser = async (email : string) => {
  const result: QueryResult = await db.query(
    `SELECT id, email, password, name, created_at FROM users WHERE email = $1 LIMIT 1`,
    [email]
  );

  return result;
}

export {
  createUser,
  listUser,
  getUser
};