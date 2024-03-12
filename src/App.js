import { useEffect, useState } from "react";
import "./App.css";
import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [error, setError] = useState(false);

  useEffect(() => {
    async function init() {
      const res = await fetch("https://moviebeee-api.onrender.com/");
      const data = await res.json();
      if (data.message === "unauthorize") {
        setError(true);
      }
    }
    init();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Browse error={error} />}></Route>
          <Route path="/search" element={<Search error={error} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
