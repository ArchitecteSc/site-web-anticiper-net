import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LangProvider } from "./i18n";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Operations from "./pages/Operations";
import Training from "./pages/Training";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <LangProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/qui-sommes-nous" element={<About />} />
                <Route path="/appuis-operationnels" element={<Operations />} />
                <Route path="/formation" element={<Training />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mentions-legales" element={<Legal />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LangProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
