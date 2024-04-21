interface IUserEntity {
  id: string;
}

// Mocked Users Database
const users_db: IUserEntity[] = [
  {
    id: "75662389-00cd-4bf0-bc2f-04c52ef92c0f",
  },
  {
    id: "24481f00-064a-4a5b-ad1c-992ade2fbd41",
  },
  {
    id: "9c571f05-cb4f-4a3f-9f13-98b6cf135c80",
  },
];

export const getUserById = (userId: string) => {
  const user = users_db.find(({ id }) => id === userId) || null;

  return structuredClone(user);
};
