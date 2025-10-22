"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { exchangeCodeForToken } from "@/lib/spotify-auth";

function SpotifyCallbackContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      console.log('🎵 Spotify callback iniciado');
      console.log('URL completa:', window.location.href);
      
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const state = searchParams.get('state');

      console.log('📝 Parámetros del callback:', { 
        code: code ? code.substring(0, 10) + '...' : null, 
        error, 
        state: state ? state.substring(0, 10) + '...' : null 
      });

      if (error) {
        console.error('❌ Error de autenticación Spotify:', error);
        setStatus('error');
        setTimeout(() => {
          if (window.opener) {
            window.opener.postMessage({ type: 'SPOTIFY_AUTH_ERROR', error }, '*');
          }
          window.close();
        }, 3000);
        return;
      }

      if (!code) {
        console.error('❌ No se recibió código de autorización');
        setStatus('error');
        setTimeout(() => {
          if (window.opener) {
            window.opener.postMessage({ type: 'SPOTIFY_AUTH_ERROR', error: 'No authorization code' }, '*');
          }
          window.close();
        }, 3000);
        return;
      }

      try {
        console.log('🔄 Intercambiando código por token...');
        const tokenData = await exchangeCodeForToken(code);
        console.log('✅ Intercambio de token exitoso');
        
        // Guardar tokens y tiempo de expiración
        localStorage.setItem('spotify_access_token', tokenData.accessToken);
        localStorage.setItem('spotify_refresh_token', tokenData.refreshToken);
        localStorage.setItem('spotify_token_expires', (Date.now() + (tokenData.expiresIn * 1000)).toString());
        
        setStatus('success');
        
        // Notificar a la ventana padre que la autenticación fue exitosa
        if (window.opener) {
          window.opener.postMessage({ type: 'SPOTIFY_AUTH_SUCCESS' }, '*');
        }
        
        setTimeout(() => {
          window.close();
        }, 2000);
      } catch (err) {
        console.error('❌ Error intercambiando código:', err);
        setStatus('error');
        setTimeout(() => {
          if (window.opener) {
            window.opener.postMessage({ type: 'SPOTIFY_AUTH_ERROR', error: String(err) }, '*');
          }
          window.close();
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center p-8">
        {status === 'loading' && (
          <>
            <div className="w-8 h-8 border-4 border-[#1DB954] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white">Conectando con Spotify...</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-white">¡Conectado exitosamente!</p>
            <p className="text-gray-400 text-sm mt-2">Esta ventana se cerrará automáticamente...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-white">Error al conectar</p>
            <p className="text-gray-400 text-sm mt-2">Esta ventana se cerrará automáticamente...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function SpotifyCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Cargando...</p>
        </div>
      </div>
    }>
      <SpotifyCallbackContent />
    </Suspense>
  );
}