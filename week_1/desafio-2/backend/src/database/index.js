import Sequelize from 'sequelize';

import dataBaseConfig from '../config/database';
import User from '../app/models/User';

const models = [User];

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
