import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes=()=>{
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends=()=>{
  return axios.get('http://localhost:4000/friends')
}

const ParallelQueriesPage = () => {
  const{data:superHeroes}=useQuery('super-heroes',fetchSuperHeroes)
  const{data:friends}=useQuery('friends',fetchFriends)
  return (
    <>
      <h1>ParallelQueriesPage Component</h1>
    </>
  );
}
export default ParallelQueriesPage