import db from '../config/database';
import { QueryResult } from 'pg';

const getPost = async (post_id : string | undefined) => {
  const result: QueryResult = await db.query(
    `SELECT id, user_id, title, content, created_at FROM posts WHERE id = $1 LIMIT 1`, 
    [post_id]
  );

  return result;
}


const addPost = async (user_id : string | undefined, title: string, content: string): Promise<QueryResult> => {
  const result: QueryResult = await db.query(
    'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)',
    [user_id, title, content]
  );

  return result;
};

const listUserPosts = async (user_id : string | undefined) => {
  const result: QueryResult = await db.query(
    `SELECT id, user_id, title, content, created_at FROM posts WHERE user_id = $1 ORDER BY id DESC LIMIT 50`, 
    [user_id]
  );

  return result;
}


const postComment = async (user_id : string | undefined, post_id: string, comment: string): Promise<QueryResult> => {
  const result: QueryResult = await db.query(
    'INSERT INTO comments (user_id, post_id, comment) VALUES ($1, $2, $3)',
    [user_id, post_id, comment]
  );

  return result;
};

export {
  getPost,
  addPost,
  listUserPosts,
  postComment
};