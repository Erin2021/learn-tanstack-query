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
      refetchOnMount:true,//refetchOnMount:화면에 컴포넌트가 나타날때마다 데이터 가져올지. true:데이타가 stale일 경우 refetch가 진행된다.false:refetch가 안된다.'always': 데이터가 stale이던 아니던 refetch된다.
      refetchOnWindowFocus:true,//refetchOnMount보다 약간 더 중요함.ui async with remoted data(사용자 인터페이스가 원격 데이터를 비동기적으로 처리한다).true: 윈도우가 집중되면 refetch가 일어남.false,'always'
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
