import { useQuery } from "react-query";
import { Tdata } from "../components/SuperHeroesPage";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (
  onSuccess:any,
  onError:any
) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero: Tdata) => hero.name);
    //   return superHeroNames;
    // },
  });
};
