import { Product, products } from '@/data/products';

export const getProducts = async (signal: AbortSignal): Promise<Product[]> => {
  await new Promise<void>((resolve, reject) => {
    let timerId: ReturnType<typeof setTimeout>;

    if (signal.aborted) {
      reject(new Error('Request aborted'));
      return;
    }

    const handleAbort = () => {
      clearTimeout(timerId);
      reject(new Error('Request aborted'));
    };

    signal.addEventListener('abort', handleAbort);

    timerId = setTimeout(() => {
      signal.removeEventListener('abort', handleAbort);
      resolve();
    }, 4000);
  });

  return products;
};
