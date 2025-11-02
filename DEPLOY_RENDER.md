# Guia de Deploy no Render

Este guia explica como hospedar a aplicação no Render com sistema keep-alive para evitar hibernação.

## Pré-requisitos

1. Conta no [Render](https://render.com) (gratuita)
2. Repositório Git (GitHub, GitLab ou Bitbucket) com o código da aplicação

## Passos para Deploy

### 1. Preparar o Repositório

**IMPORTANTE**: Certifique-se de que o arquivo `package-lock.json` está incluído no repositório. Este arquivo é essencial para o build no Render.

Verifique e commite todos os arquivos:

```bash
# Verificar se package-lock.json existe
ls -la package-lock.json

# Adicionar todos os arquivos (incluindo package-lock.json)
git add .
git commit -m "Configuração para deploy no Render"
git push origin main
```

### 2. Criar Novo Web Service no Render

1. Acesse [Render Dashboard](https://dashboard.render.com/)
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório Git
4. Configure o serviço:

   - **Name**: `flowchart-tasks-app` (ou escolha outro nome)
   - **Region**: Escolha a região mais próxima
   - **Branch**: `main` (ou sua branch principal)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### 3. Configurar Variáveis de Ambiente

Na seção **"Environment Variables"**, adicione:

- **RENDER_EXTERNAL_URL**: A URL do seu serviço (exemplo: `https://flowchart-tasks-app.onrender.com`)
  
  > **Importante**: Após criar o serviço, você receberá a URL. Volte às configurações e adicione esta variável com a URL completa.
  
  > **Nota**: Não configure NODE_ENV=production antes do build, pois isso impede a instalação de ferramentas necessárias (vite, esbuild).

### 4. Deploy Automático

O Render iniciará o deploy automaticamente. O processo inclui:

1. Instalação de dependências
2. Build da aplicação (frontend + backend)
3. Inicialização do servidor
4. Health check no endpoint `/ping`

## Sistema Keep-Alive

A aplicação possui um sistema integrado para evitar hibernação:

### Como Funciona

1. **Endpoint de Saúde**: `/ping`
   - Retorna status do servidor
   - Usado para health checks
   - Resposta: `{ status: "alive", timestamp: "...", uptime: ... }`

2. **Auto-Ping Interno**:
   - Executa a cada 10 minutos
   - Mantém o serviço ativo
   - Requer a variável `RENDER_EXTERNAL_URL` configurada

3. **Logs**:
   - Verifique os logs no Render Dashboard
   - Mensagens: `"Keep-alive: Ping enviado com sucesso"`

### Limitações do Plano Free

- **750 horas/mês** de uptime gratuito
- Suficiente para rodar 24/7 um único serviço
- Servidor hiberna após 15 minutos sem atividade (se keep-alive falhar)
- Cold start: ~30-60 segundos

## Monitoramento Externo (Opcional)

Para maior confiabilidade, use um serviço externo de monitoramento:

### UptimeRobot (Recomendado)

1. Acesse [UptimeRobot](https://uptimerobot.com)
2. Crie conta gratuita
3. Adicione novo monitor:
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://seu-app.onrender.com/ping`
   - **Monitoring Interval**: 5 minutos
   - **Friendly Name**: Flowchart App

### Cron-job.org (Alternativa)

1. Acesse [Cron-job.org](https://cron-job.org)
2. Crie conta gratuita
3. Adicione novo cron job:
   - **URL**: `https://seu-app.onrender.com/ping`
   - **Schedule**: `*/10 * * * *` (a cada 10 minutos)

## Solução de Problemas

### Serviço não inicia

```bash
# Verifique os logs no Render Dashboard
# Procure por erros de build ou runtime
```

### Keep-alive não funciona

1. Confirme que `RENDER_EXTERNAL_URL` está configurada
2. Verifique os logs: `Keep-alive: Sistema ativado`
3. A URL deve incluir `https://` no início

### Build falha

Se o build falhar com erro "vite: not found" ou "esbuild: not found", verifique:

1. O comando de build deve ser `npm install && npm run build`
2. NÃO configure NODE_ENV=production antes do build (isso impede instalação de devDependencies)
3. Certifique-se de que o arquivo `package-lock.json` está no repositório
4. Teste localmente:

```bash
# Limpar node_modules
rm -rf node_modules package-lock.json

# Reinstalar e testar
npm install
npm run build
npm start
```

Se o problema persistir, verifique no painel do Render (Settings → Build & Deploy):
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment Variables: NÃO inclua NODE_ENV=production (deixe o Render configurar automaticamente)

## Atualizações

O Render faz deploy automático quando você faz push para a branch principal:

```bash
git add .
git commit -m "Sua mensagem de commit"
git push origin main
```

## Acesso à Aplicação

Após o deploy bem-sucedido, sua aplicação estará disponível em:

```
https://seu-app-name.onrender.com
```

## Dicas

- Use o endpoint `/ping` para verificar se o servidor está ativo
- Monitore o uso de horas no painel do Render
- Configure notificações de deploy no Render
- Para produção, considere upgradar para plano pago ($7/mês)

## Suporte

- [Documentação Render](https://render.com/docs)
- [Community Forum](https://community.render.com)
- [Status Page](https://status.render.com)
