import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import Container from 'components/Container';
import Title from 'components/Title';

import styles from './styles.css';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
        };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container>
                    <div className={styles.text}>
                        <Title>
                            <FormattedMessage id="500" /> 😢
                        </Title>
                    </div>
                </Container>
            );
        }

        return this.props.children;
    }
}

export const withErrorBoundary = Component => (props = {}) => (
    <ErrorBoundary>
        <Component {...props} />
    </ErrorBoundary>
);

export default ErrorBoundary;
