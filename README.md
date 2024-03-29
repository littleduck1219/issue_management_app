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

<details>
    <summary>2024. 03. 18</summary>

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
