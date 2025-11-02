import { Edge } from 'reactflow';
import { FlowNode } from '../flowchartData';

export const task3Nodes: FlowNode[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 400, y: 50 },
    data: {
      label: 'Início',
      type: 'start',
      description: 'Início do processo de checkout',
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 150 },
    data: {
      label: 'Revisar Carrinho',
      type: 'process',
      description: 'Usuário visualiza itens',
      details: ['Mostrar produtos', 'Exibir quantidades', 'Calcular subtotal'],
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 400, y: 250 },
    data: {
      label: 'Carrinho Vazio?',
      type: 'gateway',
      description: 'Verificar se há produtos',
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 650, y: 250 },
    data: {
      label: 'Notificar Carrinho Vazio',
      type: 'process',
      description: 'Impossível prosseguir',
    },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 650, y: 350 },
    data: {
      label: 'Fim',
      type: 'end',
      description: 'Checkout cancelado',
    },
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 400, y: 380 },
    data: {
      label: 'Inserir Endereço de Entrega',
      type: 'process',
      description: 'Dados de envio',
      details: ['CEP', 'Rua e número', 'Complemento', 'Cidade/Estado'],
    },
  },
  {
    id: '7',
    type: 'custom',
    position: { x: 400, y: 480 },
    data: {
      label: 'Validar Endereço',
      type: 'process',
      description: 'Verificar dados de entrega',
    },
  },
  {
    id: '8',
    type: 'custom',
    position: { x: 400, y: 580 },
    data: {
      label: 'Endereço Válido?',
      type: 'gateway',
      description: 'Dados completos?',
    },
  },
  {
    id: '9',
    type: 'custom',
    position: { x: 650, y: 580 },
    data: {
      label: 'Solicitar Correção',
      type: 'process',
      description: 'Exibir erros',
    },
  },
  {
    id: '10',
    type: 'custom',
    position: { x: 400, y: 720 },
    data: {
      label: 'Calcular Frete',
      type: 'process',
      description: 'Consultar transportadora',
      details: ['Calcular peso total', 'Consultar tabela de preços', 'Estimar prazo'],
    },
  },
  {
    id: '11',
    type: 'custom',
    position: { x: 400, y: 820 },
    data: {
      label: 'Selecionar Forma de Pagamento',
      type: 'process',
      description: 'Escolher método',
      details: ['Cartão de crédito', 'PIX', 'Boleto'],
    },
  },
  {
    id: '12',
    type: 'custom',
    position: { x: 400, y: 920 },
    data: {
      label: 'Inserir Dados de Pagamento',
      type: 'process',
      description: 'Informações financeiras',
    },
  },
  {
    id: '13',
    type: 'custom',
    position: { x: 400, y: 1020 },
    data: {
      label: 'Validar Dados de Pagamento',
      type: 'process',
      description: 'Verificar informações',
    },
  },
  {
    id: '14',
    type: 'custom',
    position: { x: 400, y: 1120 },
    data: {
      label: 'Dados Válidos?',
      type: 'gateway',
      description: 'Pagamento correto?',
    },
  },
  {
    id: '15',
    type: 'custom',
    position: { x: 650, y: 1120 },
    data: {
      label: 'Exibir Erro',
      type: 'process',
      description: 'Solicitar revisão',
    },
  },
  {
    id: '16',
    type: 'custom',
    position: { x: 400, y: 1260 },
    data: {
      label: 'Processar Pagamento',
      type: 'process',
      description: 'Gateway de pagamento',
      details: ['Enviar dados ao gateway', 'Aguardar confirmação'],
    },
  },
  {
    id: '17',
    type: 'custom',
    position: { x: 400, y: 1360 },
    data: {
      label: 'Pagamento Aprovado?',
      type: 'gateway',
      description: 'Transação autorizada?',
    },
  },
  {
    id: '18',
    type: 'custom',
    position: { x: 650, y: 1460 },
    data: {
      label: 'Notificar Pagamento Recusado',
      type: 'process',
      description: 'Informar erro na transação',
    },
  },
  {
    id: '19',
    type: 'custom',
    position: { x: 650, y: 1560 },
    data: {
      label: 'Sugerir Outro Método',
      type: 'process',
      description: 'Tentar outra forma de pagamento',
    },
  },
  {
    id: '20',
    type: 'custom',
    position: { x: 400, y: 1500 },
    data: {
      label: 'Criar Pedido',
      type: 'process',
      description: 'Registrar no sistema',
      details: ['Gerar número do pedido', 'Salvar no banco de dados'],
    },
  },
  {
    id: '21',
    type: 'custom',
    position: { x: 400, y: 1600 },
    data: {
      label: 'Atualizar Estoque',
      type: 'process',
      description: 'Decrementar produtos',
    },
  },
  {
    id: '22',
    type: 'custom',
    position: { x: 400, y: 1700 },
    data: {
      label: 'Enviar Email de Confirmação',
      type: 'process',
      description: 'Notificar cliente',
      details: ['Detalhes do pedido', 'Código de rastreamento', 'Nota fiscal'],
    },
  },
  {
    id: '23',
    type: 'custom',
    position: { x: 400, y: 1800 },
    data: {
      label: 'Notificar Vendedor',
      type: 'process',
      description: 'Alerta de novo pedido',
    },
  },
  {
    id: '24',
    type: 'custom',
    position: { x: 400, y: 1900 },
    data: {
      label: 'Limpar Carrinho',
      type: 'process',
      description: 'Esvaziar lista de itens',
    },
  },
  {
    id: '25',
    type: 'custom',
    position: { x: 400, y: 2000 },
    data: {
      label: 'Fim',
      type: 'end',
      description: 'Checkout concluído com sucesso',
    },
  },
];

