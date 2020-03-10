import Sequelize from 'sequelize';

import dataBaseConfig from '../config/database';

import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import Deliveryman from '../app/models/Deliveryman';
import Orders from '../app/models/Orders';
import File from '../app/models/File';
import DeliveryProblem from '../app/models/DeliveryProblem';

const models = [User, Recipients, Deliveryman, Orders, File, DeliveryProblem];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new DataBase();
