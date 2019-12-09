import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clients', { useNewUrlParser: true, useFindAndModify: false });

// Define client's schema
const clientsSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    company: String,
    emails: Array,
    age: Number,
    type: String,
    orders: Array,
    seller: mongoose.Types.ObjectId
});
const Clients = mongoose.model('clients', clientsSchema);

const providersSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    company: String,
    emails: Array,
    orders: Array
});
const Providers = mongoose.model('providers', providersSchema);

const projectSchema = new mongoose.Schema({
    client: mongoose.Types.ObjectId,
    seller: mongoose.Types.ObjectId,
    name: String,
    items: Array,
    total: Number,
    date: Date,
    status: String
});
const Projects = mongoose.model('projects', projectSchema);

const productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
});
const Products = mongoose.model('products', productsSchema);

const ordersSchema = new mongoose.Schema({
    order: Array,
    total: Number,
    date: Date,
    // client: mongoose.Types.ObjectId,
    provider: mongoose.Types.ObjectId,
    status: String,
    seller: mongoose.Types.ObjectId
});
const Orders = mongoose.model('orders', ordersSchema);

const userSchema = new mongoose.Schema({
    user: String,
    password: String,
    name: String,
    rol: String
});
const Users = mongoose.model('users', userSchema);

export {
    Clients,
    Products,
    Orders,
    Users,
    Providers,
    Projects
};