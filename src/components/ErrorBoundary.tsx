import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error?.message || 'Something went wrong while rendering this view.',
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-[#0f0e0d] text-[#e3ddce] flex items-center justify-center px-4 py-10">
        <div
          className="max-w-lg w-full border border-[#ded5be]/40 bg-[#f3eedb] text-[#24221f] rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.55)] p-8 sm:p-10"
          role="alert"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8a7b66] mb-3">
            Study desk interruption
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2b251e] mb-3">
            This page could not be shown
          </h1>
          <p className="font-sans text-sm text-[#5c5448] leading-relaxed mb-2">
            A single chapter or panel failed to render. Your notes and progress in this browser are
            still saved — reloading usually restores the desk.
          </p>
          <p className="font-mono text-[11px] text-[#7a6d59] mb-6 break-words">
            {this.state.message}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={this.handleReload}
              className="min-h-[44px] px-5 py-2.5 bg-[#18392b] text-[#f2edd9] border border-[#d4af37]/45 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#1f4a38] transition-colors"
            >
              Reload app
            </button>
            <button
              type="button"
              onClick={this.handleReset}
              className="min-h-[44px] px-5 py-2.5 bg-transparent text-[#2b251e] border border-[#8a7b66]/50 text-xs font-bold uppercase tracking-widest rounded-sm hover:border-[#2b251e] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }
}
