"use client";

import { useState, useEffect } from "react";
import { refreshAccessToken } from "@/lib/spotify-auth";

export interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  isPlaying: boolean;
  progress: number;
  duration: number;
}

export function useSpotify() {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRealData, setIsRealData] = useState(false);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      // Timeout para evitar carga infinita
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        console.log('⏰ Timeout en carga de Spotify - mostrando botón conectar');
      }, 3000);

      try {
        // Verificar si hay un access token almacenado (de OAuth)
        let accessToken = localStorage.getItem('spotify_access_token');
        const refreshToken = localStorage.getItem('spotify_refresh_token');
        const tokenExpires = localStorage.getItem('spotify_token_expires');
        
        // Verificar si el token ha expirado
        if (accessToken && tokenExpires && refreshToken) {
          const now = Date.now();
          const expirationTime = parseInt(tokenExpires);
          
          if (now >= expirationTime) {
            try {
              // Renovar el token
              accessToken = await refreshAccessToken(refreshToken);
              localStorage.setItem('spotify_access_token', accessToken);
              localStorage.setItem('spotify_token_expires', (now + (3600 * 1000)).toString()); // 1 hora
            } catch (refreshError) {
              console.error('Failed to refresh token:', refreshError);
              // Limpiar tokens inválidos
              localStorage.removeItem('spotify_access_token');
              localStorage.removeItem('spotify_refresh_token');
              localStorage.removeItem('spotify_token_expires');
              accessToken = null;
            }
          }
        }
        
        if (accessToken) {
          // Intentar obtener la canción actual del usuario
          const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (response.status === 200) {
            // Verificar si hay contenido en la respuesta
            const responseText = await response.text();
            if (responseText) {
              const data = JSON.parse(responseText);
              if (data && data.item) {
                setCurrentTrack({
                  name: data.item.name,
                  artist: data.item.artists.map((artist: any) => artist.name).join(', '),
                  album: data.item.album.name,
                  image: data.item.album.images[0]?.url || '',
                  url: data.item.external_urls.spotify,
                  isPlaying: data.is_playing,
                  progress: data.progress_ms || 0,
                  duration: data.item.duration_ms || 0,
                });
                setIsRealData(true);
                setIsLoading(false);
                clearTimeout(timeoutId);
                return;
              }
            }
          } else if (response.status === 401) {
            // Token expirado, remover
            localStorage.removeItem('spotify_access_token');
          }
        }

        // Si no hay token válido o no hay reproducción, mostrar datos simulados
        const mockTracks = [
          {
            name: "As It Was",
            artist: "Harry Styles",
            album: "Harry's House",
            image: "https://i.scdn.co/image/ab67616d0000b273be841ba4bc24340152e3a79a",
            url: "https://open.spotify.com/track/4Dvkj6JhhA12EX05fT7y2e",
          },
          {
            name: "Heat Waves",
            artist: "Glass Animals",
            album: "Dreamland",
            image: "https://i.scdn.co/image/ab67616d0000b273f5b2b848b87bb12eb908e0ca",
            url: "https://open.spotify.com/track/02MWAaffLxlfxAUY7c5dvx",
          },
          {
            name: "Levitating",
            artist: "Dua Lipa",
            album: "Future Nostalgia",
            image: "https://i.scdn.co/image/ab67616d0000b273ef5de3a3c611a6257bf3c2d3",
            url: "https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9",
          },
          {
            name: "Blinding Lights",
            artist: "The Weeknd", 
            album: "After Hours",
            image: "https://i.scdn.co/image/ab67616d0000b273c06f0e8b33d2e7c3c8d8f8c9",
            url: "https://open.spotify.com/track/0VjIjW4GlUZOHFvEj2TrKw",
          }
        ];

        // Seleccionar track aleatorio y simular progreso
        const randomTrack = mockTracks[Math.floor(Math.random() * mockTracks.length)];
        const mockDuration = 180000 + Math.random() * 60000; // 3-4 minutos
        const mockProgress = Math.random() * mockDuration * 0.7; // No más del 70%

        setCurrentTrack({
          ...randomTrack,
          isPlaying: Math.random() > 0.3, // 70% probabilidad de estar reproduciéndose
          progress: mockProgress,
          duration: mockDuration,
        });
        setIsRealData(false);
        setIsLoading(false);
        clearTimeout(timeoutId);
      } catch (err) {
        console.error('Spotify fetch error:', err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setIsLoading(false);
        clearTimeout(timeoutId);
      }
    };

    fetchCurrentTrack();
    
    // Listener para cuando se complete la autenticación
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'SPOTIFY_AUTH_SUCCESS') {
        // Refetch inmediatamente después de la autenticación exitosa
        setTimeout(fetchCurrentTrack, 1000);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchCurrentTrack, 30000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return { currentTrack, isLoading, error, isRealData };
}