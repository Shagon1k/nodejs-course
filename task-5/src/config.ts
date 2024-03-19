export const ROUTES_REGEXP_MAP = {
  USERS: /^\/api\/users$/,
  USER: /^\/api\/users\/([0-9a-fA-F-]+)$/,
  HOBBIES: /^\/api\/users\/([0-9a-fA-F-]+)\/hobbies$/,
};

export const LINKS_USER_ID_TEMPLATE = "{userId}";
export const LINKS_PATTERNS_MAP = {
  USER: `/api/users/${LINKS_USER_ID_TEMPLATE}`,
  HOBBIES: `/api/users/${LINKS_USER_ID_TEMPLATE}/hobbies`,
};

export const CACHE_MAX_AGE = 3600; // seconds
