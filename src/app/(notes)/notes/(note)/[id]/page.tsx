export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Note {JSON.stringify(params)}</h1>
    </div>
  )
}
