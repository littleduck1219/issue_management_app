import Image from "next/image";
import NavBar from "./NavBar";
import PageNation from "@/app/_components/Pagenation";

export default function Home() {
    return <PageNation itemCount={100} pageSize={10} currentPage={2}></PageNation>;
}
