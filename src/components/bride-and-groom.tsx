import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function BrideAndGroom() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Bride & Groom
      </h2>
      <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:gap-12">
        {/* Bride */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="mb-4 h-28 w-28">
            <AvatarImage
              src="/us/shofa.jpg"
              alt="Shofa"
              className="aspect-square rounded-full object-cover"
            />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold text-gray-800">
            Shofa Sahadatu Rohmah
          </h3>
          <p className="mt-1 max-w-xs text-xs text-gray-600">
            Putri kedua dari pasangan Bapak Apipudin dan Ibu Euis Hopipah
          </p>
        </div>
        {/* Heart */}
        <div className="my-6 text-4xl text-red-500 sm:my-0">&hearts;</div>
        {/* Groom */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="mb-4 h-28 w-28">
            <AvatarImage
              src="/us/yandi.jpg"
              alt="Yandi"
              className="aspect-square rounded-full object-cover"
            />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold text-gray-800">Yandi Karyana</h3>
          <p className="mt-1 max-w-xs text-xs text-gray-600">
            Putra kedua dari pasangan Bapak Imid dan Ibu Aas Rasmini (almh.)
          </p>
        </div>
      </div>
    </div>
  )
}
