import { useQuery } from "react-query";
import axios from "axios";
import { Tdata } from "./SuperHeroesPage";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  //구조분할로 필요한것만 가져옴(https://tanstack.com/query/v4/docs/framework/react/reference/useQuery)
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      //cacheTime:5000,
      //staleTime:30000,
      //refetchOnMount:true, 
      //refetchOnWindowFocus:true,
      refetchInterval:2000,//default:false,숫자:몇초간 refetch 된다,
      //만약 windowfocus됬지 않을 때에도 poll하고 싶다
      refetchIntervalInBackground:true,//default:false,true:focus되지 않을 때도 폴할것이다.

    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{(error as Error).message}</h2>;
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
//에러판정까지 시간이 걸리는이유:에러나면 자동으로 재도전을 하거든: error as Error : 에러가 에러타입일때 작동하는거
