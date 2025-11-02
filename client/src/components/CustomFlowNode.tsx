import { Handle, Position, NodeProps } from 'reactflow';
import { Book, User, Tag, GitBranch, Play, CheckCircle2, Camera, Printer, Database, Bell, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CustomNodeData {
  label: string;
  description?: string;
  type: 'start' | 'end' | 'process' | 'gateway' | 'book' | 'author' | 'category';
  details?: string[];
  icon?: string;
}

const nodeIcons: Record<string, any> = {
  start: Play,
  end: CheckCircle2,
  process: Database,
  gateway: GitBranch,
  book: Book,
  author: User,
  category: Tag,
};

export default function CustomFlowNode({ data, selected }: NodeProps<CustomNodeData>) {
  const Icon = nodeIcons[data.type] || Database;
  
  const getNodeStyles = () => {
    const baseStyles = "px-6 py-4 rounded-lg border-2 shadow-md transition-all duration-200 hover-elevate min-w-48";
    
    switch (data.type) {
      case 'start':
        return `${baseStyles} bg-flow-success/10 border-flow-success text-foreground`;
      case 'end':
        return `${baseStyles} bg-flow-success/10 border-flow-success text-foreground`;
      case 'gateway':
        return `${baseStyles} bg-flow-warning/10 border-flow-warning text-foreground rotate-0`;
      case 'book':
        return `${baseStyles} bg-flow-book/10 border-flow-book text-foreground`;
      case 'author':
        return `${baseStyles} bg-flow-author/10 border-flow-author text-foreground`;
      case 'category':
        return `${baseStyles} bg-flow-category/10 border-flow-category text-foreground`;
      default:
        return `${baseStyles} bg-card border-card-border text-card-foreground`;
    }
  };

  const isGateway = data.type === 'gateway';

  return (
    <div className={`relative ${selected ? 'ring-2 ring-ring ring-offset-2 ring-offset-background' : ''}`}>
      {data.type !== 'start' && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 !bg-primary"
        />
      )}
      
      <div className={getNodeStyles()} data-testid={`node-${data.type}`}>
        <div className="flex flex-col items-center gap-2 text-center">
          <Icon className="w-5 h-5" />
          <div className="font-medium text-sm">{data.label}</div>
          {data.description && (
            <div className="text-xs text-muted-foreground max-w-44">
              {data.description}
            </div>
          )}
          {data.type === 'book' && (
            <div className="flex gap-1 mt-1">
              <Badge variant="destructive" className="text-xs px-1.5 py-0.5">Vermelha</Badge>
              <Badge className="text-xs px-1.5 py-0.5 bg-label-yellow text-foreground">Amarela</Badge>
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">Branca</Badge>
            </div>
          )}
        </div>
      </div>

      {data.type !== 'end' && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 !bg-primary"
        />
      )}
    </div>
  );
}
