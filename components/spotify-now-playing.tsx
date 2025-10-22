"use client";

import { useState } from "react";
import { useSpotify } from "@/hooks/use-spotify";
import { generateSpotifyAuthUrl } from "@/lib/spotify-auth";
import { Music, Play, Pause, ExternalLink, Link, Settings } from "lucide-react";
import Image from "next/image";
import { SpotifySetupGuide } from "./spotify-setup-guide";

export function SpotifyNowPlaying() {
  const { currentTrack, isLoading, error, isRealData } = useSpotify();
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const handleConnectSpotify = () => {
    try {
      const authUrl = generateSpotifyAuthUrl();
      window.open(authUrl, '_blank', 'width=500,height=600');
    } catch (error) {
      console.error('Error opening Spotify auth:', error);
      setShowSetupGuide(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/10 rounded-xl animate-pulse">
        <div className="w-12 h-12 bg-white/10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-white/10 rounded w-3/4" />
          <div className="h-2 bg-white/10 rounded w-1/2" />
        </div>
        <div className="w-6 h-6 bg-white/10 rounded" />
      </div>
    );
  }

  if (error || !currentTrack) {
    return (
      <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
            <Music className="w-6 h-6 text-white/60" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-white/60 font-mono">
              No listening to Spotify
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleConnectSpotify}
            className="flex-1 px-3 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white text-xs font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Link className="w-3 h-3" />
            Connect Spotify
          </button>
          <button
            onClick={() => setShowSetupGuide(true)}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
            title="Setup Guide"
          >
            <Settings className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = (currentTrack.progress / currentTrack.duration) * 100;

  return (
    <div className="group relative">
      <a
        href={currentTrack.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-3 bg-gradient-to-br from-[#1DB954]/10 via-white/[0.02] to-white/[0.02] border border-[#1DB954]/20 rounded-xl hover:border-[#1DB954]/40 hover:from-[#1DB954]/15 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10">
            {currentTrack.image ? (
              <Image
                src={currentTrack.image}
                alt={`${currentTrack.album} cover`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music className="w-6 h-6 text-white/60" />
              </div>
            )}
            
            {/* Indicator de reproducción */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              {currentTrack.isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse" />
                <span className="text-xs font-mono text-[#1DB954] uppercase tracking-wider">
                  {currentTrack.isPlaying ? "Now Playing" : "Paused"}
                </span>
              </div>
              {!isRealData && (
                <span className="text-xs text-white/40 font-mono">demo</span>
              )}
            </div>
            
            <p className="text-sm font-semibold text-white truncate">
              {currentTrack.name}
            </p>
            <p className="text-xs text-white/60 truncate">
              by {currentTrack.artist}
            </p>

            {/* Progress bar */}
            <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1DB954] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors flex-shrink-0" />
        </div>
      </a>

      {/* Subtle Spotify branding */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#1DB954] rounded-full opacity-60" />
      
      {/* Setup Guide Modal */}
      {showSetupGuide && (
        <div className="fixed inset-0 z-50">
          <SpotifySetupGuide />
          <div 
            className="absolute inset-0 bg-black/80"
            onClick={() => setShowSetupGuide(false)}
          />
        </div>
      )}
    </div>
  );
}