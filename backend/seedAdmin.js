const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    const adminEmail = 'admin@example.com';
    const adminPassword = 'youradminpassword';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    let admin = await User.findOne({ email: adminEmail });
    if (admin) {
      admin.password = hashedPassword;
      admin.role = 'admin';
      await admin.save();
      console.log(`✅ Admin user (${adminEmail}) credentials updated successfully!`);
    } else {
      admin = await User.create({
        name: 'System Admin',
        email: adminEmail,
        password: hashedPassword,
        phone: '1234567890',
        address: 'Hostel Admin Office',
        role: 'admin',
      });
      console.log(`✅ Admin user (${adminEmail}) created successfully!`);
    }

    console.log(`\n🔑 You can now login with:`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
