import { ArrowRight, BookOpenCheck, FlaskConical, GraduationCap, Sparkles } from 'lucide-react'
import PracticaCard from '../components/PracticaCard'
import MaterialCard from '../components/MaterialCard'
import CertusLogo from '../components/CertusLogo'
import { Link } from 'react-router-dom'
import { CURSO, getMaterial, MATERIAL_CLASE, PRACTICAS, SESIONES_DIAPOSITIVAS } from '../data/practicas'

function Estadistica({ icono: Icono, valor, etiqueta }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
      <Icono className="h-5 w-5 shrink-0 text-brand-200" />
      <div className="leading-tight">
        <div className="text-lg font-bold text-white">{valor}</div>
        <div className="text-xs text-brand-100/80">{etiqueta}</div>
      </div>
    </div>
  )
}

function Diapositivas() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 lg:px-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Diapositivas</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Presentaciones de cada sesión, en orden. Se ven en línea y se descargan en PDF y PowerPoint.
      </p>
      <ul className="card mt-8 divide-y divide-slate-100 overflow-hidden dark:divide-slate-800">
        {SESIONES_DIAPOSITIVAS.map((s) => {
          const m = s.material && getMaterial(s.material)
          const fila = (
            <>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-brand-700 text-lg font-bold text-white">
                {s.numero}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-slate-900 dark:text-white">
                  Sesión {s.numero} · {s.titulo}
                </span>
                <span className="block text-sm text-slate-500 dark:text-slate-400">{s.temas}</span>
              </span>
              {m ? (
                <span className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300 sm:inline-flex">
                  {m.extension}
                  <ArrowRight className="h-4 w-4" />
                </span>
              ) : (
                <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  Próximamente
                </span>
              )}
            </>
          )
          return (
            <li key={s.numero}>
              {m ? (
                <Link to={`/material/${m.id}`} className="flex items-center gap-4 p-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  {fila}
                </Link>
              ) : (
                <div className="flex items-center gap-4 p-4 opacity-70">{fila}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function SeccionMateriales({ titulo, descripcion, items }) {
  if (items.length === 0) return null
  return (
    <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 lg:px-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{titulo}</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{descripcion}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m, i) => (
          <MaterialCard key={m.id} material={m} indice={i} />
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  const otros = MATERIAL_CLASE.filter((m) => m.tipo !== 'Presentación')
  const disponibles = PRACTICAS.filter((p) => p.estado === 'disponible').length

  return (
    <>
      {/* ---------------------------------------------------------- Portada */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-950">
        {/* Trama de circuito de fondo */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)',
          }}
        />
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="flex animate-fade-up flex-wrap items-center gap-3">
            <CertusLogo className="h-9" sombra />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand-100 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {CURSO.facultad} · {CURSO.periodo}
            </span>
          </div>

          <h1
            className="mt-6 animate-fade-up text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '80ms' }}
          >
            <span className="bg-gradient-to-r from-brand-200 to-white bg-clip-text text-transparent">
              {CURSO.nombre}
            </span>
          </h1>

          <p
            className="mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-brand-100/90 sm:text-lg"
            style={{ animationDelay: '160ms' }}
          >
            Presentaciones de las sesiones, cuadernos de Google Colab, datasets y guías de práctica
            en un solo lugar. Cada recurso se abre aquí mismo y se puede descargar.
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-wrap gap-3"
            style={{ animationDelay: '240ms' }}
          >
            <Estadistica icono={BookOpenCheck} valor={MATERIAL_CLASE.length} etiqueta="Materiales de clase" />
            <Estadistica icono={FlaskConical} valor={disponibles} etiqueta="Prácticas publicadas" />
            <Estadistica icono={GraduationCap} valor={CURSO.docente} etiqueta="Docente del curso" />
          </div>
        </div>

        {/* Curva de transicion hacia el contenido */}
        <div className="relative h-12">
          <div className="absolute inset-x-0 bottom-0 h-12 rounded-t-[2.5rem] bg-slate-50 dark:bg-slate-950" />
        </div>
      </section>

      {/* -------------------------------------------------------- Practicas */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Prácticas calificadas
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Elige una práctica para ver la guía, descargarla y abrir el cuaderno en Colab.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICAS.map((p, i) => (
            <PracticaCard key={p.id} practica={p} indice={i} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ Diapositivas */}
      <Diapositivas />

      {/* --------------------------------------------------- Material de clase */}
      <SeccionMateriales
        titulo="Material de clase"
        descripcion="Cuadernos, prompts y bases de datos de apoyo para practicar."
        items={otros}
      />

    </>
  )
}
