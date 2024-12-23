import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function BrideAndGroom() {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 text-center text-xl font-semibold">Bride & Groom</h2>
      <div className="flex items-center justify-around">
        <div className="text-center">
          <Avatar className="mb-2 h-24 w-24">
            <AvatarImage
              src="/us/shofa.jpg"
              alt="Shofa"
              className="aspect-square object-cover"
            />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold">Shofa</h3>
        </div>
        <div className="text-4xl text-red-500">&hearts;</div>
        <div className="text-center">
          <Avatar className="mb-2 h-24 w-24">
            <AvatarImage
              src="/us/yandi.jpg"
              alt="Yandi"
              className="aspect-square object-cover"
            />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold">Yandi</h3>
        </div>
      </div>
    </div>
  )
}
