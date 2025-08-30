import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasErr: false, err: null };

  static getDerivedStateFromError(err) {
    return { hasErr: true, err };
  }

  componentDidCatch(err, info) {
    console.error('Uncaught error:', err, info);
  }

  render() {
    if (this.state.hasErr) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded">
          <h2 className="text-lg font-bold">Something went wrong</h2>
          <pre className="mt-2 text-sm text-red-700">{String(this.state.err)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
