'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  level?: 'page' | 'component' | 'section';
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  private retryCount = 0;
  private readonly maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error tracking service
      // errorTrackingService.captureException(error, { extra: errorInfo });
    }
  }

  handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount += 1;
      this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    } else {
      // Force page reload if too many retries
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI based on error level
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { level = 'component', showDetails = false } = this.props;

      return (
        <div className={`
          flex flex-col items-center justify-center p-6 bg-gray-50 border border-gray-200 rounded-lg
          ${level === 'page' ? 'min-h-screen' : ''}
          ${level === 'component' ? 'min-h-32' : ''}
          ${level === 'section' ? 'min-h-24' : ''}
        `}>
          <div className="text-center max-w-md">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {level === 'page' ? 'Sivun lataus epäonnistui' : 'Osa sivusta ei latautunut'}
            </h3>

            <p className="text-gray-600 mb-4">
              {level === 'page'
                ? 'Sivun lataamisessa tapahtui virhe. Yritä päivittää sivu.'
                : 'Tämä osa sivusta ei latautunut oikein. Muut osat toimivat normaalisti.'
              }
            </p>

            <button
              onClick={this.handleRetry}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={this.retryCount >= this.maxRetries}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {this.retryCount >= this.maxRetries ? 'Päivitä sivu' : 'Yritä uudelleen'}
            </button>

            {showDetails && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer">
                  Tekniset tiedot
                </summary>
                <pre className="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded overflow-auto max-h-32">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;