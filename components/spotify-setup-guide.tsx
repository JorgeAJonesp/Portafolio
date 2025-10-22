"use client";

import { useState } from "react";
import { Copy, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SpotifySetupGuide() {
  const [copied, setCopied] = useState(false);
  
  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/callback/spotify` : '';

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-white mb-4">
          Configuración de Spotify Developer
        </h3>
        
        <div className="space-y-4 text-sm text-gray-300">
          <p>Para conectar tu Spotify real, necesitas configurar la Redirect URI:</p>
          
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Redirect URI:</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(redirectUri)}
                className="h-6 px-2 text-xs"
              >
                {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
            <code className="text-green-400 text-xs break-all">
              {redirectUri}
            </code>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Pasos:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Ve a <a href="https://developer.spotify.com/dashboard" target="_blank" className="text-green-400 hover:underline">Spotify Developer Dashboard</a></li>
              <li>Abre tu aplicación "PortfolioJones"</li>
              <li>Haz clic en "Edit Settings"</li>
              <li>En "Redirect URIs", agrega la URI de arriba</li>
              <li>Guarda los cambios</li>
            </ol>
          </div>

          <Button 
            onClick={() => window.open('https://developer.spotify.com/dashboard', '_blank')}
            className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white"
            size="sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Ir a Spotify Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}