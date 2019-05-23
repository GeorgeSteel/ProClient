import mongoose from 'mongoose';
import { Clients } from './db';
import { Products } from './db';

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
        },
        getProducts: async (root, {limit, offset}) => {
            try {
                return await Products.find({}).limit(limit).skip(offset);
            } catch (error) {
                throw new Error(error);
            }
        },
        getProduct: async (root, {id}) => {
            try {
                return await Products.findById(id);
            } catch (error) {
                throw new Error(error);
            }
        },
        totalProducts: async (root) => {
            try {
                return await Products.countDocuments({});
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
                    company: input.company,
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
                return "El producto se ha eliminado correctamente";
            } catch (error) {
                throw new Error(error);                
            }
        },
        addProduct: async (root, {input}) => {
            try {
                return await Products.create({
                    name: input.name,
                    price: input.price,
                    stock: input.stock
                }); 
            } catch (error) {
                throw new Error(error);
            }
        },
        updateProduct: async (root, {input}) => {
            try {
                return await Products.findOneAndUpdate({ _id: input.id}, input, {new: true});
            } catch (error) {
                throw new Error(error);
            }
        },
        deleteProduct: async (root, {id}) => {
            try {
                await Products.findOneAndRemove({ _id: id});
                return "Ha sido eliminado satisfactoriamente";
            } catch (error) {
                throw new Error(error);                
            }
        }
    }
}