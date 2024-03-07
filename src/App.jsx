import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ArtistLists from "./components/ArtistLists";
import ArtistAlbum from "./components/ArtistAlbum";
import Tweets from "./components/Tweets";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ArtistLists />} />
          <Route path="/album/:artistId" element={<ArtistAlbum />} />
          <Route path="/artist/:artistId" element={<Tweets />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
