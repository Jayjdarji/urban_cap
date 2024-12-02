import { Server } from "socket.io";

let io = null;

const configureSocket = (server) => {
  try {
    if (io) {
      return io;
    }

    io = new Server(server, {
      cors: {
        origin: "https://urban-cap-client.vercel.app",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    console.log("Socket.io server started...");

    return io;
  } catch (error) {
    console.log(error);
  }
};

export default configureSocket;
