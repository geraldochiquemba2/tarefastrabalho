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
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomFlowNode from './CustomFlowNode';
import NodeDetailPanel from './NodeDetailPanel';
import { FlowchartToolbar } from './FlowchartToolbar';
import { FlowNode } from '@/lib/flowchartData';
import { getFlowchartData } from '@/lib/flowcharts';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { Task } from '@shared/schema';

interface FlowchartCanvasProps {
  taskId?: number;
}

export default function FlowchartCanvas({ taskId = 1 }: FlowchartCanvasProps) {
  const nodeTypes = useMemo(() => ({ custom: CustomFlowNode }), []);
  const { toast } = useToast();
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  
  const { data: task } = useQuery<Task>({
    queryKey: ["/api/tasks", String(taskId)],
  });

  useEffect(() => {
    if (task?.flowchartData) {
      try {
        const savedData = JSON.parse(task.flowchartData);
        setNodes(savedData.nodes || []);
        setEdges(savedData.edges || []);
      } catch (error) {
        const defaultData = getFlowchartData(taskId);
        setNodes(defaultData.nodes);
        setEdges(defaultData.edges);
      }
    } else {
      const defaultData = getFlowchartData(taskId);
      setNodes(defaultData.nodes);
      setEdges(defaultData.edges);
    }
    setSelectedNode(null);
  }, [taskId, task]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/tasks/${taskId}/flowchart`, {
        nodes,
        edges,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks", String(taskId)] });
      toast({
        title: "Sucesso",
        description: "Fluxograma salvo com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao salvar fluxograma. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds) as FlowNode[]);
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as FlowNode);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleAddNode = useCallback((type: string) => {
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x: 250, y: 250 },
      data: {
        label: type === 'start' ? 'Início' : type === 'end' ? 'Fim' : 'Novo Nó',
        type: type as any,
        description: 'Descrição do novo nó',
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const handleSave = useCallback(() => {
    saveMutation.mutate();
  }, [saveMutation, nodes, edges]);

  return (
    <div className="relative w-full h-full">
      <FlowchartToolbar
        onAddNode={handleAddNode}
        onSave={handleSave}
        isSaving={saveMutation.isPending}
      />
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
        deleteKeyCode="Delete"
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
