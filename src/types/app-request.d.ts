import { Request } from 'express';
import { UserModel } from '../database/model/User';



declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: UserModel;
  accessToken: string;
 
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
