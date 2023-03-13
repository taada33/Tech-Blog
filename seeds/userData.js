const { User } = require('../models');

const userData = [
    {
        name: 'Alistair Graham',
        password: '',
    },
    {
        name: 'Kris Holt',
        password: 'techblogger123',
    },
    {
        name: 'Tim Davidson',
        password: 'TimTechBlogger321',
    },
    {
        name: 'Durga Prasad Acharya',
        password: '5ut93kf$#',
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;