import React, { Component } from 'react'

class ErrorBoundary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }


    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default ErrorBoundary
