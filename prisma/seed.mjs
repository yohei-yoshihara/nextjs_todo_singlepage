import { PrismaClient } from "@/app/lib/generated/client";

const db = new PrismaClient();

async function main() {
  await db.task.deleteMany();

  for (let i = 0; i < 20; i++) {
    await db.task.create({
      data: {
        title: `Task ${i}`,
        description: `This is Task ${i}'s description.`,
        completed: i % 3 == 0
      },
    });
  }
}

main();
