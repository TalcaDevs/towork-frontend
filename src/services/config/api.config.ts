export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://184.73.49.129:8000",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  TOKENS: {
    ACCESS: "access",
    REFRESH: "refresh",
    IS_ALLOWED: "isAllowed"
  }
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: "/users/signin/",
    SIGN_UP: "/users/signup/", 
    REFRESH: "/users/token/refresh/",
    LOGOUT: "/users/logout/"
  },
  PROFILE: {
    SAVE: "/users/save-profile/",
    GET: "/users/get-profile/",
    UPDATE: "/users/profile/",
    PUBLIC: "/public/get-profile/",
    PUBLIC_LIST: "/public/profiles"
  }
} as const;