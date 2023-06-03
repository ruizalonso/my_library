import Link from 'next/link'

export const metadata = {
  title: 'Bienvenido! Registra toso tus libros',
  description: 'Generated by create next app',
}

const Home = () => {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-2xl sm:py-48 lg:py-36">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Tu rincón literario...
          </h1>
          <p className="mt-6 text-lg leading-8">
            Explora tus libros preferidos en una biblioteca virtual
            diseñada para ti. Descubre un espacio personalizado para organizar y
            explorar tu biblioteca literaria. Guarda tus libros favoritos,
            encuentra nuevas historias y comparte tu pasión por la lectura en un
            entorno diseñado para amantes de los libros.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/login" className="btn btn-neutral btn-wide">
              Iniciar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home