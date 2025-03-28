import { prisma } from "./client";

async function main() {
  // Check if AI Assistant already exists
  const existingAiUser = await prisma.user.findFirst({
    where: { isAi: true },
  });

  if (!existingAiUser) {
    await prisma.user.create({
      data: {
        name: "AI Assistant",
        email: "ai-assistant@issuetracker.com",
        image: "/robot-icon.png", // Add image path
        isAi: true,
      },
    });
    console.log("AI Assistant seeded successfully.");
  } else {
    console.log("AI Assistant already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
