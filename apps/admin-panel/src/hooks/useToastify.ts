import { type Id, toast, type ToastOptions } from 'react-toastify';

export function useToastify() {
  const success = (message: string, opts?: ToastOptions) => {
    toast.success(message, opts);
  };

  const error = (message: string, opts?: ToastOptions) => {
    toast.error(message, opts);
  };

  const loading = (message: string, opts?: ToastOptions): Id => {
    return toast.loading(message, opts);
  };

  const dismiss = (id?: Id) => {
    toast.dismiss(id);
  };

  return { success, error, loading, dismiss };
}
