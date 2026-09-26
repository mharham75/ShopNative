export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 17',
    category: 'Electronics',
    price: 79999,
    image: 'https://example.com/iphone-17.jpg',
  },
  {
    id: '2',
    name: 'Samsung 55 Inch 4K TV',
    category: 'Electronics',
    price: 54999,
    image: 'https://example.com/samsung-tv.jpg',
  },
  {
    id: '3',
    name: 'Sony Wireless Headphones',
    category: 'Electronics',
    price: 12999,
    image: 'https://example.com/sony-headphones.jpg',
  },
  {
    id: '4',
    name: 'Organic Basmati Rice 5kg',
    category: 'Grocery',
    price: 699,
    image: 'https://example.com/basmati-rice.jpg',
  },
  {
    id: '5',
    name: 'Almonds 500g',
    category: 'Grocery',
    price: 499,
    image: 'https://example.com/almonds.jpg',
  },
  {
    id: '6',
    name: 'Nike Running Shoes',
    category: 'Fashion',
    price: 5999,
    image: 'https://example.com/nike-shoes.jpg',
  },
  {
    id: '7',
    name: 'Levis Regular Fit Jeans',
    category: 'Fashion',
    price: 2499,
    image: 'https://example.com/levis-jeans.jpg',
  },
  {
    id: '8',
    name: 'Face Wash',
    category: 'Beauty',
    price: 399,
    image: 'https://example.com/face-wash.jpg',
  },
];
