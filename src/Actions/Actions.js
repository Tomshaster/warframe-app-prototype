export const GET_ALL_RELICS = "GET_ALL_RELICS";
export const GET_MISSION_REWARDS = "GET_MISSION_REWARDS";
export const LOCK_SEARCH = "LOCK_SEARCH";

export function getAllRelics() {
  return function (dispatch) {
    return fetch("https://drops.warframestat.us/data/relics.json")
      .then((response) => response.json())
      .then((relics) =>
        dispatch({ type: GET_ALL_RELICS, payload: relics.relics })
      );
  };
}

export function getMissionRewards() {
  return function (dispatch) {
    return fetch("https://drops.warframestat.us/data/missionRewards.json")
      .then((response) => response.json())
      .then((rewards) =>
        dispatch({ type: GET_MISSION_REWARDS, payload: rewards.missionRewards })
      );
  };
}

export function lockSearch(search) {
  return {
    type: LOCK_SEARCH,
    payload: search,
  };
}
