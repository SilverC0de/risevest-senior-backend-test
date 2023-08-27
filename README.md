# risevest-senior-backend-test

## Tools/Stack

- NodeJs (TypeScript & Express)
- Postgres hosted on Supabase
- Redis
- Docker


## Query Optimization Task

The query below attempts to fetch the top 3 users with the most posts and, for each of those users, the latest comment they made. However, it's inefficient and needs optimization.

```sql
SELECT users.id, users.name, posts.title, comments.content
FROM users
LEFT JOIN posts ON users.id = posts.userId
LEFT JOIN comments ON posts.id = comments.postId
WHERE comments.createdAt = (SELECT MAX(createdAt) FROM comments WHERE postId = posts.id)
ORDER BY (SELECT COUNT(posts.id) FROM posts WHERE posts.userId = users.id) DESC
LIMIT 3;

```
- Apart from the query not being 100% efficient, i also find it not performing what it's supposed to perform because why would i get post's title when i'm getting users ranking by total number of the posts they made according to the problem statement.

- If i am to get the top 3 users by number of posts each users posted, and their latest comment, i would do something like this

```sql
SELECT U.id as user_id, U.name, COUNT(P.id) AS post_count, C.content AS recent_comment 
FROM users U 
LEFT JOIN posts P 
ON U.id = P.userId 
LEFT JOIN (SELECT C.userId, C.content FROM comments C 
INNER JOIN (SELECT userId, MAX(createdAt) AS max_created_at FROM comments GROUP BY userId) CX 
ON C.userId = CX.userId AND C.createdAt = CX.max_created_at) C 
ON U.id = C.userId 
GROUP BY U.id, U.name, C.content 
ORDER BY post_count DESC LIMIT 3
```

## Postman documentation
https://www.postman.com/justsiilver/workspace/rise/collection/10050365-09f3d4fa-775b-4217-b962-8d81cec632b7?action=share&creator=10050365