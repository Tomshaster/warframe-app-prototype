import React, { useEffect, useState } from "react";
import { getAllRelics, lockSearch } from "../../Actions/Actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home(props) {
  const relics = useSelector((state) => state.relics);
  const dispatch = useDispatch();
  const lock = useSelector((state) => state.search);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // console.log(relics);
    dispatch(getAllRelics());
    setSearch(lock);
  }, []);

  useEffect(() => {
    list();
  }, [search]);

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
    // console.log(fullChance);
    setFiltered(fullChance);
  }

  return (
    <div className="container">
      <form>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={search}
          placeholder="Buscar parte prime"
        />
        {/* <button>Buscar</button> */}
      </form>
      <table>
        <tr>
          <th> Parte </th>
          <th> Reliquia </th>
          <th> Chance </th>
        </tr>

        {filtered.map((r) => {
          let item = r.rewards.find((r) =>
            r.itemName.toLowerCase().includes(lock.toLowerCase())
          );
          let relic = r.tier + " " + r.relicName + " Relic";
          // console.log(relic);
          return (
            <>
              <tr>
                <td> {item.itemName}</td>
                <td>
                  <Link to={`details/${relic}`}>
                    {r.tier} {r.relicName}
                  </Link>
                  - {r.state}
                </td>
                <td>{item.chance}%</td>
              </tr>
              <br />
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
