import { Workflow, ZoomIn, ZoomOut, Maximize2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function FlowchartHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-primary/10">
          <Workflow className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Fluxograma de Cadastro</h1>
          <p className="text-sm text-muted-foreground">
            Livros, Autores e Categorias
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" data-testid="button-info">
              <Info className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" data-testid="info-popover">
            <div className="space-y-2">
              <h4 className="font-medium">Como usar</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Clique em um nó para ver detalhes</li>
                <li>• Arraste para mover o fluxograma</li>
                <li>• Use os controles para zoom</li>
                <li>• Scroll do mouse para aproximar/afastar</li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
