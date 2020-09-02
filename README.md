# Hack-News
Application to manage hackathons internally for a company, where users can:
 - login with their employee id or register with new employee id. Format for employee id followed: 'HN' or 'hn' followed by `-{any numeric value}`.
 - add/ create challenges.
 - can see list of challenges created by others as well.
 - can upvote challenges created by others.
 - sort challenges based on vote count and creation time in ascending and descending order.
 
## Tech stack used in the project
MERN stack application. 
 - MongoDB
 - ExpressJS
 - ReactJS
 - NodeJS
 
## External libraries used in UI are:
  - Axios
  - Ant-design
  - React-router
  - Concurrently
  
## Steps to run the project in the local:
 1. Clone the repository.
 2. Change directory to the cloned repository folder and run `npm i` to install backend dependencies.
 3. After installing backend dependencies, change directory to **client** folder.
 4. Now run `npm i` for installing frontend dependencies.
 5. After installing both frontend and backend dependencies, change directory back to where `server.js` file is located, that is our backend directory.
 6. From this directory, run `npm run dev` to run both client and server concurrently without the need to run them separately in different terminals.

### App loads [here](http://localhost:3000/)
