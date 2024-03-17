// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//     return new PrismaClient({ log: ["query"] });
// };

// declare global {
//     var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// import { PrismaClient } from "@prisma/client";

// let prisma: PrismaClient;

// const prismaClientSingleton = () => {
//     if (!prisma) {
//         prisma = new PrismaClient({ log: ["query"] });
//     }
//     return prisma;
// };

// export default prismaClientSingleton();

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// (async () => {
//     try {
//         console.log(await prisma.widget.create({ data: {} }));
//     } catch (err) {
//         console.error("error executing query:", err);
//     } finally {
//         prisma.$disconnect();
//     }
// })();

// prisma/client.ts 파일

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

const prismaClientSingleton = () => {
    if (!prisma) {
        prisma = new PrismaClient({ log: ["query"] });
    }
    return prisma;
};
prismaClientSingleton();
export { prisma };
