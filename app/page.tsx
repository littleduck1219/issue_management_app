import PageNation from "@/app/_components/PageNation";

export default function Home({ searchParams }: { searchParams: { page: string } }) {
    return <PageNation itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)} />;
}
