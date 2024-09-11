import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId: any) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }: { heroIds: number[] }) => {
  const queryResults=useQueries(
    heroIds.map(id=>{
      return{
        queryKey:['super-hero',id],
        queryFn:()=>fetchSuperHero(id)
      }
    })
  );
  console.log({queryResults})//array로 fetch값들이 저장됨.
  return <div>DynamicParallelPage</div>;
};
