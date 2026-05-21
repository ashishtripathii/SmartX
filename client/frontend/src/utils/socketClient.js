let socketInstance = null;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
};
export const getSocketInstance = () => socketInstance;
export const clearSocketInstance = () => {
  socketInstance = null;
};
