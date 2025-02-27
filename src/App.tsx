import { useState, useEffect } from "react";

import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";

import Books from "./pages/livros/livros";
import Authors from "./pages/autores/autores";
import Categories from "./pages/categorias/categorias";
import About from "./pages/sobre/sobre";
import Home from "./pages/home/home";

import './assets/style/index.css'

export default function App() {

  const [currentPage, setCurrentPage] = useState<string>(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPage(path);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "/livros":
        return <Books />;
      case "/autores":
        return <Authors />;
      case "/categorias":
        return <Categories />;
      case "/sobre":
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Header navigateTo={navigateTo}/>

      <div className="container">
        {renderPage()}
      </div>
      
      <Footer />
    </>
  );
}
