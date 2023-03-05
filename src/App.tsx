import GrapeJs from "Components/GrapeJs";
import AGDemo from "Components/AGDemo";
import Home from "Components/Home";
import { Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/grapejs" element={<GrapeJs/>} />
        <Route path="/agdemo" element={<AGDemo/>} />
      </Routes>
    </>
  );
};

export default App;
