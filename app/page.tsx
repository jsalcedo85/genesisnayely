'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Declarar YouTube IFrame API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function Home() {
  // Calcular días desde el 26 de octubre de 2025
  const startDate = new Date('2025-10-26');
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Referencia al reproductor de YouTube
  const playerRef = useRef<any>(null);
  const youtubeIframeRef = useRef<HTMLDivElement>(null);
  
  // Estado para controlar el telón
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [youtubeReady, setYoutubeReady] = useState(false);
  
  // Estado para el contador regresivo
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calcular tiempo restante hasta el 26 de noviembre de 2025
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-11-26T00:00:00');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  // Cargar YouTube IFrame API
  useEffect(() => {
    // Verificar si ya está cargado
    if (window.YT && window.YT.Player) {
      setYoutubeReady(true);
      return;
    }

    // Cargar el script de YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Callback cuando la API está lista
    window.onYouTubeIframeAPIReady = () => {
      setYoutubeReady(true);
    };
  }, []);

  // Inicializar el reproductor cuando YouTube está listo y el telón está abierto
  useEffect(() => {
    if (youtubeReady && curtainOpen && youtubeIframeRef.current && !playerRef.current) {
      playerRef.current = new window.YT.Player(youtubeIframeRef.current, {
        videoId: 'aCjvCE7XDHg',
        playerVars: {
          autoplay: 1,
          start: 10, // Empezar desde los 10 segundos
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: 'aCjvCE7XDHg', // Necesario para loop
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(60); // 60% de volumen
            event.target.playVideo();
          },
          onError: (event: any) => {
            console.error('Error en YouTube player:', event.data);
          },
        },
      });
    }
  }, [youtubeReady, curtainOpen]);

  // Reproducir música cuando se abre el telón
  const handleOpenCurtain = () => {
    setCurtainOpen(true);
  };

  return (
    <>
      {/* Telón inicial */}
      {!curtainOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900 cursor-pointer transition-opacity duration-1000"
          onClick={handleOpenCurtain}
        >
          {/* Decoraciones flotantes en el telón */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 text-6xl animate-float opacity-60" style={{ animationDelay: '0s' }}>💕</div>
            <div className="absolute top-40 right-20 text-5xl animate-float opacity-50" style={{ animationDelay: '1s' }}>💖</div>
            <div className="absolute bottom-40 left-20 text-5xl animate-float opacity-60" style={{ animationDelay: '2s' }}>💗</div>
            <div className="absolute top-60 left-1/4 text-4xl animate-float opacity-40" style={{ animationDelay: '1.5s' }}>💝</div>
            <div className="absolute bottom-60 right-1/4 text-5xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>💓</div>
            
            {/* Tulipanes decorativos */}
            <div className="absolute top-32 right-32 text-5xl animate-float opacity-50" style={{ animationDelay: '2.5s' }}>🌷</div>
            <div className="absolute bottom-32 left-32 text-4xl animate-float opacity-40" style={{ animationDelay: '3s' }}>🌷</div>
            <div className="absolute top-1/2 left-16 text-4xl animate-float opacity-45" style={{ animationDelay: '1.2s' }}>🌷</div>
            <div className="absolute top-1/3 right-16 text-5xl animate-float opacity-50" style={{ animationDelay: '2.2s' }}>🌷</div>
          </div>

          {/* Contenido central del telón */}
          <div className="relative z-10 text-center px-4">
            <div className="mb-8">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-6 animate-pulse-heart">
                Ábreme
              </h1>
              <div className="flex justify-center items-center gap-4 mb-6">
                <span className="text-5xl animate-pulse-heart">💕</span>
                <span className="text-4xl animate-pulse-heart" style={{ animationDelay: '0.3s' }}>🌷</span>
                <span className="text-5xl animate-pulse-heart" style={{ animationDelay: '0.6s' }}>💖</span>
              </div>
              <p className="text-2xl sm:text-3xl text-gray-700 dark:text-gray-300 font-semibold mb-4">
                Tócame para comenzar
              </p>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
                Una sorpresa especial te espera 💝
              </p>
            </div>
            
            {/* Flecha animada */}
            <div className="mt-12 animate-bounce">
              <svg 
                className="w-12 h-12 mx-auto text-pink-600 dark:text-pink-400" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      )}

    <main className={`min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 relative overflow-hidden transition-opacity duration-1000 ${curtainOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Decoraciones flotantes - Corazones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl animate-float opacity-60" style={{ animationDelay: '0s' }}>💕</div>
        <div className="absolute top-40 right-20 text-3xl animate-float opacity-50" style={{ animationDelay: '1s' }}>💖</div>
        <div className="absolute bottom-40 left-20 text-3xl animate-float opacity-60" style={{ animationDelay: '2s' }}>💗</div>
        <div className="absolute top-60 left-1/4 text-2xl animate-float opacity-40" style={{ animationDelay: '1.5s' }}>💝</div>
        <div className="absolute bottom-60 right-1/4 text-3xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>💓</div>
        
        {/* Tulipanes decorativos */}
        <div className="absolute top-32 right-32 text-3xl animate-float opacity-50" style={{ animationDelay: '2.5s' }}>🌷</div>
        <div className="absolute bottom-32 left-32 text-2xl animate-float opacity-40" style={{ animationDelay: '3s' }}>🌷</div>
        <div className="absolute top-1/2 left-16 text-2xl animate-float opacity-45" style={{ animationDelay: '1.2s' }}>🌷</div>
        <div className="absolute top-1/3 right-16 text-3xl animate-float opacity-50" style={{ animationDelay: '2.2s' }}>🌷</div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-indigo-400/20 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            {/* Corazones decorativos alrededor del título */}
            <div className="flex justify-center items-center mb-6 gap-4">
              <span className="text-4xl animate-pulse-heart">💕</span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 animate-fade-in-up">
                Génesis Nayely
              </h1>
              <span className="text-4xl animate-pulse-heart" style={{ animationDelay: '0.5s' }}>💕</span>
            </div>
            
            <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-4 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Una página especial creada con mucho amor
            </p>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Por <span className="font-semibold text-pink-600 dark:text-pink-400">José</span>
            </p>
            
            {/* Sección de fecha especial */}
            <div className="mt-8 mb-8 inline-block bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg border border-pink-200/50 dark:border-pink-800/50 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl animate-pulse-heart">💑</span>
                <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                  Juntos desde el 26 de octubre de 2025
                </p>
                <span className="text-3xl animate-pulse-heart" style={{ animationDelay: '0.3s' }}>💑</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                <span className="text-2xl">🌷</span>
                <span>{diffDays} días de felicidad juntos</span>
                <span className="text-2xl">🌷</span>
              </p>
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección romántica adicional */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="bg-gradient-to-r from-pink-100/80 via-purple-100/80 to-indigo-100/80 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-pink-200/50 dark:border-pink-800/30 text-center relative overflow-hidden">
          <div className="absolute top-4 left-4 text-3xl opacity-30 animate-float">🌷</div>
          <div className="absolute top-4 right-4 text-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}>💕</div>
          <div className="absolute bottom-4 left-4 text-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}>💖</div>
          <div className="absolute bottom-4 right-4 text-3xl opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>🌷</div>
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-6">
              Para mi hermosa Génesis Nayely
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
              Esta página fue creada con todo mi amor y dedicación
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6">
              Cada día desde el 26 de octubre ha sido especial contigo 💕
            </p>
            <div className="flex justify-center gap-4 text-4xl">
              <span className="animate-pulse-heart">💕</span>
              <span className="animate-pulse-heart" style={{ animationDelay: '0.3s' }}>🌷</span>
              <span className="animate-pulse-heart" style={{ animationDelay: '0.6s' }}>💖</span>
              <span className="animate-pulse-heart" style={{ animationDelay: '0.9s' }}>🌷</span>
              <span className="animate-pulse-heart" style={{ animationDelay: '1.2s' }}>💕</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Galería de Fotos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl">📸</span>
            <span>Nuestros Momentos Juntos</span>
            <span className="text-4xl">📸</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Recuerdos especiales que atesoramos 💕</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div 
              key={num}
              className="relative group"
            >
              {/* Marco estilo Hello Kitty */}
              <div className="relative bg-white rounded-3xl p-5 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-1">
                {/* Borde exterior rosa grueso */}
                <div className="absolute inset-0 rounded-3xl border-4 border-pink-300 dark:border-pink-400"></div>
                
                {/* Borde interior blanco */}
                <div className="absolute inset-3 rounded-2xl border-2 border-white shadow-inner"></div>
                
                {/* Decoración de esquinas estilo Hello Kitty - círculos rosados */}
                <div className="absolute -top-2 -left-2 w-7 h-7 bg-pink-300 dark:bg-pink-400 rounded-full border-3 border-white shadow-lg"></div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-pink-300 dark:bg-pink-400 rounded-full border-3 border-white shadow-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-7 h-7 bg-pink-300 dark:bg-pink-400 rounded-full border-3 border-white shadow-lg"></div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-pink-300 dark:bg-pink-400 rounded-full border-3 border-white shadow-lg"></div>
                
                {/* Corazones decorativos arriba y abajo */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl opacity-70 animate-pulse-heart">💕</div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-2xl opacity-70 animate-pulse-heart" style={{ animationDelay: '0.5s' }}>🌷</div>
                
                {/* Imagen con padding para el marco */}
                <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
                  <Image
                    src={`/pictures/${num}.jpeg`}
                    alt={`Momento especial ${num}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Efecto de brillo al hover estilo Hello Kitty */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-200/0 via-pink-200/0 to-pink-200/0 group-hover:from-pink-200/30 group-hover:via-pink-200/15 group-hover:to-pink-200/30 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección: Frases para Ti */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl">💌</span>
            <span>Frases para Ti</span>
            <span className="text-4xl">💌</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Palabras que vienen del corazón</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Eres la razón por la que mi corazón late más fuerte cada día 💕",
            "Cada momento contigo es un regalo que atesoro profundamente 🌷",
            "Tu sonrisa ilumina mi mundo más que cualquier estrella ✨",
            "En tus ojos encontré mi hogar y en tu corazón mi paz 💖",
            "Eres mi persona favorita en todo el universo 🌟",
            "Contigo, cada día es una nueva aventura llena de amor 💗",
            "Eres perfecta tal como eres, y eso es lo que más amo de ti 💝",
            "Mi amor por ti crece más y más con cada latido 💓",
          ].map((phrase, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-pink-50/80 to-purple-50/80 dark:from-pink-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-200/50 dark:border-pink-800/30 relative"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💕</span>
                <p className="text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed">{phrase}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección: Mi Compromiso Contigo */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-pink-200/50 dark:border-pink-800/50 relative overflow-hidden">
          <div className="absolute top-4 left-4 text-3xl opacity-20">💍</div>
          <div className="absolute top-4 right-4 text-3xl opacity-20">💕</div>
          <div className="absolute bottom-4 left-4 text-3xl opacity-20">🌷</div>
          <div className="absolute bottom-4 right-4 text-3xl opacity-20">💖</div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-2">
                Mi Compromiso Contigo
              </h2>
              <p className="text-gray-500 dark:text-gray-400">En nuestra relación</p>
            </div>
            
            <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              <p className="text-xl font-semibold text-pink-600 dark:text-pink-400 text-center">
                Mi querida Génesis Nayely,
              </p>
              
              <p className="text-center">
                Quiero que te sientas completamente segura conmigo, mi amor, porque yo te respeto, te admiro y te amo tal y como eres. No estoy contigo por algo físico, sino por la mujer increíble que eres por dentro: tu corazón, tu forma de ser, tu ternura, tu fuerza y todo lo que te hace única. Cada cosa que vivimos juntos solo me hace quererte más, porque todo lo compartimos desde el amor, desde la confianza y desde lo real.
              </p>
              
              <p className="text-center">
                Yo estoy contigo porque quiero una vida a tu lado, porque quiero cuidarte, protegerte y darte la seguridad que mereces. Lo nuestro no se basa en un momento, sino en todo lo que construimos día a día. Y te prometo que nunca voy a dejar que dudes de tu valor, porque eres una mujer maravillosa y lo que tenemos nos une más y más.
              </p>
              
              <div className="text-center mt-10 pt-6 border-t border-pink-200/50 dark:border-pink-800/30">
                <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                  Con todo mi amor y compromiso,<br />
                  <span className="text-2xl">José 💕</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Contador Regresivo - Un Mes Juntos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="bg-gradient-to-br from-pink-100/90 via-purple-100/90 to-indigo-100/90 dark:from-pink-900/40 dark:via-purple-900/40 dark:to-indigo-900/40 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-pink-200/50 dark:border-pink-800/30 relative overflow-hidden">
          {/* Decoraciones flotantes */}
          <div className="absolute top-4 left-4 text-4xl opacity-30 animate-float">💕</div>
          <div className="absolute top-4 right-4 text-4xl opacity-30 animate-float" style={{ animationDelay: '1s' }}>🌷</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-30 animate-float" style={{ animationDelay: '2s' }}>💖</div>
          <div className="absolute bottom-4 right-4 text-4xl opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>💗</div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-4 flex items-center justify-center gap-3">
              <span className="text-5xl">💑</span>
              <span>Nuestro Primer Mes</span>
              <span className="text-5xl">💑</span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Cada segundo que pasa nos acerca más a celebrar nuestro primer mes juntos 💕
            </p>
            
            {/* Contador */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {/* Días */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-200/50 dark:border-pink-800/30 transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
                  {timeLeft.days}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-semibold">
                  {timeLeft.days === 1 ? 'Día' : 'Días'}
                </div>
              </div>
              
              {/* Horas */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-200/50 dark:border-purple-800/30 transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-semibold">
                  {timeLeft.hours === 1 ? 'Hora' : 'Horas'}
                </div>
              </div>
              
              {/* Minutos */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-indigo-200/50 dark:border-indigo-800/30 transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-2">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-semibold">
                  {timeLeft.minutes === 1 ? 'Minuto' : 'Minutos'}
                </div>
              </div>
              
              {/* Segundos */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-200/50 dark:border-pink-800/30 transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-2 animate-pulse">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-semibold">
                  {timeLeft.seconds === 1 ? 'Segundo' : 'Segundos'}
                </div>
              </div>
            </div>
            
            {/* Mensaje */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50 dark:border-pink-800/30 max-w-2xl mx-auto">
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 italic">
                "El 26 de noviembre celebraremos nuestro primer mes juntos. Cada momento contigo es especial y este contador me recuerda lo afortunado que soy de tenerte en mi vida." 💕
              </p>
              <p className="text-base sm:text-lg text-pink-600 dark:text-pink-400 font-semibold mt-4">
                - José
              </p>
            </div>
            
            {/* Fecha objetivo */}
            <div className="mt-8 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="text-2xl">📅</span>
              <span className="text-lg font-semibold">26 de noviembre de 2025</span>
              <span className="text-2xl">💕</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Calendario de Fechas Especiales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl">📅</span>
            <span>Nuestras Fechas Especiales</span>
            <span className="text-4xl">📅</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Momentos inolvidables que hemos compartido juntos</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { date: "26 de octubre de 2025", day: "Domingo", special: "Primer día juntos 💕", emoji: "💑" },
            { date: "27 de octubre de 2025", day: "Lunes", special: "Los mejores 30 minutos de mi vida 🌷", emoji: "💖" },
            { date: "31 de octubre de 2025", day: "Viernes", special: "Noche especial en el parque 🎃", emoji: "💗" },
            { date: "08 de noviembre de 2025", day: "Sábado", special: "Juntos por siempre ✨", emoji: "💝" },
          ].map((moment, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-pink-100/80 via-purple-100/80 to-indigo-100/80 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-200/50 dark:border-pink-800/30 relative overflow-hidden group"
            >
              <div className="absolute top-3 right-3 text-3xl opacity-30 group-hover:opacity-50 transition-opacity">{moment.emoji}</div>
              <div className="text-center">
                <div className="text-5xl mb-4">{moment.emoji}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{moment.day}</p>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{moment.date}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm italic">{moment.special}</p>
              </div>
              <div className="absolute bottom-2 left-2 text-lg opacity-20 group-hover:opacity-40 transition-opacity">💕</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl animate-pulse-heart">💕</span>
          <span className="text-xl animate-pulse-heart" style={{ animationDelay: '0.3s' }}>🌷</span>
          <span className="text-2xl animate-pulse-heart" style={{ animationDelay: '0.6s' }}>💖</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Hecho con <span className="text-pink-600 dark:text-pink-400 animate-pulse-heart inline-block">❤️</span> por <span className="font-semibold text-pink-600 dark:text-pink-400">José</span> para <span className="font-semibold text-purple-600 dark:text-purple-400">Génesis Nayely</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Desde el 26 de octubre de 2025 💑
        </p>
      </footer>
      
      {/* Reproductor de YouTube oculto (solo audio) */}
      {curtainOpen && (
        <div className="fixed bottom-0 right-0 opacity-0 pointer-events-none" style={{ width: '1px', height: '1px', overflow: 'hidden' }}>
          <div ref={youtubeIframeRef}></div>
        </div>
      )}
    </main>
    </>
  )
}

