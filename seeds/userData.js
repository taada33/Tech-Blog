const { User } = require('../models');

const userData = [
    {
        id: 1,
        name: 'Alistair Graham',
        password: '999910101010',
    },
    {
        id: 2,
        name: 'Kris Holt',
        password: 'techblogger123',
    },
    {
        id: 3,
        name: 'Tim Davidson',
        password: 'TimTechBlogger321',
    },
    {
        id: 4,
        name: 'Durga Prasad Acharya',
        password: '5ut93kf$#',
    },
];

const seedUsers = async () => await User.bulkCreate(userData,{individualHooks: true});

module.exports = seedUsers;