import { Component } from 'react';

import styles from './styles.module.scss';

/**
 * The fallback component, which is rendered if the app
 * crashes for some reason
 */
class ErrorBoundary extends Component {
  /**
   * @param {Object} props Component props
   * @param {React.ReactNode} props.children
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <h1>Something went wrong</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
