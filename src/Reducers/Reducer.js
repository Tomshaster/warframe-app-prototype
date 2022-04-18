import {
  GET_ALL_RELICS,
  GET_MISSION_REWARDS,
  LOCK_SEARCH,
} from "../Actions/Actions.js";

const initialState = {
  relics: [],
  missionRewards: {},
  search: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RELICS:
      return {
        ...state,
        relics: action.payload,
      };
    case GET_MISSION_REWARDS:
      return {
        ...state,
        missionRewards: action.payload,
      };
    case LOCK_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return { ...state };
  }
}
