import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, "글자가 짧습니다.").max(255),
    description: z.string().min(1),
});
