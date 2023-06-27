# How to work with the backend:

### 1. One-time commands
*If, in your terminal, you are not in the nodejs-backend/backend directory yet, you need to execute **cd backend** first, like in part 2 below.*  
**npm install** → Use this once after you pulled the repository for the first time (or when someone else added new packages to the project and pushed his version).  
**git update-index --skip-worktree backend/src/data/accessToken.js** → Optionally, prevents accessToken.js from getting changed everytime you push a commit.

### 2. Commands you need all the time
**cd backend** → Use this to switch to the backend working directory before using the next command, if your terminal says that you are in the nodejs-backend directory.  
**npm run start-nodemon** → Everytime you open your IDE to start the server with nodemon.
