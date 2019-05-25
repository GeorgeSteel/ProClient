import React from 'react';

import Loader from '../Layout/Loader';

import { Query } from 'react-apollo';
import { TOP_CLIENTS_QUERY } from '../../queries/Charts';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
const TopClients = () => {
    return (
        <Query query={ TOP_CLIENTS_QUERY }>
            {({ loading, error, data }) => {
                if(loading) return <Loader/>;
                if(error) return `Error ${error.message}`;

                const topClientsChart = [];

                data.topClients.map((order, idx) => {
                    return topClientsChart[idx] = {
                        ...order.client[0],
                        total: order.total
                    }
                });

                return(
                    <BarChart
                        width={700}
                        height={400}
                        data={topClientsChart}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#82ca9d" />
                    </BarChart>
                );
            }}
        </Query>
        
    );
};

export default TopClients;