

import { useState } from "react";

import MobAddButton from "../MobAddbutton/mobAddButton";
import DeskAddButton from "../DeskAddButton/deskAddButton";
import { useNavigation } from "../../hooks/useNavigation";

import { useEntityModal } from "../../hooks/useEntityModal";

import './header.css'

export default function Header() {
    const { navigateTo } = useNavigation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const bookModal = useEntityModal("book");
    const authorModal = useEntityModal("author");
    const categoryModal = useEntityModal("category");


    const toggleAdmin = () => {
        setIsAdmin((prev) => !prev);
    };
    
    return(
        <header className="header">

            <div className="container">
                <nav className="navbar">

                    <a onClick={() => navigateTo("home")}>
                        <img className="navbar__logo" src="/assets/image/logo.webp" alt="Logo" title="Logo" />
                    </a>

                    {/* Navbar mobile  */}
                    <div className="navbar__mobile">
                        <button 
                            className={`menuButton ${isMobileMenuOpen ? "select" : ""}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
                        </button>

                        {/* Menu Lateral */}
                        <div className={`navbar__mobile--menu ${isMobileMenuOpen ? "menuOpen" : "menuClose"}`}>
                            <ul>
                                <a onClick={() => navigateTo("Home")}>
                                    <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                                        Home
                                    </li>
                                </a>
                                <a onClick={() => navigateTo("livros")}>
                                    <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
                                        Livros
                                    </li>
                                </a>
                                <a onClick={() => navigateTo("autores")}>
                                    <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                                        Autores
                                    </li>
                                </a>
                                <a onClick={() => navigateTo("categorias")}>
                                    <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>
                                        Categorias
                                    </li>
                                </a>
                                <a onClick={() => navigateTo("sobre")}>
                                    <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                                        Sobre
                                    </li>
                                </a>
                            </ul>

                            <a className="adminMobButton" onClick={toggleAdmin}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z"/></svg>
                                {isAdmin ? "Voltar Como User" : "Acessar Como Admin"}
                            </a>

                            {isAdmin && (
                                <>
                                <MobAddButton onClick={bookModal.openModal} buttonIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>} buttonText="Adicionar Livro" />
                                <MobAddButton onClick={authorModal.openModal} buttonIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>} buttonText="Adicionar Autor" />
                                <MobAddButton onClick={categoryModal.openModal} buttonIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>} buttonText="Adicionar Categoria" />
                                </>
                            )}
                        </div>
                    </div>
                    

                    {/* Navbar desktop  */}
                    <div className="navbar__desktop">
                        <ul>
                            <a onClick={() => navigateTo("home")}>
                                <li>
                                    Home
                                </li>
                            </a>
                            <a onClick={() => navigateTo("livros")}>
                                <li>
                                    Livros
                                </li>
                            </a>
                            <a onClick={() => navigateTo("autores")}>
                                <li>
                                    Autores
                                </li>
                            </a>
                            <div className="categoryDropdown">
                                <a onClick={() => navigateTo("categorias")}>
                                    <li>
                                        Categorias
                                    </li>
                                </a>
                            </div>

                            {isAdmin && (
                                <div className="addDropdown">
                                    <a>
                                        <li>
                                            Adicionar
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                                        </li>
                                    </a>

                                    {/* Add Dropdwon */}
                                    <div className="addDropdown__container fadeFromTop">
                                        <DeskAddButton 
                                            onClick={bookModal.openModal}
                                            buttonIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>}
                                            buttonText="Livro"
                                        />
                                        <DeskAddButton 
                                            onClick={authorModal.openModal}
                                            buttonIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>}
                                            buttonText="Autor"
                                        />
                                        <DeskAddButton 
                                            onClick={categoryModal.openModal}
                                            buttonIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>}
                                            buttonText="Categoria"
                                        />
                                    </div>
                                </div>
                            )}

                            <a onClick={() => navigateTo("sobre")}>
                                <li>
                                    Sobre
                                </li>
                            </a>

                            <a className="adminDeskButton" onClick={toggleAdmin}>
                                {isAdmin ? "Voltar Como User" : "Acessar Como Admin"}
                            </a>
                        </ul>
                    </div>
                </nav>

                {bookModal.modal}
                {authorModal.modal}
                {categoryModal.modal}
            </div>

        </header>
    )
}