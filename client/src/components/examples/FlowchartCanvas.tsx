import { ReactFlowProvider } from 'reactflow';
import FlowchartCanvas from '../FlowchartCanvas';

export default function FlowchartCanvasExample() {
  return (
    <ReactFlowProvider>
      <div className="h-screen w-full">
        <FlowchartCanvas />
      </div>
    </ReactFlowProvider>
  );
}
