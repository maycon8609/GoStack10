import Sequelize from 'sequelize';

import dataBaseConfig from '../config/database';

import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import Deliveryman from '../app/models/Deliveryman';
import Orders from '../app/models/Orders';
import File from '../app/models/File';

const models = [User, Recipients, Deliveryman, File, Orders];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.conection = new Sequelize(dataBaseConfig);

    models
      .map(model => model.init(this.conection))
      .map(model => model.associate && model.associate(this.conection.models));
  }
}

export default new DataBase();
