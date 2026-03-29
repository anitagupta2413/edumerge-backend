const sequelize = require('./config/db');
const { User, Quota } = require('./models');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
        await sequelize.sync({ force: true }); // Careful: force: true DROPS tables
        console.log('Tables synchronized.');

        // Seed Users
        const password = await bcrypt.hash('password123', 10);

        await User.bulkCreate([
            { name: 'System Admin', email: 'admin@edumerge.com', password, role: 'ADMIN' },
            { name: 'Admission Staff', email: 'staff@edumerge.com', password, role: 'STAFF' },
            { name: 'Read Only Viewer', email: 'management@edumerge.com', password, role: 'VIEWER' }
        ]);
        console.log('Static users seeded.');

        // Seed Quotas
        await Quota.bulkCreate([
            { name: 'KCET' },
            { name: 'COMEDK' },
            { name: 'Management' }
        ]);
        console.log('Basic quotas seeded.');

        process.exit(0);
    } catch (error) {
        console.error('Failed to seed database:', error);
        process.exit(1);
    }
};

seedDatabase();
