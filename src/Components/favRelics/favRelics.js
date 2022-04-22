import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function FavRelics(props) {
  const wishlist = useSelector((state) => state.favRelics);
  //   const wishlist = [{ item: "adasd", relic: { relicName: "okokok" } }];

  return (
    <div className="container">
      <table>
        <tr>
          <th> Part </th>
          <th> Relic </th>
          <th> Chance </th>
          <th> Vaulted </th>
        </tr>

        {wishlist.map((r) => {
          let relic =
            r.relic.tier + " " + r.relic.relicName + " " + r.relic.tier;
          return (
            <>
              <tr>
                <td>
                  <button>X</button> {r.item.itemName}
                </td>
                <td>{relic}</td>
                <td>{r.item.chance}%</td>
                <td className={r.vaulted ? "vaulted" : null}>
                  {r.vaulted ? "Yes" : "No"}
                </td>
              </tr>
            </>
          );
        })}
      </table>
    </div>
  );
}
