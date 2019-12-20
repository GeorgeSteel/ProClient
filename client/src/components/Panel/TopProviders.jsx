import React from 'react';

import Loader from '../Layout/Loader';

import { Query } from 'react-apollo';
import { TOP_PROVIDERS_QUERY } from '../../queries/Charts';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
const TopProviders = () => {
    return (
        <Query query={ TOP_PROVIDERS_QUERY }>
            {({ loading, error, data }) => {
                if(loading) return <Loader/>;
                if(error) return `Error ${error.message}`;

                const topProvidersChart = [];

                data.topProviders.map((order, idx) => {
                    return topProvidersChart[idx] = {
                        ...order.provider[0],
                        total: order.total
                    }
                });

                return(
                    <BarChart
                        width={700}
                        height={400}
                        data={topProvidersChart}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#109a8b" />
                    </BarChart>
                );
            }}
        </Query>
        
    );
};

export default TopProviders;