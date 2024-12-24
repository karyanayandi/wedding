export function Videos() {
  return (
    <div className="rounded-lg bg-white p-4 shadow duration-500 animate-in slide-in-from-top">
      <div className="grid gap-2">
        <video
          autoPlay
          muted
          loop
          className="h-full w-full rounded-lg object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
