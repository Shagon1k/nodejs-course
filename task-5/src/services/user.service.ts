import { randomUUID } from "crypto";
import { users_db } from "../db-mock/db";
import omitFields from "./helpers/omitFields";

import { IUserDataRequest, IUser } from "../types";

const findUserIndexById = (userId?: string) =>
  users_db.findIndex(({ id }) => id === userId);

export const createUser = (userDataRequest: IUserDataRequest) => {
  const newUser: IUser = {
    id: randomUUID(),
    hobbies: [],
    name: userDataRequest.name,
    email: userDataRequest.email,
  };

  users_db.push(newUser);

  return omitFields(newUser, ["hobbies"]);
};

export const findUser = (userId?: string) => {
  const userDbIndex = findUserIndexById(userId);

  return userDbIndex !== -1
    ? omitFields(users_db[userDbIndex], ["hobbies"])
    : null;
};

export const findAllUsers = () => {
  return users_db.map((user) => omitFields(user, ["hobbies"]));
};

export const deleteUser = (userId?: string) => {
  const userDbIndex = findUserIndexById(userId);

  if (userDbIndex !== -1) {
    users_db.splice(userDbIndex, 1);

    return true;
  }

  return false;
};

export const getUserHobbies = (userId?: string) => {
  const userDbIndex = findUserIndexById(userId);

  if (userDbIndex !== -1) {
    return [...users_db[userDbIndex].hobbies];
  }

  return null;
};

export const updateUserHobbies = (userId: string, newHobbies: string[]) => {
  const userDbIndex = findUserIndexById(userId);

  if (userDbIndex !== -1) {
    let updatedHobbiesSet = new Set([
      ...users_db[userDbIndex].hobbies,
      ...newHobbies,
    ]);
    users_db[userDbIndex].hobbies = [...updatedHobbiesSet];

    return true;
  }

  return false;
};
