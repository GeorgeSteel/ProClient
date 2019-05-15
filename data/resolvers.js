class Client {
    constructor(id, { name, lastname, company, emails, age, type, orders }){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.company = company;
        this.emails = emails;
        this.age = age;
        this.type = type;
        this.orders = orders;
    }
}

const clientsDB = {};

export const resolvers = {
    Query: {
        getClient: ({id}) => {
            return new Client(id, clientsDB[id]);
        }
    },
    Mutation: {
        createClient: (tmp, {input}) => {
            const id = require('crypto').randomBytes(10).toString('hex');
            clientsDB[id] = input;
            return new Client(id, input);
        }
    }
}