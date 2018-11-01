const AUTH_API_URL = process.env.REACT_APP_API_URL;
const SCORES_API_URL = process.env.REACT_APP_SCORE_API_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const GlobalConstants = {
  API_URL: AUTH_API_URL,
  SCORES_API_URL: SCORES_API_URL,
  LOGIN_URL: `${AUTH_API_URL}/connect/token`,
  LOGIN_RESPONSE_ERROR: "invalid_username_or_password",
  USER_DATA_URL: `${AUTH_API_URL}/connect/userinfo`,
  REGISTER_URL: `${AUTH_API_URL}/api/account/register`,
  GET_TOP_SCORES_URL: `${SCORES_API_URL}/api/v1/gamescore/all`,
  CREATE_GAME_SCORE_URL: `${SCORES_API_URL}/api/v1/gamescore/create`,
  CLIENT_ID: CLIENT_ID,
  CLIENT_SECRET: CLIENT_SECRET
};

export default GlobalConstants;
