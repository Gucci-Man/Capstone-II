/**
 * NotFound.jsx
 * ------------
 * Simple component to render a "404 - Page Not Found" message.  
 * Used to display an error when an invalid route is accessed.
 */

import React from 'react';

const NotFound = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Opps! We couldn't find the page you were looking for.</p>
        </div>
    );
};

export default NotFound;