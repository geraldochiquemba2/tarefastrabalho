import { Edge } from 'reactflow';
import { FlowNode } from '../flowchartData';

export const task2Nodes: FlowNode[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 400, y: 50 },
    data: {
      label: 'Início',
      type: 'start',
      description: 'Início do processo de login',
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 150 },
    data: {
      label: 'Exibir Tela de Login',
      type: 'process',
      description: 'Mostrar formulário de autenticação',
      details: ['Campo: Email/Username', 'Campo: Senha', 'Opção: Lembrar-me'],
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 400, y: 280 },
    data: {
      label: 'Usuário Insere Credenciais',
      type: 'process',
      description: 'Entrada de dados de login',
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 400, y: 380 },
    data: {
      label: 'Validar Formato dos Dados',
      type: 'process',
      description: 'Verificar campos obrigatórios',
      details: ['Email válido?', 'Senha preenchida?'],
    },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 400, y: 480 },
    data: {
      label: 'Dados Válidos?',
      type: 'gateway',
      description: 'Verificar se formulário está correto',
    },
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 650, y: 480 },
    data: {
      label: 'Exibir Erro de Validação',
      type: 'process',
      description: 'Mostrar mensagens de erro',
    },
  },
  {
    id: '7',
    type: 'custom',
    position: { x: 400, y: 620 },
    data: {
      label: 'Enviar Credenciais ao Servidor',
      type: 'process',
      description: 'Requisição de autenticação',
      details: ['POST /api/auth/login', 'Enviar email e senha criptografada'],
    },
  },
  {
    id: '8',
    type: 'custom',
    position: { x: 400, y: 720 },
    data: {
      label: 'Verificar Credenciais no Banco',
      type: 'process',
      description: 'Buscar usuário e comparar senha',
    },
  },
  {
    id: '9',
    type: 'custom',
    position: { x: 400, y: 820 },
    data: {
      label: 'Credenciais Corretas?',
      type: 'gateway',
      description: 'Autenticação bem-sucedida?',
    },
  },
  {
    id: '10',
    type: 'custom',
    position: { x: 650, y: 920 },
    data: {
      label: 'Registrar Tentativa Falha',
      type: 'process',
      description: 'Log de segurança',
    },
  },
  {
    id: '11',
    type: 'custom',
    position: { x: 650, y: 1020 },
    data: {
      label: 'Exibir Erro de Login',
      type: 'process',
      description: 'Credenciais inválidas',
      details: ['Mensagem: Email ou senha incorretos'],
    },
  },
  {
    id: '12',
    type: 'custom',
    position: { x: 650, y: 1120 },
    data: {
      label: 'Oferecer Recuperação de Senha',
      type: 'process',
      description: 'Link para redefinir senha',
    },
  },
  {
    id: '13',
    type: 'custom',
    position: { x: 400, y: 960 },
    data: {
      label: 'Gerar Token de Sessão',
      type: 'process',
      description: 'Criar JWT ou session ID',
      details: ['Gerar token JWT', 'Definir tempo de expiração'],
    },
  },
  {
    id: '14',
    type: 'custom',
    position: { x: 400, y: 1060 },
    data: {
      label: 'Armazenar Sessão',
      type: 'process',
      description: 'Salvar no cookie/localStorage',
      details: ['Salvar token', 'Configurar httpOnly cookie'],
    },
  },
  {
    id: '15',
    type: 'custom',
    position: { x: 400, y: 1160 },
    data: {
      label: 'Carregar Perfil do Usuário',
      type: 'process',
      description: 'Buscar dados do usuário logado',
    },
  },
  {
    id: '16',
    type: 'custom',
    position: { x: 400, y: 1260 },
    data: {
      label: 'Redirecionar para Dashboard',
      type: 'process',
      description: 'Navegação pós-login',
    },
  },
  {
    id: '17',
    type: 'custom',
    position: { x: 400, y: 1360 },
    data: {
      label: 'Fim',
      type: 'end',
      description: 'Login concluído com sucesso',
    },
  },
];

export const task2Edges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6', label: 'Não', style: { stroke: '#dc2626' } },
  { id: 'e6-2', source: '6', target: '2', type: 'smoothstep', style: { stroke: '#dc2626', strokeDasharray: '5,5' } },
  { id: 'e5-7', source: '5', target: '7', label: 'Sim', style: { stroke: '#16a34a' } },
  { id: 'e7-8', source: '7', target: '8', animated: true },
  { id: 'e8-9', source: '8', target: '9', animated: true },
  { id: 'e9-10', source: '9', target: '10', label: 'Não', style: { stroke: '#dc2626' } },
  { id: 'e10-11', source: '10', target: '11', style: { stroke: '#dc2626' } },
  { id: 'e11-12', source: '11', target: '12', style: { stroke: '#dc2626' } },
  { id: 'e12-2', source: '12', target: '2', type: 'smoothstep', style: { stroke: '#f59e0b' } },
  { id: 'e9-13', source: '9', target: '13', label: 'Sim', style: { stroke: '#16a34a' } },
  { id: 'e13-14', source: '13', target: '14', animated: true },
  { id: 'e14-15', source: '14', target: '15', animated: true },
  { id: 'e15-16', source: '15', target: '16', animated: true },
  { id: 'e16-17', source: '16', target: '17', animated: true },
];
