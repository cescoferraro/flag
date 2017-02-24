const faker = require('faker/locale/pt_BR');
import * as moment from "moment";
const Any = items => {
    return items[Math.floor(Math.random() * items.length)];
};


export const RANDOM_USER = () => {
    return {
        name: faker.name.findName(),
        job: faker.name.jobTitle(),
        company: Any(["google.com", "xvideos.com", "apple.com"]),
        cpf: (Math.floor(Math.random() * 90000000000) + 10000000000).toString(),
        race: Any(["black", "white", "asian"]),
        salary: Math.floor(Math.random() * 9000) + 1000,
        birthdate: between18and60()
    }
};

const between18and60 = () => {
    let age = Math.floor(Math.random() * (60 - 18 + 1)) + 18;
    return new Date(
        moment()
            .subtract(age, 'years')
            .toISOString()
    );
};
