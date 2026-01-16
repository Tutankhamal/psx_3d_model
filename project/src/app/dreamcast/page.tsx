import { ModelViewer } from '@/components/ModelViewer';

export default function DreamcastPage() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      <ModelViewer 
        modelId="f82d99e4739e42f4abfc37cb97918cfc"
        title="Sega Dreamcast"
        initialPosition={[1.5, 0, 0.5]}
      />
    </div>
  );
}
