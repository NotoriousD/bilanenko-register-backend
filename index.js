const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const usersRouter = require('./googlesheets/googlesheets.routers');
const packagesRouter = require('./packages/packages.routes');
const ordersRouter = require('./orders/orders.routes');


const DB_URL = `mongodb+srv://dkruhlikov:DocXvH7uH1Z66MzH@bilanenko-register-back.nm5wnqq.mongodb.net/`;

const PORT = process.env.PORT || 3000;

class Server {
  constructor() {
    this.server = null;
  }

  startServer() {
    this.mongoDBConnection();
    this.initMiddlewares();
    this.initRoutes();
    this.listenServer();
  }

  async mongoDBConnection() {
    try {
      this.server = express();
      await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'bilanenko-registers'
      });
      console.log('Database connection successful');
    } catch (err) {
      console.log('Connection failed');
      process.exit(1);
    }
  }

  initRoutes() {
    this.server.use('/users', usersRouter);
    this.server.use('/packages', packagesRouter);
    this.server.use('/orders', ordersRouter);
  }

  initMiddlewares() {
    this.server.use(cors());
    this.server.use(express.static('public'));
    this.server.use(express.json());
    this.server.use(morgan('dev'));
  }

  listenServer() {
    this.server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }
}

const server = new Server();
server.startServer();