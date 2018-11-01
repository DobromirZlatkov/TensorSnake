import GlobalConstants from "../utils/globalConstants";
import { authorizedFetch } from "./requestService";

class GameScoresService {
  getTopGameScores() {
    return authorizedFetch(GlobalConstants.GET_TOP_SCORES_URL, "GET");
  }

  createGameScores(payload) {
    return authorizedFetch(
      GlobalConstants.CREATE_GAME_SCORE_URL,
      "POST",
      payload
    );
  }
}

export default GameScoresService;
