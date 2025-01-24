import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import ImageGallery from '@/components/products/ImageGallery';
import ProductVariants from '@/components/products/ProductVariants';
import ReviewSection from '@/components/products/ReviewSection';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageGallery images={product.images} />
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold">
            ${selectedVariant?.price || product.price}
          </p>
          
          {product.variants && (
            <ProductVariants
              variants={product.variants}
              selected={selectedVariant}
              onChange={setSelectedVariant}
            />
          )}
          
          <div className="quantity-selector">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-md px-3 py-2"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => addToCart(product, quantity, selectedVariant)}
            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800"
          >
            Add to Cart
          </button>
          
          <div className="product-description mt-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>
      
      <ReviewSection reviews={product.reviews} productId={product.id} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const product = await fetchProduct(params?.id as string);
    return { props: { product } };
  } catch (error) {
    return { notFound: true };
  }
}; 