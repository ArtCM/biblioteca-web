import { useState, useEffect, useRef } from "react";
import "./home.css";

export default function Home() {
  const [showTitle, setShowTitle] = useState(false);
  const [showVideo, setShowVideo] = useState(window.innerWidth > 900);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const titleTimeout = setTimeout(() => setShowTitle(true), 300);

    return () => clearTimeout(titleTimeout);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowVideo(window.innerWidth > 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;

    const video = videoRef.current;
    video.play().catch((error) => console.error("Erro ao reproduzir o vídeo:", error));
  }, [showVideo]);

  return (
    <main className="home-container">
      {showVideo && (
        <video ref={videoRef} className="background-video" src="/assets/video/bg-video.mp4" autoPlay muted />
      )}

      {showTitle && 
        <div className="home-container__content">
          <h1>Bem-vindo à Biblioteca Online</h1>
        </div>
      }
    </main>
  );
}
