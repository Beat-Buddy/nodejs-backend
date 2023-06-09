# How to work with the backend:

### 1. One-time commands
**npm install** → Use this once after you pulled the repository for the first time (or when someone else added new packages to the project and pushed his version).  
**git update-index --skip-worktree api/access-token.js** → Optionally, prevents access-token.js from getting changed everytime you push a commit.

### 2. Commands you need all the time
**npm run start-nodemon** → Everytime you open your IDE to start the server with nodemon.
