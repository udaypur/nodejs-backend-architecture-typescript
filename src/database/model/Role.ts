import { DataTypes, Model, Optional, Sequelize, UUIDV4} from 'sequelize';
import { UserModel } from './User';

export const enum RoleCode {
  LEARNER = 'LEARNER',
  WRITER = 'WRITER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN',
}

export interface Role{
  roleId:string;
  roleCode: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  }

export type RoleCreationAttributes = Optional<Role, 'roleId'>;

export class RoleModel extends Model<Role, RoleCreationAttributes> implements Role {
  public roleId!: string;
  public roleCode!: string;
  public status!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof RoleModel {
  RoleModel.init(
    {
    roleId:{
        type:DataTypes.UUID, 
        primaryKey:true, 
        defaultValue:UUIDV4
    },
    roleCode: {
        type: DataTypes.ENUM(RoleCode.LEARNER, RoleCode.WRITER, RoleCode.EDITOR, RoleCode.ADMIN),
        allowNull:false,
        defaultValue:RoleCode.LEARNER,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false 
    },   
    createdAt:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    } 
    },
    {
    sequelize,
    tableName:"RoleNode"
    }
    );

    return RoleModel;

}






