import Pagination from "./components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const validParams = await searchParams;
  return (
    <Pagination
      currentPage={parseInt(validParams.page)}
      pageSize={10}
      itemCount={100}
    />
  );
}
