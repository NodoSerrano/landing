import { Reveal } from "@/components/motion/fade-in"

export default function ConstruirTitle() {
  return (
    <Reveal className="relative z-10 mx-auto w-full max-w-[720px] px-5 py-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-display text-h1 font-bold text-(--color-text-primary-light)">
          Que tenés ganas de
        </h2>
        <h2 className="bg-gradient-warm bg-clip-text font-display text-h1 font-bold text-transparent">
          CONSTRUIR?
        </h2>
      </div>
    </Reveal>
  )
}
