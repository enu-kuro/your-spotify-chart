import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  Container, Header,
} from 'semantic-ui-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

const ErrorView = () => {
  return (
    <Container style={{ margin: 20 }} textAlign="center">
      <Header as="h2" color="orange" textAlign="center">
        想定外のエラーが発生しました😣
      </Header>
    </Container>
  );
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    if (hasError) {
      return <ErrorView />;
    }

    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
