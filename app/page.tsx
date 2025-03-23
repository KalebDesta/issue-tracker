import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination currentPage={4} pageSize={10} itemCount={100} />;
}
