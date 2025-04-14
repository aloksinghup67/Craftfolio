import { useState } from 'react';

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = ({ title, description, duration = 3000 }) => {
    setToast({ title, description });
    setTimeout(() => setToast(null), duration);
  };

  return { toast, showToast };
} 