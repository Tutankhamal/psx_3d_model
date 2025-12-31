import { ModelViewer } from '@/components/ModelViewer';

export default function PS1Page() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      <ModelViewer 
        modelId="8d7bfeb3f112498a905b77643638df89"
        title="PS1 With Feat Effect Disc"
        initialPosition={[1.5, 0, 0.5]}
      />
    </div>
  );
}
