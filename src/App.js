import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Uploader from "./pages/Uploader";
import Selector from "./pages/Selector";
import Tagger from "./pages/Tagger";
import NavBar from "./components/NavBar";
import Merger from "./pages/Merger";
import Order from "./pages/Order";
import Start from "./pages/Start";
import Server from "./pages/Server";
import { PressUploaderContextProvider } from "./contexts/PressUploaderContext";
// import Dictionary from "./components/Dictionary";

function App() {
  return (
    <>
      <PressUploaderContextProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Start />} />
            <Route path="/server" element={<Server />} />
            <Route path="/selector" element={<Selector />} />
            <Route path="/order" element={<Order />} />
            {/* <Route path="/dictionary" element={<Dictionary embed={false}/>} /> */}
            <Route path="/dictionary" element={<div>Provisional</div>} />
            <Route path="/tagger" element={<Tagger />} />
            <Route path="/uploader" element={<Uploader />} />
            <Route path="/merger" element={<Merger />} />
          </Routes>
        </Router>
      </PressUploaderContextProvider>
    </>
  );
}

export default App;
