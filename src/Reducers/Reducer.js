import {
  GET_ALL_RELICS,
  GET_MISSION_REWARDS,
  LOCK_SEARCH,
  SET_WISHLIST,
} from "../Actions/Actions.js";

const initialState = {
  relics: [],
  missionRewards: {},
  search: "",
  favRelics: [],
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
    case SET_WISHLIST:
      return {
        ...state,
        favRelics: state.favRelics.concat(action.payload),
      };
    default:
      return { ...state };
  }
}
