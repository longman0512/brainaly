import io from 'socket.io-client';
import global from 'src/utils/global';

let socket = null;

export const setSocket = () => {
  socket = io(global.serverUrl);
};

export const offEvent = (socketListenId) => {
  socket.off(socketListenId);
};

export const onMessageReceived = (socketListenId, callback) => {
  socket.on(socketListenId, (data) => callback(data));
};

export const emitEvent = (event, data) => {
  socket.emit(event, data);
};

export const disconnect = () => {
  socket.disconnect();
};
