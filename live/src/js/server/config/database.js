require('dotenv').load();

module.exports = {
    'url' : 'mongodb://localhost/users',
    'secret': process.env.SESSION_SECRET
};
