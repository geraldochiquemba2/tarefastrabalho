import { Node, Edge } from 'reactflow';

export type NodeType = 'start' | 'end' | 'process' | 'gateway' | 'book' | 'author' | 'category';

export interface FlowNode extends Node {
  data: {
    label: string;
    description?: string;
    type: NodeType;
    details?: string[];
    icon?: string;
  };
}

export const flowchartNodes: FlowNode[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 400, y: 50 },
    data: {
      label: 'Início',
      type: 'start',
      description: 'Início do processo de cadastro',
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 150 },
    data: {
      label: 'Receber Solicitação de Cadastro',
      type: 'process',
      description: 'Sistema recebe a solicitação para cadastrar novo item',
      details: ['Validar permissões do usuário', 'Verificar tipo de cadastro solicitado'],
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 400, y: 280 },
    data: {
      label: 'Tipo de Cadastro?',
      type: 'gateway',
      description: 'Decisão: Livro, Autor ou Categoria?',
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 100, y: 420 },
    data: {
      label: 'Método de Registro?',
      type: 'gateway',
      description: 'Decisão: Manual ou OCR?',
    },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 0, y: 560 },
    data: {
      label: 'Inserir Dados Manualmente',
      type: 'book',
      description: 'Título, ISBN, Editora, Ano',
      details: ['Campo: Título (obrigatório)', 'Campo: ISBN', 'Campo: Editora', 'Campo: Ano de publicação'],
    },
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 200, y: 560 },
    data: {
      label: 'Registro por Captura Fotográfica',
      type: 'book',
      description: 'Processo OCR para extrair dados',
      details: ['Capturar foto da capa/ficha', 'Processar imagem com OCR', 'Extrair dados automaticamente'],
    },
  },
  {
    id: '7',
    type: 'custom',
    position: { x: 400, y: 420 },
    data: {
      label: 'Inserir Dados do Autor',
      type: 'author',
      description: 'Nome, Nacionalidade, Biografia',
      details: ['Campo: Nome completo', 'Campo: Nacionalidade', 'Campo: Biografia (opcional)'],
    },
  },
  {
    id: '8',
    type: 'custom',
    position: { x: 700, y: 420 },
    data: {
      label: 'Criar Nova Categoria',
      type: 'category',
      description: 'Nome, Descrição, Cor',
      details: ['Campo: Nome da categoria', 'Campo: Descrição', 'Seletor: Cor de identificação'],
    },
  },
  {
    id: '9',
    type: 'custom',
    position: { x: 400, y: 700 },
    data: {
      label: 'Validar Dados no Sistema',
      type: 'process',
      description: 'Verificar integridade e completude dos dados',
      details: ['Validar campos obrigatórios', 'Verificar duplicatas', 'Checar formato dos dados'],
    },
  },
  {
    id: '10',
    type: 'custom',
    position: { x: 400, y: 830 },
    data: {
      label: 'Dados Válidos?',
      type: 'gateway',
      description: 'Decisão: Aprovado ou com erros?',
    },
  },
  {
    id: '11',
    type: 'custom',
    position: { x: 650, y: 830 },
    data: {
      label: 'Solicitar Correção',
      type: 'process',
      description: 'Exibir erros e solicitar ajustes',
      details: ['Listar campos com erro', 'Exibir mensagens de validação'],
    },
  },
  {
    id: '12',
    type: 'custom',
    position: { x: 400, y: 970 },
    data: {
      label: 'Registrar no Banco de Dados',
      type: 'process',
      description: 'Persistir informações no sistema',
      details: ['Inserir registro no banco', 'Criar relacionamentos necessários'],
    },
  },
  {
    id: '13',
    type: 'custom',
    position: { x: 400, y: 1100 },
    data: {
      label: 'Atribuir Código Único',
      type: 'process',
      description: 'Gerar identificador único para o item',
      details: ['Gerar UUID ou código sequencial', 'Associar ao registro'],
    },
  },
  {
    id: '14',
    type: 'custom',
    position: { x: 400, y: 1230 },
    data: {
      label: 'É Livro?',
      type: 'gateway',
      description: 'Decisão: Requer etiqueta física?',
    },
  },
  {
    id: '15',
    type: 'custom',
    position: { x: 200, y: 1370 },
    data: {
      label: 'Atribuir Etiqueta',
      type: 'book',
      description: 'Vermelha/Amarela/Branca',
      details: ['Etiqueta Vermelha: Ficção', 'Etiqueta Amarela: Não-Ficção', 'Etiqueta Branca: Referência'],
    },
  },
  {
    id: '16',
    type: 'custom',
    position: { x: 200, y: 1500 },
    data: {
      label: 'Requer Etiqueta Física?',
      type: 'gateway',
      description: 'Decisão: Impressão necessária?',
    },
  },
  {
    id: '17',
    type: 'custom',
    position: { x: 0, y: 1640 },
    data: {
      label: 'Imprimir Etiqueta',
      type: 'process',
      description: 'Gerar e imprimir etiqueta física',
      details: ['Formatar etiqueta para impressão', 'Enviar para impressora'],
    },
  },
  {
    id: '18',
    type: 'custom',
    position: { x: 400, y: 1640 },
    data: {
      label: 'Apenas Registro Digital',
      type: 'process',
      description: 'Etiqueta salva apenas no sistema',
    },
  },
  {
    id: '19',
    type: 'custom',
    position: { x: 400, y: 1780 },
    data: {
      label: 'Notificar Cadastro Concluído',
      type: 'process',
      description: 'Informar sucesso da operação',
      details: ['Exibir mensagem de sucesso', 'Disponibilizar código gerado'],
    },
  },
  {
    id: '20',
    type: 'custom',
    position: { x: 400, y: 1910 },
    data: {
      label: 'Atualizar Catálogo',
      type: 'process',
      description: 'Sincronizar com sistema de busca',
      details: ['Reindexar catálogo', 'Atualizar cache'],
    },
  },
  {
    id: '21',
    type: 'custom',
    position: { x: 400, y: 2040 },
    data: {
      label: 'Fim',
      type: 'end',
      description: 'Processo concluído com sucesso',
    },
  },
];

