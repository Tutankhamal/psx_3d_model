import { ModelViewer } from '@/components/ModelViewer';

export default function IBMPCPage() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      <ModelViewer 
        modelId="556af16d476d4144bab11ed744a849e6"
        title="IBM PC XT 5150"
        initialPosition={[1.5, 0, 0.5]} // Using same safe initial pos for now, can be adjusted
      />
    </div>
  );
}
