import { useEffect, useState } from "react";

const _isFullscreen = ()=> !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
export default function useFullscreen(target: Element=document.documentElement): {
  isSupported: boolean;
  isFullscreen: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  toggle: () => Promise<void>;
} {
  const isSupported = document.fullscreenEnabled || (document as any).webkitFullscreenEnabled;
  const [isFullscreen, setFullscreen] = useState<boolean>(_isFullscreen());

  useEffect(() => {
    if (!isSupported) return;
    const onFullscreenChange = () =>
      setFullscreen(_isFullscreen());

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const enter = isSupported ? () => target.requestFullscreen() : async() => { };
  const exit = isSupported ? () => document.exitFullscreen() : async() => { };

  return {
    isSupported,
    isFullscreen,
    enter,
    exit,
    toggle: () => isFullscreen ? exit() : enter()
  };
}