import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create users
    const usersData = [
      {
        email: 'john.doe@example.com',
        password: 'password1',
        name: 'John Doe',
      },
      {
        email: 'jane.smith@example.com',
        password: 'password2',
        name: 'Jane Smith',
      },
      {
        email: 'michael.brown@example.com',
        password: 'password3',
        name: 'Michael Brown',
      },
      {
        email: 'emily.wilson@example.com',
        password: 'password4',
        name: 'Emily Wilson',
      },
      {
        email: 'william.jones@example.com',
        password: 'password5',
        name: 'William Jones',
      },
    ];

    const { count: createdUsersCount } = await prisma.user.createMany({
      data: usersData,
      skipDuplicates: true,
    });

    console.log(`Created ${createdUsersCount} users`);

    // Fetch created users
    const createdUsers = await prisma.user.findMany({
      where: {
        email: {
          in: usersData.map((user) => user.email),
        },
      },
    });

    if (createdUsers.some((user) => !user.id)) {
      throw new Error('Some users were not created with IDs');
    }

    // Create invoices
    const invoicesData = [
      // Invoices for User 1
      {
        user_id: createdUsers[0].id,
        vendor_name: 'Vendor A',
        amount: 100.0,
        due_date: new Date(),
        description: 'Invoice 1 for John Doe',
        paid: false,
      },
      {
        user_id: createdUsers[0].id,
        vendor_name: 'Vendor B',
        amount: 200.0,
        due_date: new Date(),
        description: 'Invoice 2 for John Doe',
        paid: true,
      },
      // Invoices for User 2
      {
        user_id: createdUsers[1].id,
        vendor_name: 'Vendor C',
        amount: 150.0,
        due_date: new Date(),
        description: 'Invoice 1 for Jane Smith',
        paid: false,
      },
      {
        user_id: createdUsers[1].id,
        vendor_name: 'Vendor D',
        amount: 250.0,
        due_date: new Date(),
        description: 'Invoice 2 for Jane Smith',
        paid: true,
      },
      // Invoices for User 3
      {
        user_id: createdUsers[2].id,
        vendor_name: 'Vendor E',
        amount: 120.0,
        due_date: new Date(),
        description: 'Invoice 1 for Michael Brown',
        paid: false,
      },
      {
        user_id: createdUsers[2].id,
        vendor_name: 'Vendor F',
        amount: 180.0,
        due_date: new Date(),
        description: 'Invoice 2 for Michael Brown',
        paid: true,
      },
      // Invoices for User 4
      {
        user_id: createdUsers[3].id,
        vendor_name: 'Vendor G',
        amount: 90.0,
        due_date: new Date(),
        description: 'Invoice 1 for Emily Wilson',
        paid: false,
      },
      {
        user_id: createdUsers[3].id,
        vendor_name: 'Vendor H',
        amount: 210.0,
        due_date: new Date(),
        description: 'Invoice 2 for Emily Wilson',
        paid: true,
      },
      // Invoices for User 5
      {
        user_id: createdUsers[4].id,
        vendor_name: 'Vendor I',
        amount: 110.0,
        due_date: new Date(),
        description: 'Invoice 1 for William Jones',
        paid: false,
      },
      {
        user_id: createdUsers[4].id,
        vendor_name: 'Vendor J',
        amount: 190.0,
        due_date: new Date(),
        description: 'Invoice 2 for William Jones',
        paid: true,
      },
    ];

    const createdInvoices = await prisma.invoice.createMany({
      data: invoicesData,
    });

    console.log('Created invoices:', createdInvoices);
  } catch (error) {
    console.error('Error creating seed data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
