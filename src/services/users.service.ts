import db from '../config/database';
import { QueryResult } from 'pg';

export const createUser = async (email: string, hashedPassword: string, name: string): Promise<QueryResult> => {
  const result: QueryResult = await db.query(
    'INSERT INTO Users (email, password, name) VALUES ($1, $2, $3)',
    [email, hashedPassword, name]
  );

  return result;
};

export default createUser;