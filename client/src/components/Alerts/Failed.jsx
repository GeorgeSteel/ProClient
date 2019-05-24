import React from 'react';

const Failed = ({ message }) => {
    return (
        <p className="alert alert-dismissible alert-danger py-3 my-3 text-center">
            { message }
        </p>
    );
};

export default Failed;