import { X, Book, User, Tag, GitBranch, Play, CheckCircle2, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FlowNode } from '@/lib/flowchartData';

interface NodeDetailPanelProps {
  node: FlowNode | null;
  onClose: () => void;
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

const nodeTypeLabels: Record<string, string> = {
  start: 'Início',
  end: 'Fim',
  process: 'Processo',
  gateway: 'Decisão',
  book: 'Livro',
  author: 'Autor',
  category: 'Categoria',
};

export default function NodeDetailPanel({ node, onClose }: NodeDetailPanelProps) {
  if (!node) return null;

  const Icon = nodeIcons[node.data.type] || Database;
  const typeLabel = nodeTypeLabels[node.data.type] || 'Processo';

  return (
    <div
      className="absolute top-0 right-0 h-full w-96 bg-card border-l border-card-border shadow-xl z-50 animate-in slide-in-from-right duration-300"
      data-testid="node-detail-panel"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-card-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                {typeLabel}
              </div>
              <div className="font-semibold">{node.data.label}</div>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-panel"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {node.data.description && (
            <div>
              <h3 className="text-sm font-medium mb-2">Descrição</h3>
              <p className="text-sm text-muted-foreground">
                {node.data.description}
              </p>
            </div>
          )}

          {node.data.details && node.data.details.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Detalhes</h3>
              <div className="space-y-2">
                {node.data.details.map((detail, index) => (
                  <Card key={index} className="p-3">
                    <p className="text-sm">{detail}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {node.data.type === 'book' && (
            <div>
              <h3 className="text-sm font-medium mb-3">Sistema de Etiquetas</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="destructive">Vermelha</Badge>
                  <span className="text-sm text-muted-foreground">Ficção</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-label-yellow text-foreground">Amarela</Badge>
                  <span className="text-sm text-muted-foreground">Não-Ficção</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Branca</Badge>
                  <span className="text-sm text-muted-foreground">Referência</span>
                </div>
              </div>
            </div>
          )}

          {node.data.type === 'gateway' && (
            <div>
              <h3 className="text-sm font-medium mb-3">Ponto de Decisão</h3>
              <Card className="p-4 bg-flow-warning/5">
                <p className="text-sm text-muted-foreground">
                  Este é um ponto de decisão no fluxo. O processo segue
                  diferentes caminhos baseado na condição avaliada.
                </p>
              </Card>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-card-border">
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
            data-testid="button-close"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
