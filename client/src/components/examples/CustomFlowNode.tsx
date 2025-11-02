import { ReactFlowProvider } from 'reactflow';
import CustomFlowNode from '../CustomFlowNode';

export default function CustomFlowNodeExample() {
  const exampleNodes = [
    {
      id: '1',
      data: {
        label: 'Início',
        description: 'Início do processo',
        type: 'start' as const,
      },
      selected: false,
    },
    {
      id: '2',
      data: {
        label: 'Validar Dados',
        description: 'Verificar integridade',
        type: 'process' as const,
        details: ['Campo obrigatório', 'Verificar duplicatas'],
      },
      selected: false,
    },
    {
      id: '3',
      data: {
        label: 'Tipo de Cadastro?',
        description: 'Decisão do tipo',
        type: 'gateway' as const,
      },
      selected: true,
    },
  ];

  return (
    <ReactFlowProvider>
      <div className="p-8 space-y-8 bg-background">
        {exampleNodes.map((node) => (
          <div key={node.id} className="inline-block">
            <CustomFlowNode
              id={node.id}
              data={node.data}
              selected={node.selected}
              type="custom"
              xPos={0}
              yPos={0}
              dragging={false}
              isConnectable={true}
              zIndex={0}
            />
          </div>
        ))}
      </div>
    </ReactFlowProvider>
  );
}
