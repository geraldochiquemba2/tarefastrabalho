import { useCallback, useState, useEffect, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomFlowNode from './CustomFlowNode';
import NodeDetailPanel from './NodeDetailPanel';
import { FlowNode } from '@/lib/flowchartData';
import { getFlowchartData } from '@/lib/flowcharts';

interface FlowchartCanvasProps {
  taskId?: number;
}

export default function FlowchartCanvas({ taskId = 1 }: FlowchartCanvasProps) {
  const nodeTypes = useMemo(() => ({ custom: CustomFlowNode }), []);
  const flowchartData = getFlowchartData(taskId);
  const [nodes, setNodes, onNodesChange] = useNodesState(flowchartData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowchartData.edges);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);

  useEffect(() => {
    const data = getFlowchartData(taskId);
    setNodes(data.nodes);
    setEdges(data.edges);
    setSelectedNode(null);
  }, [taskId, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as FlowNode);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-background"
        data-testid="flowchart-canvas"
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <Controls className="bg-card border-card-border" data-testid="flow-controls" />
        <MiniMap
          className="bg-card border-card-border"
          nodeColor={(node) => {
            const nodeData = node.data as any;
            switch (nodeData.type) {
              case 'start':
              case 'end':
                return 'hsl(150 65% 40%)';
              case 'gateway':
                return 'hsl(45 93% 47%)';
              case 'book':
                return 'hsl(210 85% 45%)';
              case 'author':
                return 'hsl(280 70% 48%)';
              case 'category':
                return 'hsl(25 90% 48%)';
              default:
                return 'hsl(210 8% 86%)';
            }
          }}
        />
      </ReactFlow>
      
      <NodeDetailPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
}
