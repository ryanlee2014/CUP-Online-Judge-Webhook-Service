"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const github_webhook_handler_1 = __importDefault(require("github-webhook-handler"));
const http_1 = __importDefault(require("http"));
const config_json_1 = __importDefault(require("../config.json"));
const spawn = child_process_1.default.spawn;
function initServer() {
    const handler = github_webhook_handler_1.default({ path: config_json_1.default.path, secret: config_json_1.default.secret });
    console.log("Started handler");
    http_1.default.createServer((req, res) => {
        handler(req, res, () => {
            res.statusCode = 404;
            res.end('no such location');
        });
    }).listen(config_json_1.default.port);
    console.log("Started http server");
    handler.on('error', (err) => {
        console.error('Error:', err.message);
    });
    handler.on('push', (event) => {
        console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
        const shellProcess = spawn(config_json_1.default.shell, []);
        shellProcess.stdout.on("data", (resp) => {
            console.log(resp.toString());
        });
        shellProcess.stderr.on("data", (resp) => {
            console.error(resp.toString());
        });
    });
    handler.on('issues', (event) => {
        console.log('Received an issue event for %s action=%s: #%d %s', event.payload.repository.name, event.payload.action, event.payload.issue.number, event.payload.issue.title);
    });
}
exports.initServer = initServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViaG9vay1zZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3dlYmhvb2stc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQXdDO0FBQ3hDLG9GQUFtRDtBQUNuRCxnREFBd0I7QUFDeEIsaUVBQW9DO0FBQ3BDLE1BQU0sS0FBSyxHQUFHLHVCQUFZLENBQUMsS0FBSyxDQUFDO0FBQ2pDLFNBQWdCLFVBQVU7SUFDeEIsTUFBTSxPQUFPLEdBQUcsZ0NBQWEsQ0FBQyxFQUFDLElBQUksRUFBRSxxQkFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUscUJBQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQzFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMvQixjQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtZQUNyQixHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUNyQixHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDN0IsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQU0sQ0FBQyxJQUFjLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDbkMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQzlDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksRUFDN0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMscUJBQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrREFBa0QsRUFDNUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDcEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM5QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFsQ0QsZ0NBa0NDIn0=