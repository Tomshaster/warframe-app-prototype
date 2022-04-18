import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMissionRewards } from "../../Actions/Actions.js";
import {
  ItemDropInfo,
  getRewardChanceFromArray,
  getRewardInfo,
} from "../../Lib/Helpers/Funciones.js";
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

            Chance: mission.chance,
          };

          result.push(data);
        }
      });
    });
    setData(result);
    // console.log(data);
  }

  return (
    <div className="container">
      <button>
        <h1> {"<--"} </h1>
      </button>
      <h1> {relicName} </h1>
      <table>
        <tr>
          <th> Planet </th>
          <th> Mission </th>
          <th> Chance </th>
        </tr>
        {data.length > 0 ? (
          data.map((e) => {
            return (
              <>
                <tr>
                  <td>{e.Planet}</td>
                  <td> {e.Mission} </td>
                  <td> {e.Chance}% </td>
                </tr>
                <br />
              </>
            );
          })
        ) : (
          <h1>The Relic is Vaulted</h1>
        )}
      </table>
    </div>
  );
}
