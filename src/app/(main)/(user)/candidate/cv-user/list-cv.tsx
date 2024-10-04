import { Icons } from '#/icons'

export const ListCV = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 w-full bg-c-white p-5 rounded-md">
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl">Kĩ năng</h1>
          <button className="flex text-sm items-center gap-1 rounded-3xl p-2 px-3 bg-c-green text-white">
            <Icons.Plus />
            <span>Thêm kĩ năng</span>
          </button>
        </div>
        <div>Danh sách kĩ năng</div>
      </div>
      <div className="flex flex-col gap-4 w-full bg-c-white p-5 rounded-md">
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl">CV đã upload trên JobCV</h1>
          <button className="flex text-sm items-center gap-1 rounded-3xl p-2 px-3 bg-c-green text-white">
            <Icons.Upload />
            <span>Upload</span>
          </button>
        </div>
        <div>Danh sách CV</div>
      </div>
    </div>
  )
}
