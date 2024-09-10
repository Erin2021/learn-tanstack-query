import { useQuery } from "react-query";
import axios from "axios";
import { Tdata } from "./SuperHeroesPage";
import { useState } from "react";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  const[duration,setDuration]=useState<any>(3000);

  const onSuccess=(data: any)=>{
    if(data?.data.length === 4)setDuration(false)
    console.log('Perform side effect after data fetching',data)
  }

  const onError=(error: any)=>{
    if(error)setDuration(false);
    console.log('Perform side effect after encountering error',error)
  }

  //구조분할로 필요한것만 가져옴(https://tanstack.com/query/v4/docs/framework/react/reference/useQuery)
  const { isLoading, data, isError, error, isFetching,refetch } = useQuery(
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
      refetchInterval:duration,
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
      <button onClick={()=>{refetch()}}>Fetch Heroes</button>
      {data?.data.map((hero: Tdata) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
export default RQSuperHeroesPage;

//data?.data : data값이 useQuery로 불려왔는데, 데이터를 사용하려면 data에 들어가야 사용할 수 있음.
//에러판정까지 시간이 걸리는이유:에러나면 자동으로 3번 재도전을 하거든: error as Error : 에러가 에러타입일때 작동하는거
