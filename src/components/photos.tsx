import Image from "next/image"

export function Photos() {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="grid grid-cols-3 gap-2">
        <Image
          src="/photos/1.jpg"
          alt="1"
          width={200}
          height={200}
          className="aspect-square h-auto w-full rounded-lg object-cover"
        />
        <Image
          src="/photos/2.jpg"
          alt="2"
          width={200}
          height={200}
          className="aspect-square h-auto w-full rounded-lg object-cover"
        />
        <Image
          src="/photos/3.jpg"
          alt="3"
          width={200}
          height={200}
          className="aspect-square h-auto w-full rounded-lg object-cover"
        />
        <Image
          src="/photos/4.jpg"
          alt="4"
          width={200}
          height={200}
          className="aspect-square h-auto w-full rounded-lg object-cover"
        />
        <Image
          src="/photos/5.jpg"
          alt="5"
          width={200}
          height={200}
          className="aspect-square h-auto w-full rounded-lg object-cover"
        />
        <Image
          src="/photos/6.jpg"
          alt="6"
          width={200}
          height={200}
          className="aspect-square h-auto w-full rounded-lg object-cover"
        />
      </div>
    </div>
  )
}
