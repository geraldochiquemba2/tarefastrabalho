import cron from "node-cron";
import https from "https";
import http from "http";
import { log } from "./vite";

export function initializeKeepAlive() {
  const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
  
  if (!RENDER_URL) {
    log("Keep-alive: RENDER_EXTERNAL_URL não definida. Sistema de keep-alive desativado.");
    return;
  }

  const pingUrl = `${RENDER_URL}/ping`;
  log(`Keep-alive: Sistema ativado. URL de ping: ${pingUrl}`);

  cron.schedule("*/10 * * * *", () => {
    const protocol = RENDER_URL.startsWith("https") ? https : http;
    
    protocol.get(pingUrl, (res) => {
      res.resume();
      if (res.statusCode === 200) {
        log(`Keep-alive: Ping enviado com sucesso (${res.statusCode})`);
      } else {
        log(`Keep-alive: Ping retornou status ${res.statusCode}`);
      }
    }).on("error", (err) => {
      log(`Keep-alive: Erro ao enviar ping - ${err.message}`);
    });
  });

  log("Keep-alive: Cron job configurado para executar a cada 10 minutos");
}
