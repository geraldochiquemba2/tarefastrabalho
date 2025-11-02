import { useState } from 'react';
import NodeDetailPanel from '../NodeDetailPanel';
import { Button } from '@/components/ui/button';
import { FlowNode } from '@/lib/flowchartData';

export default function NodeDetailPanelExample() {
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);

  const exampleNode: FlowNode = {
    id: '5',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: 'Inserir Dados Manualmente',
      type: 'book',
      description: 'Cadastro manual de livro com todos os campos necessários',
      details: [
        'Campo: Título (obrigatório)',
        'Campo: ISBN',
        'Campo: Editora',
        'Campo: Ano de publicação',
      ],
    },
  };

  return (
    <div className="relative h-screen w-full bg-background">
      <div className="p-8">
        <Button onClick={() => setSelectedNode(exampleNode)} data-testid="button-show-panel">
          Mostrar Painel de Detalhes
        </Button>
        {selectedNode && (
          <p className="mt-4 text-sm text-muted-foreground">
            Painel aberto para: {selectedNode.data.label}
          </p>
        )}
      </div>
      <NodeDetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
}
