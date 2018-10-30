import ClientOauth2 from "client-oauth2";
import GlobalConstants from "../utils/globalConstants";

class AuthService {
    constructor() {
        this.client = new ClientOauth2({
            clientId: GlobalConstants.CLIENT_ID,
            clientSecret: GlobalConstants.CLIENT_SECRET,//'K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=',
            accessTokenUri: `${GlobalConstants.API_URL}/connect/token`,
            authorizationUri: `${GlobalConstants.API_URL}/connect/authorize`,
            scopes: ["openid", "profile", "offline_access"]
        });
    }

    getAccessToken(username, password) {
        return this.client.owner.getToken(username, password);
    }
}

export default AuthService;
