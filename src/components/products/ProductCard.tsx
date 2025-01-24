import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-t-lg">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-bold">${product.price}</p>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
} 