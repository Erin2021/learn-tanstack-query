import { useQuery } from "react-query";
import axios from "axios";
import { Tdata } from "./SuperHeroesPage";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  const onSuccess = (data: any) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error: any) => {
    console.log("Perform side effect after encountering error", error);
  };

  //구조분할로 필요한것만 가져옴(https://tanstack.com/query/v4/docs/framework/react/reference/useQuery)
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      //cacheTime:5000,
      //staleTime:30000,
      //refetchOnMount:true,
      //refetchOnWindowFocus:true,
      //refetchInterval:2000,
      //refetchIntervalInBackground:true,
      //enabled:false,//fetching disabled.refetchOnMount disabled 한거임

      onSuccess,
      onError,
      select: (data) => {
        //data에서 원하는 것을 뽑는 것-여기서 추출하면 이 data를 사용하는 것이다.
        const superHeroNames = data.data.map((hero: Tdata) => hero.name);
        return superHeroNames;
      },
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{(error as Error).message}</h2>;
  }
  return (
    <>
      <h2>RQSuperHeroesPage Component</h2>
      <button
        onClick={() => {
          refetch();
        }}
      >
        Fetch Heroes
      </button>
      {/* {data?.data.map((hero: Tdata) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {data.map((heroName: string) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};
export default RQSuperHeroesPage;

//data?.data : data값이 useQuery로 불려왔는데, 데이터를 사용하려면 data에 들어가야 사용할 수 있음.
//에러판정까지 시간이 걸리는이유:에러나면 자동으로 3번 재도전을 하거든: error as Error : 에러가 에러타입일때 작동하는거
