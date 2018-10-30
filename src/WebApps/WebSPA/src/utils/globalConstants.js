const API_URL = process.env.REACT_APP_API_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const GlobalConstants = {
    API_URL: API_URL,
    LOGIN_URL: `${API_URL}/connect/token`,
    LOGIN_RESPONSE_ERROR: "invalid_username_or_password",
    CLIENT_ID: CLIENT_ID,
    CLIENT_SECRET: CLIENT_SECRET,
};

export default GlobalConstants;
