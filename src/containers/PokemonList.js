import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { GetPokemonList } from "../redux/actions/pokemonAction";

const PokemonList = () => {
  const dispatch = useDispatch();
  const PokemonList = useSelector((state) => state.PokemonList);

  useEffect(() => {
    FetchData(1);
  }, []);

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };

  const ShowData = () => {
    if (!_.isEmpty(PokemonList.data)) {
      return (
        <div className="list-wrapper">
          {PokemonList.data.map((items, key) => {
            return (
              <div className="pokemon-item" key={key}>
                <p>{items.name}</p>
                <Link to={`/pokemon/${items.name}`}>View</Link>
              </div>
            );
          })}
        </div>
      );
    }

    if (PokemonList.loading) {
      return <p>Loading...</p>;
    }

    if (PokemonList.errorMsg !== "") {
      return <p>{PokemonList.errorMsg}</p>;
    }

    return <p>unable to get data</p>;
  };

  return <div>{ShowData()}</div>;
};

export default PokemonList;
