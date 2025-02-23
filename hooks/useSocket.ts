/** @format */

const useSocket = (url: string) => {
  return new WebSocket(url);
};

export default useSocket;

export const useCryptoComSocket = () => {
  return useSocket(process.env.NEXT_PUBLIC_CRYPTO_COM_SOCKET_URL as string);
};
