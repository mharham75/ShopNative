import { Product, products } from '@/data/products';

type GetProductsParams = {
  searchTerm?: string;
  category?: string;
};

export const getProducts = async (
  signal: AbortSignal,
  params?: GetProductsParams
): Promise<Product[]> => {
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
    }, 2000);
  });

  let result = products;
  if (params?.category) {
    result = result.filter((item) => item.category === params.category);
  }

  if (params?.searchTerm) {
    const normalisedSearch = params.searchTerm.toLowerCase();
    result = result.filter((item) =>
      item.name.toLowerCase().includes(normalisedSearch)
    );
  }
  return result;
};

export const getProductById = async (id: string): Promise<Product> => {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 2000);
  });

  const product = products.find((p) => p.id === id);

  if (!product) {
    throw new Error('No product found with this id');
  }

  return product;
};
