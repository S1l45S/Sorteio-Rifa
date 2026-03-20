"use client";
import { useState } from "react";
import "../css/sideBar.css"

function sideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`sidebar-info ${isOpen ? "active" : ""}`}>
                <div className="sidebar-content">
                    <div className="divisor"></div>
                    <h3>PROJETO SWARM79</h3>
                    <p>
                        Criada em 2024, a equipe nasceu da união de estudantes com o objetivo de transformar conhecimento em drones autônomos.
                    </p>

                    <p>
                        Com testes, erros e evolução constante, o projeto cresceu integrando hardware e software para resolver desafios reais.
                    </p>

                    <p>
                        Guiada por colaboração, disciplina e inovação, a equipe se fortaleceu como um time de engenharia.
                    </p>

                    <p>
                        Hoje, se prepara para a SAE AeroDesign Eletroquad, aplicando na prática tudo que construiu até aqui.
                    </p>

                    <p>
                        <strong>Essa é só a decolagem.</strong>
                    </p>
                    <div className="tags-tecnologicas">
                        <span>#Drone</span>
                        <span>#UFS</span>
                        <span>#Inovação</span>
                    </div>
                </div>
            </div>
            <div className="side-trigger" onClick={toggleSidebar}>
                <span className="trigger-text">Conheça a SWARM79</span>
                <span className="trigger-arrow">❮</span>
            </div>
        </>
    );

}

export default sideBar;