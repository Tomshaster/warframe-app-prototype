import React, { useEffect, useState } from "react";
import {
  getAllRelics,
  lockSearch,
  getMissionRewards,
  setWishlist,
} from "../../Actions/Actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkVaulted } from "../../Lib/Helpers/Funciones.js";
import "./Home.css";

export default function Home(props) {
  const missions = useSelector((state) => state.missionRewards);
  const relics = useSelector((state) => state.relics);
  const lock = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [vault, setVault] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // console.log(relics);
    dispatch(getAllRelics());
    dispatch(getMissionRewards());
    setSearch(lock);
    console.log(missions);
  }, []);

  useEffect(() => {
    list();
  }, [search]);

  function toggleVault() {
    setVault(!vault);
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   list();
  // }

  function list() {
    console.log(search);
    dispatch(lockSearch(search));
    let prefilter = relics.filter((r) =>
      r.rewards.some(
        (reward) =>
          reward.itemName.toLowerCase().includes(search.toLowerCase()) &&
          (r.state === "Intact" || r.state === "Radiant")
      )
    );

    // Reformat relic pairs into nested arrays
    let cont = [];
    for (let j = 0; j < prefilter.length; ) {
      let aux = [];
      for (let i = j; i < j + 2; i++) {
        aux.push(prefilter[i]);
      }
      cont.push(aux);
      j = j + 2;
    }
    // console.log(cont);

    // Delete the lowest chance variable
    cont.forEach((r) => {
      let item = r[0].rewards.find((r) =>
        r.itemName.toLowerCase().includes(search.toLowerCase())
      );
      let nextItem = r[1].rewards.find((r) =>
        r.itemName.toLowerCase().includes(search.toLowerCase())
      );
      if (item.chance > nextItem.chance) {
        r.pop();
      } else {
        r.shift();
      }
    });
    // console.log(cont);

    // Un-nest the array
    let fullChance = cont.map((r) => r[0]);

    // Check vaulted
    fullChance.forEach((r) => {
      let check = [];
      let relic = r.tier + " " + r.relicName + " Relic";
      Object.values(missions).forEach((planet) => {
        check.push(checkVaulted(planet, relic));
      });
      if (!check.includes(false)) {
        r.vaulted = true;
      }
      // console.log(check);
    });
    setFiltered(fullChance);
  }

  function addFav(item, relic) {
    let data = {
      item: item,
      relic: relic,
    };
    dispatch(setWishlist(data));
  }

  return (
    <div className="container">
      <h1>Warframe Prime Relic Finder</h1>
      <form>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={search}
          placeholder="Buscar parte prime"
        />
        <Link to="/wishlist">Wishlist</Link>
      </form>
      <button onClick={toggleVault}>
        {vault ? "Hide Vaulted" : "View Vaulted"}
      </button>
      <table>
        <tr>
          <th> Part </th>
          <th> Relic </th>
          <th> Chance </th>
          <th> Vaulted </th>
        </tr>

        {filtered.map((r) => {
          let item = r.rewards.find((r) =>
            r.itemName.toLowerCase().includes(lock.toLowerCase())
          );
          let relic = r.tier + " " + r.relicName + " Relic";
          // console.log(relic);
          return (
            <>
              <tr className={r.vaulted && !vault ? "vault" : "novault"}>
                <td>
                  {" "}
                  <button onClick={() => addFav(item, r)}>&hearts;</button>{" "}
                  {item.itemName}
                </td>
                <td>
                  <Link to={`details/${relic}`}>
                    {r.tier} {r.relicName}
                  </Link>
                  - {r.state}
                </td>
                <td>{item.chance}%</td>
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

// function mapStateToProps(state) {
//   return {
//     relics: state.relics,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getAllRelics: () => dispatch(getAllRelics()),
//   };
// }

// export default connect(null, null)(Home);
