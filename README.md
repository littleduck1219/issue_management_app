# Work Manager

작업관리 웹 사이트 : <a href="https://www.workmanager.store/">방문하기</a>

## Skill

<div align="center">
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/Radix UI-161618?style=flat-square&logo=radixui&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
<img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/>
<img src="https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white"/>

<img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=flat-square&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>
<img src="https://img.shields.io/badge/Zustand-592E3F?style=flat-square&logo=&logoColor=white"/>
<img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white"/>
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/Sentry-362D59?style=flat-square&logo=sentry&logoColor=white"/>
</div>

## work

-   Next.js를 사용, 서버 사이드 렌더링(SSR)로 초기 로딩 속도를 향상시키고 SEO향상
-   페이지의 요소가 동시에 렌더링 될 수 있도록 동적 페이지 업로드 적용
-   Tanstack Query를 사용하여 Next.js의 cache를 무시하고 효율적인 업데이트 적용
-   Prisma와 Superbase를 결합하여 작업데이터, 유저 데이터를 효율적으로 관리하고 백엔드 데이터베이스로 사용
-   로딩중 시각적으로 활동을 유지를 스켈레톤 표시하여 사용자 경험 향상
-   지속적인 기능 업데이트와 주기적인 리팩토링 진행

#### page

-   Dashboard page(landing page)
-   Work list page
-   New work page
-   Work edit page
-   Work detail page

## shooting

### prisma와 Next.js API를 결합하여 백엔드 기능 구축

-   Prisma에서 관계형 데이터 모델을 정의하고 Superbase에 연결하여 데이터 베이스를 구축 했습니다.

    ```sql
    model Issue {
        id               Int            @id @default(autoincrement())
        title            String         @db.VarChar(255)
        description      String         @db.VarChar(255)
        status           Status         @default(OPEN)
        createdAt        DateTime       @default(now())
        updatedAt        DateTime       @updatedAt
        assignedToUserId String?        @db.VarChar(255)
        assignedToUser   User?          @relation(name: "assign", fields: [assignedToUserId], references: [id])
        issueComments    IssueComment[]
        userId           String

        createdByUser User @relation(name: "createdByUser", fields: [userId], references: [id], onDelete: Cascade)
    }

    ```

-   Next.js API를 이용 엔드포인트 구축하여 HTTP요청을 처리하여 CRUD를 구현했습니다.

    ```tsx
    // API
    export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
        const issue = await prisma.issue.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                issueComments: true,
            },
        });
        return NextResponse.json(issue);
    }

    // 요청
    const { data: issue, isLoading } = useQuery({
        queryKey: ["issue", params.id],
        queryFn: async () => {
            const response = await axios.get(`/api/issues/${params.id}`);
            return response.data;
        },
        staleTime: 0,
    });
    ```

### 유효성 검사 및 폼 처리를 위해 Zod와 React Hook Form을 결합하여 사용

-   Zod를 사용하여 안전한 데이터 유형 검사 및 유효성 검사 설정

    ```tsx
    import { z } from "zod";

    export const issueSchema = z.object({
        title: z.string().min(1, "too short").max(255),
        description: z.string().min(1).max(65535),
    });

    export const patchIssueSchema = z.object({
        title: z.string().min(1, "too short").max(255).optional(),
        description: z.string().min(1).max(65535).optional(),
        assignedToUserId: z
            .string()
            .min(1, "Assigned to user is required")
            .max(255)
            .optional()
            .nullable(),
    });

    export const issueCommentSchema = z.object({
        comment: z.string().min(1).max(65535),
    });
    ```

    클라이언트에서 서버로 전송되는 데이터의 유효성을 검사하고, 데이터의 형식이 예상대로 일치하는지 확인하여 데이터의 무결성을 보장합니다.

-   React Hook Form을 사용하여 useForm, Controller 등의 훅을 사용하여 폼을 초기화하고 제어합니다.

    ```tsx
    type IssueFormData = z.infer<typeof issueSchema>;

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>({ resolver: zodResolver(issueSchema) });

    <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
            <TextField.Input
                defaultValue={issue?.title}
                placeholder='Title'
                {...register("title")}
            />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
            name='description'
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
            {issue ? "Update Issue" : "New Issue"}
            {isSubmitting && <Spinner />}
        </Button>
    </form>;
    ```

    폼 입력 값을 추적하고 제어하여 유효성 검사를 수행하고, 이를 통해 사용자가 입력한 데이터를 쉽게 처리하고 유효성을 검증합니다.

## Troubleshooting & Additional Work Contents

<details>
    <summary>2024. 03. 18 배포 및 작업 현황</summary>

-   Vercel 배포 완료

    -   Dashboard page(landing page)

        -   전체 작업 분포 표시
        -   한 눈에 보기 쉽게 시각적연출, 차트 사용
        -   최근 5개 작업 출력

    -   Work list page

        -   작업의 제목, 상태, 담당자를 간결하게 표시

    -   New work page

        -   React simple markdown을 사용하여 게시글 작성
        -   Dynamic rendering을 사용하여 동적 렌더링 구현

    -   Work edit page

        -   효율 적인 컴포넌트 분리로 New page와 Edit page의 form 로직 재사용

    -   Work detail page
        -   세션 관리를 통해 권한 분리

</details>
<br>
<details>
    <summary>2024. 03. 23 Troubleshooting) status 변경 기능 구현</summary>

-   초기 Prisma Query를 사용하여 작업 내용을 호출 했었음. 데이터 변경을 위해 useEffect, Zustand 등 방법을 구상
    상세페이지 최상단 컴포넌트를 서버 컴포넌트로 유지하고 Hooks를 사용하기 위해 내부 컴포넌트를 분리, 클라이언트 컴포넌트로 변경

    **오류** : 원할한 데이터 변경에 실패하였음.

-   Tanstack Query(React Query)의 캐싱기능을 사용하기로 함. Prisma Query를 Tanstack Query로 변경하고 mutation을 사용하여 작업 상태 변경을 하는데 있어, invalidateQueries를 사용하여 작업 성공 시점에 기존 캐시를 무효화하고 새로운 데이터를 업데이트 하게 함

    **결과** : 작업 상태 변경시 즉각적인 데이터 변경이 이루어짐.

    ```tsx
    const updateIssueStatus = useMutation({
        mutationKey: ["issue"],
        mutationFn: async (status: Status) => {
            return axios.patch(`/api/issues/${issue.id}`, { status });
        },

        onSuccess: (data, variables) => {
            console.log(variables);
            queryClient.invalidateQueries({ queryKey: ["issue"] });
        },
        onError: (error) => {
            console.error("Error updating issue status:", error);
        },
    });

    const handleStatusChange = (selectedStatus: Status) => {
        updateIssueStatus.mutate(selectedStatus);
    };
    ```

    </details>
