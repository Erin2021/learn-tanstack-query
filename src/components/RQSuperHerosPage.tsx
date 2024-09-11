import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Tdata } from "./SuperHeroesPage";

const RQSuperHeroesPage = () => {
  const onSuccess = (data: any) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error: any) => {
    console.log("Perform side effect after encountering error", error);
  };

  //구조분할로 필요한것만 가져옴(https://tanstack.com/query/v4/docs/framework/react/reference/useQuery)
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);
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
      {data?.data.map((hero: Tdata) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroName: string) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
export default RQSuperHeroesPage;

//data?.data : data값이 useQuery로 불려왔는데, 데이터를 사용하려면 data에 들어가야 사용할 수 있음.
//에러판정까지 시간이 걸리는이유:에러나면 자동으로 3번 재도전을 하거든: error as Error : 에러가 에러타입일때 작동하는거
