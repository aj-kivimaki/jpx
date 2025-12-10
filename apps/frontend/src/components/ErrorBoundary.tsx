import { Component } from 'react';
import { captureError } from '../clients/monitoring';
import { makeError } from '@jpx/shared';

type Props = { children: React.ReactNode };

export default class ErrorBoundary extends Component<
  Props,
  { hasError: boolean }
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    const err =
      error instanceof Error
        ? makeError(error.message || 'Error', 'UNKNOWN', {
            stack: error.stack,
            info,
          })
        : makeError(String(error), 'UNKNOWN', { info });

    // Mark as logged to avoid duplicate logging
    err.__logged = true;

    captureError(err);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
