import ClientOauth2 from "client-oauth2";
import GlobalConstants from "../utils/globalConstants";

class AuthService {
  constructor() {
    this.client = new ClientOauth2({
      clientId: GlobalConstants.CLIENT_ID,
      clientSecret: GlobalConstants.CLIENT_SECRET,
      accessTokenUri: `${GlobalConstants.API_URL}/connect/token`,
      authorizationUri: `${GlobalConstants.API_URL}/connect/authorize`,
      scopes: ["openid", "profile", "offline_access", "score"]
    });
  }

  getAccessToken(username, password) {
    return this.client.owner.getToken(username, password);
  }
}

export default AuthService;
