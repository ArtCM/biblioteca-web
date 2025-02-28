import { useState, useEffect, useRef } from "react";
import "./home.css";

export default function Home() {
  const [showTitle, setShowTitle] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setShowTitle(true);
    };

    video.play().catch((error) => console.error("Erro ao reproduzir o vídeo:", error));
    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  return (
    <main className="home-container">
      <video ref={videoRef} className="background-video" src="/assets/video/bg-video.mp4" autoPlay muted />

      {showTitle && 
        <div className="home-container__content">
          <h1>Bem-vindo à Biblioteca Online</h1>
        </div>
      }
    </main>
  );
}
