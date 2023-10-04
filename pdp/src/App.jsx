import React, {Suspense, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import "./index.scss";

const Header = React.lazy(()=> import("home/Header"));
import Footer from "home/Footer";
import PDPContent from "./PDPContent";

const App = () => {
  const [showHeader, setShowHeader] = useState(false);
  return (
    <Router>
      <div className="text-3xl mx-auto max-w-6xl">
        {showHeader && (
          <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
      )}
      <button className="text-3xl p-5" onClick={() => setShowHeader(true)}>Show Header</button>
        <div className="my-10">
          <Routes>
            <Route path="/product/:id" element={< PDPContent />} />
          </Routes>
        </div>
        <Footer />
      </div>
  </Router>
);
  }
ReactDOM.render(<App />, document.getElementById("app"));
