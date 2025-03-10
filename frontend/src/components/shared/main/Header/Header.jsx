import "@/assets/css/header.css";
import MainHeader from "./MainHeader";
import TopHeader from "./TopHeader";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-base-100">
      <TopHeader />
      <MainHeader />
    </header>
  );
}
