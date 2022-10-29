export function shortenHex(hex: string, length = 4) {
    return `${hex.substring(0, length + 2)}…${hex.substring(
      hex.length - length
    )}`;
}

export const isFlask = async () => {
  if (typeof window !== 'undefined') {
    const provider = window.ethereum;
  
    try {
      const clientVersion = await provider?.request({
        method: 'web3_clientVersion',
      });
  
      const isFlaskDetected = (clientVersion as unknown as string[])?.includes('flask');
  
      return Boolean(provider && isFlaskDetected);
    } catch {
      return false;
    }
  }
  return false;
};