export const flowchartEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', label: 'Livro', style: { stroke: '#2563eb' } },
  { id: 'e3-7', source: '3', target: '7', label: 'Autor', style: { stroke: '#9333ea' } },
  { id: 'e3-8', source: '3', target: '8', label: 'Categoria', style: { stroke: '#ea580c' } },
  { id: 'e4-5', source: '4', target: '5', label: 'Manual' },
  { id: 'e4-6', source: '4', target: '6', label: 'OCR' },
  { id: 'e5-9', source: '5', target: '9' },
  { id: 'e6-9', source: '6', target: '9' },
  { id: 'e7-9', source: '7', target: '9' },
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e9-10', source: '9', target: '10', animated: true },
  { id: 'e10-11', source: '10', target: '11', label: 'Não', style: { stroke: '#dc2626', strokeDasharray: '5,5' } },
  { id: 'e11-9', source: '11', target: '9', label: 'Corrigir', type: 'smoothstep', style: { stroke: '#dc2626', strokeDasharray: '5,5' } },
  { id: 'e10-12', source: '10', target: '12', label: 'Sim', style: { stroke: '#16a34a' } },
  { id: 'e12-13', source: '12', target: '13', animated: true },
  { id: 'e13-14', source: '13', target: '14', animated: true },
  { id: 'e14-15', source: '14', target: '15', label: 'Sim', style: { stroke: '#2563eb' } },
  { id: 'e14-19', source: '14', target: '19', label: 'Não' },
  { id: 'e15-16', source: '15', target: '16' },
  { id: 'e16-17', source: '16', target: '17', label: 'Sim' },
  { id: 'e16-18', source: '16', target: '18', label: 'Não' },
  { id: 'e17-19', source: '17', target: '19' },
  { id: 'e18-19', source: '18', target: '19' },
  { id: 'e19-20', source: '19', target: '20', animated: true },
  { id: 'e20-21', source: '20', target: '21', animated: true },
];
