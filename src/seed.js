const sequelize = require('./config/db');
const { User, Quota, Institution, Campus, Department, Program } = require('./models');
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

    // Seed Core Structure
    // const inst = await Institution.create({ name: 'Edumerge University', code: 'EDU' });
    // const campus = await Campus.create({ name: 'Main Campus', location: 'Bangalore', institutionId: inst.id });
    // const dept = await Department.create({ name: 'Computer Science', code: 'CS', campusId: campus.id });
    // const prog = await Program.create({ name: 'B.Tech Computer Science and Engineering', code: 'CSE', totalIntake: 120, departmentId: dept.id });

    console.log('Basic institution structure seeded.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
};

seedDatabase();
