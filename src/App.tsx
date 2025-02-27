import { useState, useEffect } from "react";

import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";

import Books from "./pages/livros/livros";
import Authors from "./pages/autores/autores";
import Categories from "./pages/categorias/categorias";
import About from "./pages/sobre/sobre";
import Home from "./pages/home/home";

import './assets/style/index.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(window.location.pathname);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleStorageUpdate = () => setForceUpdate((prev) => prev + 1);

    window.addEventListener("localStorageUpdate", handleStorageUpdate);
    return () => window.removeEventListener("localStorageUpdate", handleStorageUpdate);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPage(path);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "/livros":
        return <Books key={forceUpdate} />;
      case "/autores":
        return <Authors key={forceUpdate} />;
      case "/categorias":
        return <Categories key={forceUpdate} />;
      case "/sobre":
        return <About key={forceUpdate} />;
      default:
        return <Home key={forceUpdate} />;
    }
  };

  return (
    <>
      <Header navigateTo={navigateTo} />
      <div className="container">{renderPage()}</div>
      <Footer />
    </>
  );
}
