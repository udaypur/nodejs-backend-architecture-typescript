import {UserModel}  from '../model/User';
import {RoleModel}  from '../model/Role';
import { InternalError } from '../../core/ApiError';

// import KeystoreRepo from './KeystoreRepo';
// import Keystore from '../model/Keystore';

export default class UserRepo {
  // contains critical information of the user
  public static findById(id:any): Promise<UserModel | null>  {
    return UserModel.findOne({ where:{userId:id,status:true}})
    

  }

  public static findByEmail(email: string):Promise<UserModel | null>  {
    return UserModel.findOne({ where:{email: email, status: true }})
  }

  public static findProfileById(id: any):Promise<UserModel | null> {
    return UserModel.findOne({ where :{userId: id, status: true} })     
  }

  public static findPublicProfileById(id:any):Promise<UserModel | null> {
    return UserModel.findOne({ where:{userId: id, status: true }}) 
  }

  public static async create(
    user: UserModel,
    accessTokenKey: string,
    refreshTokenKey: string,
    roleId: string,
  ): Promise<{ user: UserModel }> {
    const now = new Date();

    const role = await RoleModel.findOne({ where:{ roleId:roleId}})
      // .select('+email +password')
      // .lean<Role>()
      // .exec();
    if (!role) throw new InternalError('Role must be defined');
    user.roleId= role.roleId;
    user.createdAt = user.updatedAt = now;
    const createdUser = await UserModel.create(user);
    // const keystore = await KeystoreRepo.create(createdUser._id, accessTokenKey, refreshTokenKey);
    return { user: createdUser};
  }

  // public static async update(
  //   user: UserModel,
  //   accessTokenKey: string,
  //   refreshTokenKey: string,
  // ): Promise<{ user: UserModel}> 
  // {
  //   user.updatedAt = new Date();
  //   await UserModel.update({where:{

  //   }})
    
  //   const keystore = await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);
  //   return { user: user, keystore: keystore };
  // }

//   public static updateInfo(user: User){
//     // user.updatedAt = new Date();
//     // return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
//     //   .lean()
//     //   .exec();
//   // }
 }