export const task3Edges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', label: 'Sim', style: { stroke: '#dc2626' } },
  { id: 'e4-5', source: '4', target: '5', style: { stroke: '#dc2626' } },
  { id: 'e3-6', source: '3', target: '6', label: 'Não', style: { stroke: '#16a34a' } },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e7-8', source: '7', target: '8', animated: true },
  { id: 'e8-9', source: '8', target: '9', label: 'Não', style: { stroke: '#dc2626' } },
  { id: 'e9-6', source: '9', target: '6', type: 'smoothstep', style: { stroke: '#dc2626', strokeDasharray: '5,5' } },
  { id: 'e8-10', source: '8', target: '10', label: 'Sim', style: { stroke: '#16a34a' } },
  { id: 'e10-11', source: '10', target: '11', animated: true },
  { id: 'e11-12', source: '11', target: '12', animated: true },
  { id: 'e12-13', source: '12', target: '13', animated: true },
  { id: 'e13-14', source: '13', target: '14', animated: true },
  { id: 'e14-15', source: '14', target: '15', label: 'Não', style: { stroke: '#dc2626' } },
  { id: 'e15-11', source: '15', target: '11', type: 'smoothstep', style: { stroke: '#dc2626', strokeDasharray: '5,5' } },
  { id: 'e14-16', source: '14', target: '16', label: 'Sim', style: { stroke: '#16a34a' } },
  { id: 'e16-17', source: '16', target: '17', animated: true },
  { id: 'e17-18', source: '17', target: '18', label: 'Não', style: { stroke: '#dc2626' } },
  { id: 'e18-19', source: '18', target: '19', style: { stroke: '#dc2626' } },
  { id: 'e19-11', source: '19', target: '11', type: 'smoothstep', style: { stroke: '#f59e0b' } },
  { id: 'e17-20', source: '17', target: '20', label: 'Sim', style: { stroke: '#16a34a' } },
  { id: 'e20-21', source: '20', target: '21', animated: true },
  { id: 'e21-22', source: '21', target: '22', animated: true },
  { id: 'e22-23', source: '22', target: '23', animated: true },
  { id: 'e23-24', source: '23', target: '24', animated: true },
  { id: 'e24-25', source: '24', target: '25', animated: true },
];
