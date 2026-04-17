import { prisma } from "./lib/prisma";

async function main() {
  await prisma.task.deleteMany();

  for (let i = 0; i < 20; i++) {
    await prisma.task.create({
      data: {
        title: `Task ${i}`,
        description: `This is Task ${i}'s description.`,
        completed: i % 3 == 0
      },
    });
  }
}

main();
