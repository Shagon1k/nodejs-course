import { USER_ROLES } from "./repositories/entities/user.entity";

export interface ICurrentUser {
  user_id: string;
  email: string;
  role: USER_ROLES;
}
