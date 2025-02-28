import { useState, useEffect } from "react";

import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";

import Books from "./pages/livros/livros";
import Authors from "./pages/autores/autores";
import Categories from "./pages/categorias/categorias";
import About from "./pages/sobre/sobre";
import Home from "./pages/home/home";

import { LibraryProvider, useLibrary } from "./context/LibraryContext";
import { NavigationProvider, useNavigation } from "./hooks/useNavigation";

import "./assets/style/index.css";

function AppContent() {
  const { currentPage } = useNavigation();
  const [forceUpdate, setForceUpdate] = useState(0);

  const { books, authors, categories } = useLibrary();

  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [books, authors, categories]);

  const renderPage = () => {
    switch (currentPage) {
      case "livros":
        return <Books key={forceUpdate} />;
      case "autores":
        return <Authors key={forceUpdate} />;
      case "categorias":
        return <Categories key={forceUpdate} />;
      case "sobre":
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Header />

        <div className="container">{renderPage()}</div>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LibraryProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </LibraryProvider>
  );
}
