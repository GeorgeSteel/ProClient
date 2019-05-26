import React from 'react';

import Loader from '../Layout/Loader';

import { Query } from 'react-apollo';
import { TOP_SELLERS_QUERY } from '../../queries/Charts';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
const TopSellers = () => {
    return (
        <Query query={ TOP_SELLERS_QUERY }>
            {({ loading, error, data }) => {
                if(loading) return <Loader/>;
                if(error) return `Error ${error.message}`;

                const topSellersChart = [];
                console.log(data);

                data.topSellers.map((seller, idx) => {
                    return topSellersChart[idx] = {
                        ...seller.seller[0],
                        total: seller.total
                    }
                });

                return(
                    <BarChart
                        width={700}
                        height={400}
                        data={topSellersChart}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#6148b9" />
                    </BarChart>
                );
            }}
        </Query>
        
    );
};

export default TopSellers;