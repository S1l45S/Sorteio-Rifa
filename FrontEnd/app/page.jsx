"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "../src/css/page.css";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

function Page() {
  const [countdown, setCountdown] = useState("");
  const [resultado, setResultado] = useState("--");

  useEffect(() => {
    const atualizar = async () => {
      try {
      const response = await fetch(`${API_URL}/api/sorteio`);
        const data = await response.json();

        const diferenca = data.dataSorteio - data.agora;

        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor(
          (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutos = Math.floor(
          (diferenca % (1000 * 60 * 60)) / (1000 * 60)
        );
        const segundos = Math.floor(
          (diferenca % (1000 * 60)) / 1000
        );

        if (data.realizado) {
          setCountdown("SORTEIO REALIZADO");
          setResultado(data.numero);
          return;
        }

        setCountdown(`${dias}d ${horas}h ${minutos}m ${segundos}s`);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    atualizar();
    const interval = setInterval(atualizar, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header>
        <div className="titulo">
          <h1>Rifa</h1>
          <span>SWARM79</span>
        </div>
      </header>
      <main className="container">
        <section className="contador">
          <h2>SORTEIO EM:</h2>
          <div className="countdown">{countdown}</div>
        </section>

        <section className="resultado">
          <h2>NÚMERO SORTEADO</h2>
          <div className="resultadoFinal">{resultado}</div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="premio">
            <h2>PRÊMIO</h2>
            <p>R$ 300,00</p>
          </div>

          <div className="logo-equipe">
           <Image 
              src="/logo.png" 
              alt="Logo Equipe" 
              width={120} 
              height={120}
              className="imgLogo"
              priority
            />
          </div>
        </div>

        <div className="autor">
          © Silas Santos
        </div>
      </footer>
    </>
  );
}

export default Page;