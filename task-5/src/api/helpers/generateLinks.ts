import { LINKS_PATTERNS_MAP, LINKS_USER_ID_TEMPLATE } from "../../config";

export const generateUserLink = (userId: string) =>
  LINKS_PATTERNS_MAP.USER.replace(LINKS_USER_ID_TEMPLATE, userId);

export const generateHobbiesLink = (userId: string) =>
  LINKS_PATTERNS_MAP.HOBBIES.replace(LINKS_USER_ID_TEMPLATE, userId);
