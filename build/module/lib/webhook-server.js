import childProcess from "child_process";
import createHandler from "github-webhook-handler";
import http from "http";
import config from "../config.json";
const spawn = childProcess.spawn;
export function initServer() {
    const handler = createHandler({ path: config.path, secret: config.secret });
    console.log("Started handler");
    http.createServer((req, res) => {
        handler(req, res, () => {
            res.statusCode = 404;
            res.end('no such location');
        });
    }).listen(config.port);
    console.log("Started http server");
    handler.on('error', (err) => {
        console.error('Error:', err.message);
    });
    handler.on('push', (event) => {
        console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
        const shellProcess = spawn(config.shell, []);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViaG9vay1zZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3dlYmhvb2stc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQTtBQUN4QyxPQUFPLGFBQWEsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxNQUFNLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEMsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztBQUNqQyxNQUFNLFVBQVUsVUFBVTtJQUN4QixNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQ3JCLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUM3QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBYyxDQUFDLENBQUM7SUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ25DLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUM5QyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQzdCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrREFBa0QsRUFDNUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDcEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM5QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMifQ==