import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('ErrorBoundary', error, info); }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 border">
          <h2 className="text-xl font-semibold">Something went wrong.</h2>
          <p className="text-sm text-gray-600 mt-2">Please reload the page or try again later.</p>
          <pre className="mt-4 text-xs bg-gray-50 rounded p-3 overflow-auto">{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
