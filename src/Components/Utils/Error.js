import React from 'react';
import { Alert } from 'react-bootstrap'

export default function Error({message}) {
    return (
        <Alert key="danger" variant="danger" className="w-100 mt-4 p-2">
            {message}
        </Alert>
    )
}