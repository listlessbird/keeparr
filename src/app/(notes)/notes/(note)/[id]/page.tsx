import NovelEditor from "@/components/editor/editor"

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-full w-full flex-col items-center gap-4 p-4 sm:px-5">
      <NovelEditor />
    </div>
  )
}
