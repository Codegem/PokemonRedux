import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../redux/actions/pokemonAction";
import _ from "lodash";

const Pokemon = (props) => {
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);
  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);

  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return (
        <div className="pokemon-wrapper">
          <h1>{pokemonName}</h1>
          <div className="item">
            {Object.values(pokeData.sprites).map((sprite, key) => {
              if (sprite !== null) {
                return <img src={sprite} alt="" key={key} />;
              }
            })}
          </div>
          <div>
            <h1>Stats</h1>
            {Object.values(pokeData.stats).map((stat, key) => {
              return (
                <div className="poki_stat" key={key + 1}>
                  <p>{stat.stat.name}</p>
                  <p>{stat.base_stat}</p>
                </div>
              );
            })}
            <h1>Abilities</h1>
            {Object.values(pokeData.abilities).map((stat, key) => {
              return (
                <div className="poki_stat" key={key + 1}>
                  <p>{stat.ability.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonState.errorMsg !== "") {
      return <p>{pokemonState.errorMsg}</p>;
    }

    return <p>error getting pokemon</p>;
  };
  return <div>{ShowData()}</div>;
};

export default Pokemon;
