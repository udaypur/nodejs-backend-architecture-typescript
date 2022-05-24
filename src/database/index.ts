import { Sequelize } from 'sequelize';
import { db } from '../config';
import RoleModel from './model/Role';
import UserModel from './model/User';


export const sequelize = new Sequelize(`${db.name}`, `${db.user}`, `${db.password}`, {
  host: `${db.host}`,
  dialect: 'postgres',
});

export const dbUser = {
  User: UserModel(sequelize),
  sequelize,
  Sequelize
}

export const dbRole = {
  Role: RoleModel(sequelize),
  sequelize,
  Sequelize
}

sequelize.authenticate().then(async () => {
  console.log('Connection has been established successfully.');  
  await dbRole.Role.sync();
}).catch((err: any) => {
  console.error('Unable to connect to the database:', err);
});


sequelize.authenticate().then(async () => {
  console.log('Connection has been established successfully.');  
  await dbUser.User.sync();
}).catch((err: any) => {
  console.error('Unable to connect to the database:', err);
});




