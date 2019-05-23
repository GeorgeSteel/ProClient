import mongoose from 'mongoose';
import { Clients, Products, Orders } from './db';

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
                    type: input.type
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
                return "El cliente se ha eliminado correctamente";
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
                return "El producto ha sido eliminado satisfactoriamente";
            } catch (error) {
                throw new Error(error);                
            }
        },
        addOrder: async (root, {input}) => {
            try {
                input.order.forEach(order => {
                    Products.updateOne({ _id: order.id }, {
                        "$inc": { "stock": -order.quantity }
                    }, function (err) {
                            if(err) return new Error(err);
                        }
                    );
                });

                return await Orders.create({
                    order: input.order,
                    total: input.total,
                    date: new Date(),
                    client: input.client,
                    status: "PENDIENTE"
                });         
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}