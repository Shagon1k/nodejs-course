import { IncomingMessage, ServerResponse } from "http";

export interface IApiHandler {
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>): void;
}

export type IHobbiesDataRequest = string[];

export interface IUserDataRequest {
  name: string;
  email: string;
}

export interface IUser extends IUserDataRequest {
  id: string;
  hobbies: string[];
}
