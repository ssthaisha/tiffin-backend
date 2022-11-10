import { Socket, Server } from "socket.io";
import { createServer } from "http";

let io;
const SocketServerIO = (httpServer) => {
  //   const httpServer = createServer(app);

  io = new Server(httpServer, {
    cors: ["http://localhost:3000", "http://localhost:19000"],
  });

  io.on("connection", (socket) => {
    console.log(socket, "New user added to socket");
    socket.emit("message", "TExttttt");
  });
  //   return io;
};
export { io };
export default SocketServerIO;
