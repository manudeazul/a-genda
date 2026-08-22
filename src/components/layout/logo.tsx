import Image from "next/image";

export function Logo() {
  return (
    <Image src="/brand/mark.svg" alt="a-genda" width={32} height={39} priority className="h-8 w-auto select-none" />
  );
}
