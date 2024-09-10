import { useQuery } from "react-query";
import axios from "axios";
import { Tdata } from "./SuperHeroesPage";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  //구조분할로 필요한것만 가져옴(https://tanstack.com/query/v4/docs/framework/react/reference/useQuery)
  const { isLoading, data } = useQuery("super-heroes", fetchSuperHeroes);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroesPage Component</h2>
      {data?.data.map((hero: Tdata) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
export default RQSuperHeroesPage;

//data?.data : data값이 useQuery로 불려왔는데, 데이터를 사용하려면 data에 들어가야 사용할 수 있음.
