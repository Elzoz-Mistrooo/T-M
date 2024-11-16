import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

// PrismaService extending PrismaClient
@Injectable()
export class PrismaService extends PrismaClient {
  // Ensure the project model is accessible via `project`
  // project = this.project;  // If this is necessary based on your setup
}

// Ensure PrismaService is correctly used in your NestJS modules
// import { PrismaService } from '../prisma/prisma.service';  // Avoid using .ts extension

const prisma = new PrismaClient();

async function main() {
  // Create some users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() => 
      prisma.user.create({
        data: {
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: faker.helpers.arrayElement(['ADMIN', 'MANAGER', 'EMPLOYEE']),
        },
      })
    )
  );

  // Create projects
  const projects = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.project.create({
        data: {
          name: faker.company.name(),
          description: faker.lorem.sentences(),
          managerId: users[Math.floor(Math.random() * users.length)].id, // Randomly assign a manager
        },
      })
    )
  );

  // Create project employees
  await Promise.all(
    projects.map((project) =>
      prisma.projectEmployee.createMany({
        data: Array.from({ length: 3 }).map(() => ({
          projectId: project.id,
          userId: users[Math.floor(Math.random() * users.length)].id, // Randomly assign an employee
        })),
      })
    )
  );

  console.log('Fake data generated!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
