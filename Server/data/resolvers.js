import mongoose from 'mongoose';
import { Clients } from './db';

export const resolvers = {
    Query: {
        getClient: async (root, {id}) => {
            try {
                return await Clients.findById(id);
            } catch (error) {
                throw new Error(error);
            }
        },
        getClients: async (root, {limit, offset}) => {
            try {
                return await Clients.find({}).limit(limit).skip(offset);
            } catch (error) {
                throw new Error(error);
            }
        },
        totalClients: async (root) => {
            try {
                return await Clients.countDocuments({});
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        createClient: async (root, {input}) => {            
            try {
                return await Clients.create({
                    name: input.name,
                    lastname: input.lastname,
                    company : input.company,
                    emails: input.emails,
                    age: input.age,
                    type: input.type,
                    orders: input.orders
                }); 
            } catch (error) {
                throw new Error(error);
            }
        },
        updateClient: async (root, {input}) => {
            try {
                return await Clients.findOneAndUpdate({ _id: input.id}, input, {new: true});
            } catch (error) {
                throw new Error(error);
            }
        },
        deleteClient: async (root, {id}) => {
            try {
                await Clients.findOneAndRemove({ _id: id});
                return "It has been deleted";
            } catch (error) {
                throw new Error(error);                
            }
        }
    }
}