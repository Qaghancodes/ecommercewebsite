import { useState } from 'react';
import { Product } from '@/types';
import ProductForm from './ProductForm';
import { deleteProduct } from '@/services/admin';

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Add New Product
        </button>
      </div>

      {(isAddingProduct || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSubmit={(product) => {
            // Handle product submit
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
          onCancel={() => {
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setEditingProduct(product)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 