<p align='center'><img src='https://user-images.githubusercontent.com/80096027/216803753-3d35ba81-c629-46d3-80f8-7d194cce2773.png' width="150" ></p>

# Type R

## Project Structure

- [Frontend - React.js](https://github.com/blackchapel/typer/tree/frontend)
- [Backend - Express.js](https://github.com/blackchapel/typer/tree/backend)

## Hosted Links
- [RESTful API](https://typer-production.up.railway.app/api)
- [API Documentation](https://typer-production.up.railway.app/api/docs)

## Technologies Used
- React.JS
- Express.JS
- Node.JS
- MongoDB
- CORs
- NPM 
- Tailwind CSS
- Axios

All the technologies used are open source

# Getting Started

## Prerequisites
- Install Node JS - Refer to https://nodejs.org/en/ to install nodejs

## Cloning the repository locally
- Clone the project on localhost
```bash
git clone https://github.com/blackchapel/typeR.git
```
- Move to the project directory
```bash
cd .\typeR\
```
- Install required npm packages
```bash
npm install
```
## Connecting to the Database
- Spin up your cluster in MongoDB and also create a `.env` file
- Replace your connection with URI in `.env`
- If you face any problems, refer to the [MongoDB](https://www.mongodb.com/blog/postquick-start-nodejs-mongodb--how-to-get-connected-to-your-database) website.

## Connecting to the Database if you haven't used MongoDB Atlas before
Install the MongoDB Node.js Driver with the following command:
```bash
npm install mongodb
```

Set up a [MongoDB Atlas Database](https://www.youtube.com/watch?v=rPqRyYJmx2g) by following this short MongoDB setup video till the *3:20* mark. Stop after that mark!

On your Cluster home page, select CONNECT > Connect your application. 
1. Select Node.js in the drop down for your driver, and select the latest version. 
2. Then, copy the connecting string (URI).
3. Paste this string as the value of mongoURI inside `.env` of this project.

Replace the `<password>` section of the string with your Database Access password. Your server should now successfuly connect to MongoDB!

## Running the website locally
- Execute the command 
```bash
npm start
```
- Nodemon will automatically run node server.js for you
- If everything executed properly, you will get a log `Connected at 3001` on the console.
- Hurray! The web would now be up and running on `http://localhost:3001/`

## Contributers

- [Devang S - Frontend / ML](https://github.com/Devang-Shah-49)
- [Kunal C - App / Backend](https://github.com/blackchapel)
- [Prateek R - Frontend / ML](https://github.com/PrateekR16)
- [Vidhita P - Backend](https://github.com/vidhitapai)
