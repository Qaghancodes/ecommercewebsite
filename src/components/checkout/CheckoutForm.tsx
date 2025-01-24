import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Address } from '@/types';
import PaymentSection from './PaymentSection';
import AddressForm from './AddressForm';

export default function CheckoutForm() {
  const { total, items, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);

  const handleAddressSubmit = (address: Address) => {
    setShippingAddress(address);
    setStep('payment');
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    try {
      // Create order in database
      await createOrder({
        userId: user!.id,
        items,
        total,
        shippingAddress: shippingAddress!,
        paymentIntentId: paymentIntent.id
      });
      
      clearCart();
      // Redirect to success page
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="steps mb-8">
        {/* Stepper UI */}
      </div>
      
      {step === 'address' ? (
        <AddressForm onSubmit={handleAddressSubmit} />
      ) : (
        <PaymentSection 
          amount={total} 
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
} 