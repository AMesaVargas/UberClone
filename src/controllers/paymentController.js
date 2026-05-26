import {
  validatePaymentForm,
  processPayment,
  getPaymentMethods,
} from '../services/paymentService';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { useCallback, useState } from 'react';

export const usePaymentController = () => {
  const [currentPayment, setCurrentPayment] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const processPaymentController = useCallback(
    async (formData, amount, tripDetails = {}) => {
      setLoading(true);

      const middleware = authMiddleware(formData);
      if (!middleware.passed) {
        setLoading(false);
        return { success: false, message: middleware.error };
      }

      const validation = validatePaymentForm(formData);
      if (!validation.isValid) {
        setLoading(false);
        return { success: false, message: validation.error };
      }

      const result = await processPayment(
        formData.paymentMethod,
        amount,
        tripDetails,
      );

      if (!result.success) {
        setLoading(false);
        return { success: false, message: result.error };
      }

      setCurrentPayment(result);
      setPaymentSuccess(true);
      setLoading(false);
      console.log('Payment processed:', result);

      return {
        success: true,
        message: result.message,
        amount: result.amount,
        urlPago: result.urlPago || null,
      };
    },
    [],
  );

  const getPaymentMethodsController = useCallback(() => {
    const methods = getPaymentMethods();
    console.log('Payment methods:', methods);
    return methods;
  }, []);

  const resetPaymentController = useCallback(() => {
    setCurrentPayment(null);
    setPaymentSuccess(false);
    setLoading(false);
    console.log('Payment reset');
  }, []);

  return {
    currentPayment,
    paymentSuccess,
    loading,
    processPaymentController,
    getPaymentMethodsController,
    resetPaymentController,
  };
};
