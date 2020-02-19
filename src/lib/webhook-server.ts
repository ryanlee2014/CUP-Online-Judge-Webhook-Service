import childProcess from "child_process"
import createHandler from "github-webhook-handler";
import http from "http";
import config from "../config.json";
const spawn = childProcess.spawn;
export function initServer (): void {
  const handler = createHandler({path: config.path, secret: config.secret});
  console.log("Started handler");
  http.createServer((req, res) => {
    handler(req, res, () => {
      res.statusCode = 404;
      res.end('no such location')
    })
  }).listen(config.port as number);
  console.log("Started http server");
  handler.on('error', (err) => {
    console.error('Error:', err.message)
  });

  handler.on('push', (event) => {
    console.log('Received a push event for %s to %s',
      event.payload.repository.name,
      event.payload.ref);
    const shellProcess = spawn(config.shell, []);
    shellProcess.stdout.on("data", (resp) => {
      console.log(resp.toString());
    });
    shellProcess.stderr.on("data", (resp) => {
      console.error(resp.toString());
    })
  });

  handler.on('issues', (event) => {
    console.log('Received an issue event for %s action=%s: #%d %s',
      event.payload.repository.name,
      event.payload.action,
      event.payload.issue.number,
      event.payload.issue.title)
  });
}
