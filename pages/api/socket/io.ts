import { Server as NetServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types";


export const config = {
    api : {
        bodyParser : false
    }
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new SocketIoServer(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
