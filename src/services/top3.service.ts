import db from '../config/database';
import { QueryResult } from 'pg';

const getTop3UsersByPosts = async () => {
  const result: QueryResult = await db.query(
    `SELECT U.id as user_id, U.email, U.name, COUNT(P.id) AS post_count, C.comment AS recent_comment FROM users U 
    LEFT JOIN posts P 
    ON U.id = P.user_id 
    LEFT JOIN (SELECT C.user_id, C.comment FROM comments C 
      INNER JOIN (SELECT user_id, MAX(created_at) AS max_created_at FROM comments GROUP BY user_id) CX 
      ON C.user_id = CX.user_id AND C.created_at = CX.max_created_at) C 
      ON U.id = C.user_id 
      GROUP BY U.id, U.email, U.name, C.comment 
      ORDER BY post_count DESC LIMIT 3`
  );

  return result;
}


export default getTop3UsersByPosts;