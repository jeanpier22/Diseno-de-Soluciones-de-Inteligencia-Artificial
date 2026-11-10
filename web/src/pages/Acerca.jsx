import { FlaskConical, Info, ShieldCheck } from 'lucide-react'
import CertusLogo from '../components/CertusLogo'
import { CURSO } from '../data/practicas'

export default function Acerca() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:px-12">
      <CertusLogo className="h-9" />
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Acerca de este sitio
      </h1>
      <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
        Plataforma de material del curso{' '}
        <strong className="text-slate-800 dark:text-slate-200">{CURSO.nombre}</strong> (
        {CURSO.periodo}), {CURSO.facultad}, {CURSO.institucion}. Reúne las presentaciones de las
        sesiones, los cuadernos de Google Colab, los datasets y las guías de práctica.
      </p>

      <div className="mt-10 grid gap-5">
        <section className="card flex gap-4 p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
            <Info className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">Cómo usarlo</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Cada recurso tiene su propia página con el documento a la vista y sus descargas. Los
              cuadernos se abren directamente en Google Colab: necesitas una cuenta de Google y no
              hay que instalar nada.
            </p>
          </div>
        </section>

        <section className="card flex gap-4 p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
            <FlaskConical className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">Sobre los datos</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              En la práctica, el archivo de datos contiene errores a propósito. Encontrarlos,
              documentarlos y decidir qué hacer con cada uno forma parte de la evaluación.
            </p>
          </div>
        </section>

        <section className="card flex gap-4 p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">Uso del material</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Material académico con fines educativos, elaborado por {CURSO.docente} para el curso.
              CERTUS y su logotipo pertenecen a sus titulares.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
