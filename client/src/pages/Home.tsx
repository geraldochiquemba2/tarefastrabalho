import FlowchartCanvas from '@/components/FlowchartCanvas';
import FlowchartHeader from '@/components/FlowchartHeader';
import FlowchartLegend from '@/components/FlowchartLegend';

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <FlowchartHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r border-border bg-sidebar p-4 overflow-y-auto">
          <FlowchartLegend />
          
          <div className="mt-6 p-4 rounded-md bg-primary/5 border border-primary/20">
            <h4 className="text-sm font-medium mb-2">Sobre o Fluxo</h4>
            <p className="text-xs text-muted-foreground">
              Este fluxograma representa o processo completo de cadastro no sistema bibliotecário,
              incluindo validação, etiquetagem e sincronização.
            </p>
          </div>
        </div>

        <div className="flex-1">
          <FlowchartCanvas />
        </div>
      </div>
    </div>
  );
}
