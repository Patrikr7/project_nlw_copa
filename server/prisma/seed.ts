import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Emerson Patrik",
  //     email: "patrikr11@gmail.com",
  //     avatarUrl: "https://github.com/patrikr7.png",
  //   },
  // });

  // const pool = await prisma.pool.create({
  //   data: {
  //     title: "",
  //     code: "BOL111",
  //     ownerId: user.id,

  //     participants: {
  //       create: {
  //         userId: user.id,
  //       },
  //     },
  //   },
  // });

  await prisma.game.create({
    data: {
      date: "2022-11-01T19:00:49.453Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });

  // await prisma.game.create({
  //   data: {
  //     date: "2022-11-05T19:00:49.453Z",
  //     firstTeamCountryCode: "BR",
  //     secondTeamCountryCode: "AR",

  //     guesses: {
  //       create: {
  //         firstTeamPoints: 1,
  //         secondTeamPoints: 1,

  //         participant: {
  //           connect: {
  //             userId_poolId: {
  //               userId: user.id,
  //               poolId: pool.id,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
}

main();
