import Sequelize from 'sequelize';

import dataBaseConfig from '../config/database';
import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import Deliveryman from '../app/models/Deliveryman';

const models = [User, Recipients, Deliveryman];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.conection = new Sequelize(dataBaseConfig);

    models.map(model => model.init(this.conection));
  }
}

export default new DataBase();
