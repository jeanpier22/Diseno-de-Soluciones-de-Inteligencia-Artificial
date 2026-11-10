import { Link } from 'react-router-dom'
import { Unplug } from 'lucide-react'

export default function NoEncontrado() {
  return (
    <div className="mx-auto grid max-w-xl place-items-center px-5 py-28 sm:px-8 text-center">
      <span className="grid h-20 w-20 place-items-center rounded-3xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <Unplug className="h-9 w-9" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-white">
        Página no encontrada
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        No encontramos la página que buscabas. Puede que el recurso todavía no esté publicado.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
