import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMissionRewards } from "../../Actions/Actions.js";
import { ItemDropInfo, checkOver10 } from "../../Lib/Helpers/Funciones.js";
import "./Relicdetails.css";

export default function Relicdetails() {
  const [dropsite, setDropsite] = useState([]);
  const [data, setData] = useState([]);
  const missions = useSelector((state) => state.missionRewards);
  const dispatch = useDispatch();
  const { relicName } = useParams();
  useEffect(() => {
    dispatch(getMissionRewards());
  }, []);

  useEffect(() => {
    getItem();
    printData();
  }, [missions]);

  function getItem() {
    let result = [];
    let missionArray = Object.values(missions);
    missionArray.forEach((planet, i) => {
      // console.log(Object.keys(missions)[i]); // nombres de planetas
      result.push(ItemDropInfo(planet, relicName));
      // ItemDropInfo(planet, relicName);
    });
    // console.log(result);
    setDropsite(result);
  }

  function printData() {
    let result = [];
    dropsite.forEach((planet, i) => {
      if (!planet.length) return;
      planet.forEach((mission) => {
        if (mission.chance instanceof Object === true) {
          let data = {
            Planet: Object.keys(missions)[i],

            Mission: mission.missionName,

            MissionType: mission.missionType,

            Chance: mission.chance.A
              ? `Rotation A: ${mission.chance.A}`
              : mission.chance.B
              ? `Rotation B: ${mission.chance.B}`
              : `Rotation C: ${mission.chance.C}`,
          };

          result.push(data);
        } else {
          let data = {
            Planet: Object.keys(missions)[i],

            Mission: mission.missionName,

            MissionType: mission.missionType,

            Chance: mission.chance,
          };

          result.push(data);
        }
      });
    });
    setData(result);
  }

  return (
    <div className="container">
      <h1 className="relicname"> {relicName} </h1>
      {data.length > 0 ? (
        <table>
          <tr>
            <th> Planet </th>
            <th> Mission </th>
            <th> Mission Type </th>
            <th> Chance </th>
          </tr>
          {data.map((e) => {
            console.log(e.Chance);
            return (
              <>
                <tr
                  className={
                    e.MissionType === "Disruption" && checkOver10(e.Chance)
                      ? "easy"
                      : null
                  }
                >
                  <td> {e.Planet} </td>
                  <td> {e.Mission} </td>
                  <td> {e.MissionType} </td>
                  <td> {e.Chance}% </td>
                </tr>
                <br />
              </>
            );
          })}
        </table>
      ) : (
        <h1>The relic is Vaulted</h1>
      )}
    </div>
  );
}
