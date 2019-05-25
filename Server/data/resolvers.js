import mongoose from 'mongoose';
import { Clients, Products, Orders, Users } from './db';

import bcrypt from 'bcrypt';
// Generate token
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: 'variables.env' });
const createToken = (name, secret, expiresIn) => {
    const { user } = name;
    return jwt.sign({ user }, secret, { expiresIn });
}

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
        getProducts: async (root, {limit, offset, stock}) => {
            try {
                let filter;
                
                if (stock) {
                    filter = { stock: { $gt: 0 } }
                }
                
                return await Products.find(filter).limit(limit).skip(offset);
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
        },
        getOrders: async (root, {client}) => {
            try {
                return await Orders.find({ client: client });
            } catch (error) {
                throw new Error(error);
            }
        },
        topClients: async (root) => {
            try {
                return await Orders.aggregate([
                    {
                      $match: { status: "COMPLETADO" }
                    },
                    {
                      $group: { 
                          _id: "$client",
                          total: { $sum: "$total" }
                      }
                    },
                    {
                      $lookup: {
                          from: 'clients',
                          localField: '_id',
                          foreignField: '_id',
                          as: 'client'
                      }
                    },
                    {
                      $sort: { total: -1 }
                    },
                    {
                      $limit: 10
                    },
                  ]);
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
        },
        updateStatus: async (root, {input}) => {
            try {
                const { status } = input;
                let instruction;

                if (status === 'COMPLETADO') {
                    instruction = '-';
                } else if (status === 'CANCELADO') {
                    instruction = '+';                    
                }

                input.order.forEach(order => {
                    Products.updateOne({ _id: order.id }, {
                        "$inc": { "stock": `${ instruction }${ order.quantity }` }
                    }, function (err) {
                            if(err) return new Error(err);
                        }
                    );
                });

                await Orders.findOneAndUpdate({ _id: input.id}, input, {new: true});
                return "El pedido ha sido actualizado satisfactoriamente";
            } catch (error) {
                throw new Error(error);                
            }
        },
        createUser: async (root, {user, password}) => {
            try {
                const userExists = await Users.findOne({ user });
                if(userExists) throw new Error(`El usuario ${ user } ya existe`);

                await Users.create({
                    user,
                    password: bcrypt.hashSync(password, 10)
                });
                
                return 'El nuevo usuario ha sido creado';
            } catch (error) {
                throw new Error(error);
            }
        },
        authUser: async (root, {user, password}) => {
            try {
                const userExists = await Users.findOne({ user });
                if (!userExists) throw new Error(`Usuario NO existe`);
                
                const correctPassword = await bcrypt.compare(password, userExists.password);
                if (!correctPassword) throw new Error(`Password Incorrecto`);

                return {
                    token: createToken(userExists, process.env.SECRET, '1hr')
                };
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}