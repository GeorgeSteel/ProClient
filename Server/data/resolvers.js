import mongoose from 'mongoose';
import { Clients, Products, Orders, Users, Providers, Projects } from './db';

import bcrypt from 'bcrypt';
// Generate token
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: 'variables.env' });
const createToken = (name, secret, expiresIn) => {
    const { user } = name;
    return jwt.sign({ user }, secret, { expiresIn });
}

const { ObjectId } = mongoose.Types;

export const resolvers = {
    Query: {
        getClient: async (root, {id}) => {
            try {
                return await Clients.findById(id);
            } catch (error) {
                throw new Error(error);
            }
        },
        getClients: async (root, {limit, offset, seller}) => {
            try {
                let filter;
                if (seller) filter = { seller: new ObjectId(seller) };
                
                return await Clients.find(filter).limit(limit).skip(offset);
            } catch (error) {
                throw new Error(error);
            }
        },
        totalClients: async (root, {seller}) => {
            try {
                let filter;
                if (seller) filter = { seller: new ObjectId(seller) };
                return await Clients.countDocuments(filter);
            } catch (error) {
                throw new Error(error);
            }
        },
        getProvider: async (root, {id}) => {
            try {
                return await Providers.findById(id);
            } catch (error) {
                throw new Error(error);
            }
        },
        getProviders: async (root, {limit, offset, seller}) => {
            try {
                let filter;
                if (seller) filter = { seller: new ObjectId(seller) };
                
                return await Providers.find(filter).limit(limit).skip(offset);
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
                return await Orders.find({ client: client }).sort({$natural:-1});
            } catch (error) {
                throw new Error(error);
            }
        },
        getProjects: async (root, {client, limit, offset}) => {
            try {
                return await Projects.find({ client: client }).sort({$natural:-1}).limit(limit).skip(offset);
            } catch (error) {
                throw new Error(error);
            }
        },
        getProject: async (root, {id}) => {
            try {
                return await Projects.findById(id);
            } catch (error) {
                throw new Error(error);
            }
        },
        totalProjects: async (root, {id}) => {
            try {
                return await Projects.countDocuments({id});
            } catch (error) {
                throw new Error(error);
            }
        },
        getUser: async (root, args, {currentUser}) => {
            try {
                if (!currentUser) return null;

                return await Users.findOne({ user: currentUser.user });
            } catch (error) {
                throw new Error(error);
            }
        },
        getSingleUser: async (root, {id}) => {
            try {
                return await Users.findById(id);
            } catch (error) {
                throw new Error(error);
            }
        },
        getUsers: async (root, {limit, offset}) => {
            try {                
                return await Users.find().limit(limit).skip(offset);
            } catch (error) {
                throw new Error(error);
            }
        },
        totalUsers: async (root) => {
            try {
                return await Users.countDocuments({});
            } catch (error) {
                throw new Error(error);
            }
        },
        topClients: async (root) => {
            try {
                return await Projects.aggregate([
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
                    }
                  ]);
            } catch (error) {
                throw new Error(error);
            }
        },
        topProviders: async (root) => {
            try {
                return await Orders.aggregate([
                    {
                      $match: { status: "COMPLETADO" }
                    },
                    {
                      $group: { 
                          _id: "$provider",
                          total: { $sum: "$total" }
                      }
                    },
                    {
                      $lookup: {
                          from: 'providers',
                          localField: '_id',
                          foreignField: '_id',
                          as: 'provider'
                      }
                    },
                    {
                      $sort: { total: -1 }
                    },
                    {
                      $limit: 10
                    }
                  ]);
            } catch (error) {
                throw new Error(error);
            }
        },
        topSellers: async (root) => {
            try {
                return await Orders.aggregate([
                    {
                        $match: { status: "COMPLETADO" }
                    },
                    {
                        $group: { 
                            _id: "$seller",
                            total: { $sum: "$total" }
                        }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: '_id',
                            foreignField: '_id',
                            as: 'seller'
                        }
                    },
                    {
                        $sort: { total: -1 }
                    },
                    {
                        $limit: 10
                    }
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
                    type: input.type,
                    seller: input.seller
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
        createProvider: async (root, {input}) => {            
            try {
                return await Providers.create({
                    name: input.name,
                    lastname: input.lastname,
                    company: input.company,
                    emails: input.emails,
                }); 
            } catch (error) {
                throw new Error(error);
            }
        },
        updateProvider: async (root, {input}) => {
            try {
                return await Providers.findOneAndUpdate({ _id: input.id}, input, {new: true});
            } catch (error) {
                throw new Error(error);
            }
        },
        deleteProvider: async (root, {id}) => {
            try {
                await Providers.findOneAndRemove({ _id: id});
                return "El proveedor se ha eliminado correctamente";
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
                    status: "PENDIENTE",
                    seller: input.seller
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
                    instruction = '+';
                } //else if (status === 'CANCELADO') {
                //     instruction = '-';                    
                // }

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
        addProject: async (root, {input}) => {
            try {
                input.items.forEach(item => {
                    Products.updateOne({ _id: item.id }, {
                        "$inc": { "stock": `-${ item.quantity }` }
                    }, function (err) {
                            if(err) return new Error(err);
                        }
                    );
                });

                return await Projects.create({
                    items: input.items,
                    name: input.name,
                    total: input.total,
                    date: new Date(),
                    status: "PENDIENTE",
                    client: input.client,
                    seller: input.seller
                });         
            } catch (error) {
                throw new Error(error);
            }
        },
        updateProject: async (root, {input}) => {
            try {
                const { rest, items } = input;
                let instruction;

                items.forEach((item, idx) => {
                    if (rest[idx] >= 0) {
                        instruction = '-';                    
                    } else if (rest[idx] < 0) {
                        instruction = '+';
                        rest[idx] = rest[idx] * -1;
                    }

                    Products.updateOne({ _id: item.id }, {
                        "$inc": { "stock": `${ instruction }${ rest[idx] }` }
                    }, function (err) {
                            if(err) return new Error(err);
                        }
                    );
                });

                return await Projects.findOneAndUpdate({ _id: input.id}, input, {new: true});
            } catch (error) {
                throw new Error(error);
            }
        },
        deleteProject: async (root, {id}) => {
            try {
                await Projects.findOneAndRemove({ _id: id});
                return "El proyecto se ha eliminado correctamente";
            } catch (error) {
                throw new Error(error);                
            }
        },
        createUser: async (root, {user, password, name, rol}) => {
            try {
                const userExists = await Users.findOne({ user });
                if(userExists) throw new Error(`El usuario ${ user } ya existe`);

                await Users.create({
                    user,
                    password: bcrypt.hashSync(password, 10),
                    name,
                    rol
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
                    token: createToken(userExists, process.env.SECRET, '16hr')
                };
            } catch (error) {
                throw new Error(error);
            }
        },
        updateUser: async (root, {input}) => {
            try {
                input.password = bcrypt.hashSync(input.password, 10)
                return await Users.findOneAndUpdate({ _id: input.id}, input, {new: true});
            } catch (error) {
                throw new Error(error);
            }
        },
        deleteUser: async (root, {id}) => {
            try {
                await Users.findOneAndRemove({ _id: id});
                return "El usuario ha sido eliminado satisfactoriamente";
            } catch (error) {
                throw new Error(error);                
            }
        },
    }
}