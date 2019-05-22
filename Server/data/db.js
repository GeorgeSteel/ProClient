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
    orders: Array
});
const Clients = mongoose.model('clients', clientsSchema);

const productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
});
const Products = mongoose.model('products', productsSchema);

export {
    Clients,
    Products
};