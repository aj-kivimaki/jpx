import { type Id, toast, type ToastOptions } from 'react-toastify';

export const toastify = {
  success: (message: string, opts?: ToastOptions) =>
    toast.success(message, opts),
  error: (message: string, opts?: ToastOptions) => toast.error(message, opts),
  loading: (message: string, opts?: ToastOptions): Id =>
    toast.loading(message, opts),
  dismiss: (id?: Id) => toast.dismiss(id),
};
