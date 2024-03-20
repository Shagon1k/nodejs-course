export interface IProductEntity {
  id: string;
  title: string;
  description: string;
  price: number;
}

// Mocked Products Database
const products_db: IProductEntity[] = [
  {
    id: "b073d31b-6cd1-4dd3-8a73-d1b48c6cbd81",
    title: "Don Quixote",
    description: "Don Quixote by Miguel de Cervantes",
    price: 29.99,
  },
  {
    id: "28364493-2462-43c3-9f64-7af5175f978a",
    title: "Moby Dick",
    description: "Moby Dick by Herman Melville",
    price: 31.99,
  },
];

export const getProductById = (productId: string) => {
  const product = products_db.find(({ id }) => id === productId) || null;

  return structuredClone(product);
};

export const getAllProducts = () => {
  return [...products_db];
};
