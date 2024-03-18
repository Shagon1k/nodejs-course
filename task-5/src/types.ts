import { IncomingMessage, ServerResponse } from "http";

export interface IApiHandler {
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>): void;
}

export type IHobbiesDataRequest = string[];

export interface IUserDataRequest {
  name: string;
  email: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  hobbies: string[];
}
