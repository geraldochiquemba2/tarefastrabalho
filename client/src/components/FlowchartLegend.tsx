import { Book, User, Tag, GitBranch, Play, CheckCircle2, Database } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function FlowchartLegend() {
  const legendItems = [
    { icon: Play, label: 'Início/Fim', color: 'border-flow-success bg-flow-success/10' },
    { icon: Database, label: 'Processo', color: 'border-card-border bg-card' },
    { icon: GitBranch, label: 'Decisão', color: 'border-flow-warning bg-flow-warning/10' },
    { icon: Book, label: 'Livro', color: 'border-flow-book bg-flow-book/10' },
    { icon: User, label: 'Autor', color: 'border-flow-author bg-flow-author/10' },
    { icon: Tag, label: 'Categoria', color: 'border-flow-category bg-flow-category/10' },
  ];

  return (
    <Card className="p-4" data-testid="flowchart-legend">
      <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4">
        Legenda
      </h3>
      <div className="space-y-3">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`p-2 rounded-md border-2 ${item.color}`}>
              <item.icon className="w-4 h-4" />
            </div>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
