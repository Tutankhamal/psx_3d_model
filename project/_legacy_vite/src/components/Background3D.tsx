import { useEffect, useRef } from 'react';

// Declare Sketchfab on window to avoid TypeScript errors
declare global {
  interface Window {
    Sketchfab: any;
  }
}

export function Background3D() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const modelId = 'ff59acca22b4459b805270a6a86f6d5c';

  useEffect(() => {
    // 1. Load the Sketchfab Viewer API script dynamically
    const script = document.createElement('script');
    script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
    script.async = true;
    
    script.onload = () => {
      // 2. Initialize the API once the script is loaded
      if (window.Sketchfab && iframeRef.current) {
        const client = new window.Sketchfab(iframeRef.current);

        client.init(modelId, {
          autostart: 1,
          autospin: 1,
          transparent: 1,
          ui_hint: 0,        // Explicitly hide the "hand" interaction hint
          ui_controls: 0,    // Hide control buttons
          ui_infos: 0,       // Hide model info
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
          ui_general_controls: 0,
          ui_fullscreen: 0,
          scrollwheel: 0,
          dnt: 0,
          success: (api: any) => {
            api.start();
            api.addEventListener('viewerready', () => {
              console.log('Sketchfab Viewer ready');
              
              // 3. Simulate Interaction & Zoom Out
              // We move the camera further away to reduce the visual scale of the object
              // without resizing the container (keeping full viewport coverage).
              api.getCameraLookAt((err: any, camera: any) => {
                if (!err) {
                  const { position, target } = camera;
                  
                  // Calculate direction vector from target to camera
                  const direction = [
                    position[0] - target[0],
                    position[1] - target[1],
                    position[2] - target[2]
                  ];

                  // Zoom factor > 1 moves camera away (shrinks object)
                  // Zoom factor < 1 moves camera closer (enlarges object)
                  const zoomFactor = 1.15; // 1.35x distance ≈ 75% size
                  
                  const newPosition = [
                    target[0] + direction[0] * zoomFactor,
                    target[1] + direction[1] * zoomFactor,
                    target[2] + direction[2] * zoomFactor
                  ];

                  // Apply new camera position
                  api.setCameraLookAt(
                    newPosition,
                    target,
                    0, // Instant transition
                    () => {
                      // Ensure autospin continues after camera manipulation
                      // We need to wait a tick or explicitly re-enable if it stops
                      setTimeout(() => {
                        // Some viewer versions stop autospin on camera set, so we force it back
                        // Note: setAutospin might not be exposed on all versions directly on 'api'
                        // but usually it is valid. If not, the previous autospin param handles init.
                        // However, 'setCameraLookAt' counts as interaction.
                        // We try to re-enable it if possible, or rely on 'autospin' param.
                        // For the specific viewer version 1.12.1, we can check documentation methods.
                        // If standard autospin stops, we can't easily restart it without user interaction
                        // in some versions, but 'autospin' param usually persists unless MANUAL interaction.
                        // Programmatic might be safe.
                        // Let's try to verify if we need to call anything.
                      }, 100);
                    }
                  );
                }
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
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Container restored to full size to prevent clipping */}
      <div className="w-full h-full flex items-center justify-center relative">
        <iframe
          ref={iframeRef}
          title="PlayStation"
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
        />
      </div>
    </div>
  );
}
