# risevest-senior-backend-test

## Tools/Stack

- NodeJs (TypeScript & Express)
- Postgres hosted on Supabase
- Redis
- Docker


## Query Optimization Task

Optimize the following SQL query related to the designed schema

```sql
SELECT users.id, users.name, posts.title, comments.content
FROM users
LEFT JOIN posts ON users.id = posts.userId
LEFT JOIN comments ON posts.id = comments.postId
WHERE comments.createdAt = (SELECT MAX(createdAt) FROM comments WHERE postId = posts.id)
ORDER BY (SELECT COUNT(posts.id) FROM posts WHERE posts.userId = users.id) DESC
LIMIT 3;

```

- Problem: The query attempts to fetch the top 3 users with the most posts and, for each of those users, the latest comment they made. However, it's inefficient and needs optimization.

- Apart from the query not being 100% efficient, i also find it not performing what it's supposed to perform because why would i get posts title when i'm gettung users ranking by number of the posts they made according to the problem statement.

- If i am to get the top 3 users by number of posts each users posted, and their latest comment, i would do something like this

```sql
SELECT U.id as user_id, U.email, U.name, COUNT(P.id) AS post_count, C.comment AS recent_comment FROM users U 
    LEFT JOIN posts P 
    ON U.id = P.user_id 
    LEFT JOIN (select c.user_id, c.comment FROM comments C 
      INNER JOIN (select user_id, MAX(created_at) AS max_created_at FROM comments GROUP BY user_id) CX 
      ON C.user_id = CX.user_id AND C.created_at = CX.max_created_at) C 
      ON U.id = C.user_id 
      GROUP BY U.id, U.email, U.name, C.comment 
      ORDER BY post_count desc limit 3
```