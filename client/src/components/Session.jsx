import React from 'react';

import { Query } from 'react-apollo';
import { GET_USER_QUERY } from '../queries/Users';

const Session = Component => props => {
    return (
        <Query query={ GET_USER_QUERY }>
            {({ loading, error, data, refetch }) => {
                if (loading) return null;
                return <Component { ...props } refetch={ refetch } session={ data } />;
            }}
        </Query>
    );
};

export default Session;