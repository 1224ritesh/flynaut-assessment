import { Server } from 'socket.io';
import Room from '../modules/Room.js';

export default (server) => {
  // Socket.io server instance is created here and passed to the server instance created in app.js
  const io = new Server(server, { cors: true });

  // Middleware for authentication of user using email address sent in auth request header from client side.
  io.use((socket, next) => {
    const email = socket.handshake.auth.email;
    if (email) {
      socket["user"] = { email };
      next();
    } else {
      next(new Error("Authentication failed"));
    }
  });

  // Socket.io event listeners for joinroom, sendmessage and disconnect events emitted from client side. 
  io.on("connection", (socket) => {
    socket.on("joinroom", async (roomcode) => {
      const room = await Room.findOneAndUpdate(
        { roomcode },
        { $push: { users: socket.user.email } },
        { upsert: true, new: true });
      socket.join(roomcode);
      io.to(roomcode).emit("newjoiner", room.users);
    });

    // This event is emitted from client side when user sends a message in a room.
    socket.on("sendmessage", async (message) => {
      const room = await Room.findOne({ users: { $in: [socket.user.email] } });
      if (room) {
        io.to(room.roomcode).emit("newmessage", message, socket.user.email);
      }
    });

    // This event is emitted from client side when user disconnects from a room by closing the tab or browser window or logout.
    socket.on("disconnect", async () => {
      const room = await Room.findOneAndUpdate({
        users: { "$in": [socket.user.email] }
      }, { $pull: { users: socket.user.email } }, { new: false });
      if (room) {
        io.to(room.roomcode).emit("newjoiner", room.users);
      }
    });
  });
};
