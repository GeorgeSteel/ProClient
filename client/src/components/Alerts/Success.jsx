import React from 'react';

const Success = ({ message }) => {
    return (
        <p className="alert alert-success py-3 my-3 text-center">
            { message }
        </p>
    );
};

export default Success;