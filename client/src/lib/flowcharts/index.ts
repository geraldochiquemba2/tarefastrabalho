import { flowchartNodes as task1Nodes, flowchartEdges as task1Edges } from '../flowchartData';
import { task2Nodes, task2Edges } from './task2';
import { task3Nodes, task3Edges } from './task3';
import { task4Nodes, task4Edges } from './task4';
import { FlowNode } from '../flowchartData';
import { Edge } from 'reactflow';

export interface FlowchartData {
  nodes: FlowNode[];
  edges: Edge[];
}

export function getFlowchartData(taskId: number): FlowchartData {
  switch (taskId) {
    case 1:
      return { nodes: task1Nodes, edges: task1Edges };
    case 2:
      return { nodes: task2Nodes, edges: task2Edges };
    case 3:
      return { nodes: task3Nodes, edges: task3Edges };
    case 4:
      return { nodes: task4Nodes, edges: task4Edges };
    default:
      return { nodes: [], edges: [] };
  }
}
