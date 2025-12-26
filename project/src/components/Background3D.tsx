'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Sketchfab: any;
  }
}

export function Background3D() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const modelId = '8d7bfeb3f112498a905b77643638df89';
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
    script.async = true;
    
    script.onload = () => {
      if (window.Sketchfab && iframeRef.current) {
        const client = new window.Sketchfab(iframeRef.current);

        client.init(modelId, {
          autostart: 1,
          autospin: 1,
          transparent: 1,
          ui_hint: 0,
          ui_infos: 0,
          ui_stop: 0,
          ui_watermark: 0,
          ui_ar: 0,
          ui_vr: 0,
          ui_help: 0,
          ui_theme: 'dark',
          ui_settings: 0,
          ui_inspector: 0,
          ui_animations: 0,
          ui_annotations: 0,
          ui_general_controls: 1,
          ui_controls: 1,
          ui_fullscreen: 0,
          scrollwheel: 1,
          dnt: 1,
          success: (api: any) => {
            api.start();
            api.addEventListener('viewerready', () => {
              console.log('Sketchfab Viewer ready');
              
              // Simplificado e Limpo: Sem loops, sem stuttering.
              // Apenas definimos a posição ideal UMA vez.
              
              api.getCameraLookAt((err: any, camera: any) => {
                if (err) return;

                const { target } = camera;

                // Configuração Fixa e Robusta:
                // 1. Angulo "De cima para baixo" (High Elevation): Y elevado.
                // 2. Tamanho ~75% (Distance): Z afastado o suficiente.
                
                // Posição calculada manualmente para um "Top-Down Isometric" agradável
                // X: 0 (Centralizado)
                // Y: 6 (Bem alto para ver o topo do console)
                // Z: 10.8 (Afastado +20% para dar mais margem)
                
                const idealPosition = [1.5, 0, 0.5]; 

                // Aplica instantaneamente (duration 0) para não haver transição visível
                api.setCameraLookAt(idealPosition, target, 0);
              });
            });
          },
          error: (err: any) => {
            console.error('Sketchfab init error:', err);
          },
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-full h-full flex items-center justify-center overflow-hidden">
      <div className="w-full h-full flex items-center justify-center relative pointer-events-auto">
        <iframe
          ref={iframeRef}
          title="PS1 With Feat Effect Disc"
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
        />
      </div>
    </div>
  );
}
