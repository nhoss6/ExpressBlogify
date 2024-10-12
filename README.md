# Blogify API Routes

Base URL: http://localhost:3000

## User Routes

1. Register a new user
   - Method: POST
   - Route: /users/register
   - Body:
     ```json
     {
       "username": "newuser",
       "email": "newuser@example.com",
       "password": "password123"
     }
     ```

2. Login
   - Method: POST
   - Route: /users/login
   - Body:
     ```json
     {
       "email": "newuser@example.com",
       "password": "password123"
     }
     ```

3. Get a user's profile
   - Method: GET
   - Route: /users/:id

4. Update a user's profile
   - Method: PUT
   - Route: /users/:id
   - Body:
     ```json
     {
       "username": "updatedusername",
       "email": "updatedemail@example.com"
     }
     ```

5. Delete a user (soft delete)
   - Method: DELETE
   - Route: /users/:id

## Post Routes

1. Create a new post
   - Method: POST
   - Route: /posts
   - Body:
     ```json
     {
       "title": "My First Blog Post",
       "content": "This is the content of my first blog post.",
       "tags": ["blog", "first post"]
     }
     ```

2. Get all posts
   - Method: GET
   - Route: /posts
   - Query Parameters (optional):
     - tag: Filter by tag
     - author: Filter by author ID
     - date: Filter by date (posts created on or after this date)

3. Get a specific post
   - Method: GET
   - Route: /posts/:id

4. Update a post
   - Method: PUT
   - Route: /posts/:id
   - Body:
     ```json
     {
       "title": "Updated Blog Post Title",
       "content": "This is the updated content of my blog post.",
       "tags": ["updated", "blog"]
     }
     ```

5. Delete a post (soft delete)
   - Method: DELETE
   - Route: /posts/:id

## Comment Routes

1. Add a comment to a post
   - Method: POST
   - Route: /comments/:postId
   - Body:
     ```json
     {
       "text": "This is a great post!"
     }
     ```

2. Update a comment
   - Method: PUT
   - Route: /comments/:id
   - Body:
     ```json
     {
       "text": "This is an updated comment."
     }
     ```

3. Delete a comment
   - Method: DELETE
   - Route: /comments/:id

## Like Routes

1. Like a post
   - Method: POST
   - Route: /likes/:postId

2. Unlike a post
   - Method: DELETE
   - Route: /likes/:postId

Note: For all routes except user registration and login, you need to include an Authorization header with a valid JWT token:
```
Authorization: Bearer your_jwt_token_here
```
