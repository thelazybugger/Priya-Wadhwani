import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App min-h-screen bg-white text-[#0a0a0a]">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#faf6ed",
            color: "#0a0a0a",
            border: "1px solid rgba(148,128,214,0.2)",
          },
        }}
      />
    </div>
  );
}

export default App;
