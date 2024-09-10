import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/Homepage";
import SuperHeroesPage from "./components/SuperHeroesPage";
import RQSuperHeroesPage from "./components/RQSuperHerosPage";
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
