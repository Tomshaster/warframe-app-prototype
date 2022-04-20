// usar el indice forEach(mission, i) acepta un segundo arg
function ItemDropInfo(planet, item) {
  let result = [];
  //   console.log(Object.keys(planet.Bode.rewards)); rotacion de los rewards
  //   console.log(Object.values(planet.Bode.rewards)); valor de los rewards
  Object.values(planet).forEach((mission, i) => {
    // console.log(Object.keys(planet)[i]);
    if (mission.isEvent) {
      return null;
    }
    const rewardInfo = getRewardInfo(mission.rewards, item);
    // console.log(`Mission: ${Object.keys(planet)[i]} Reward: ${rewardInfo}`);
    // console.log(rewardInfo);
    if (rewardInfo) {
      result.push({
        missionName: Object.keys(planet)[i],
        chance: rewardInfo,
        missionType: mission.gameMode,
      });
    }
  });
  return result;
}

function getRewardInfo(missionRewards, item) {
  //   console.log(missionRewards);
  if (!missionRewards) return null;
  if (Array.isArray(missionRewards)) {
    const chance = getRewardChanceFromArray(missionRewards, item);
    if (chance) return chance;
  } else {
    //[[],[],[]]
    let rewardsArray = Object.values(missionRewards);
    let result;
    rewardsArray.forEach((array, i) => {
      let chance = getRewardInfo(array, item);
      //   console.log(chance);
      if (chance) {
        result = {};
        switch (i) {
          case 0:
            result.A = chance;
            break;
          case 1:
            result.B = chance;
            break;
          case 2:
            result.C = chance;
            break;
          default:
            break;
        }
      }
    });
    // console.log(result);
    return result;
  }
  return null;
}

function getRewardChanceFromArray(rewardsArray, item) {
  let i = 0;
  while (i < rewardsArray.length) {
    if (rewardsArray[i].itemName === item) {
      return rewardsArray[i].chance;
    }
    i++;
  }
  return null;
}
function checkVaulted(planet, relic) {
  let vaulted = false;
  if (ItemDropInfo(planet, relic).length < 1) {
    vaulted = true;
  }
  return vaulted;
}

function checkOver10(chance) {
  let result = false;
  if (isNaN(chance)) {
    let number = chance.split(" ");
    number = number.pop();
    if (number > 10) result = true;
  } else {
    if (chance > 10) result = true;
  }
  return result;
}

// let relic = "Axi C7 Relic";
// console.log(ItemDropInfo(ceres, relic));
// console.log(checkVaulted(ceres, relic));
export {
  ItemDropInfo,
  getRewardChanceFromArray,
  getRewardInfo,
  checkVaulted,
  checkOver10,
};
