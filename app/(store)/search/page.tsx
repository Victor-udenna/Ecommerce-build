export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
  const { query } = await searchParams;
  return (
    <div>
      <h1 className="text-2xl font-bold">Search Page</h1>
      <p>search result for {query}</p>
    </div>
  );
}
