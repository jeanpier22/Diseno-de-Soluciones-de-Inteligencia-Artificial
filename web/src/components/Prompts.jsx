import { useState } from 'react'
import { Check, Copy, Lightbulb, Sparkles } from 'lucide-react'

/**
 * Lista de prompts de una sesion, cada uno con boton "Copiar".
 * Cada item: { titulo, prompt, nota? }. Se numeran en el orden del arreglo.
 */
function Prompt({ numero, item }) {
  const [copiado, setCopiado] = useState(false)

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(item.prompt)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      /* sin permiso de portapapeles: el texto sigue visible para copiarlo a mano */
    }
  }

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-extrabold text-white">
          {numero}
        </span>
        <h3 className="min-w-0 flex-1 pt-1 text-sm font-bold leading-snug text-slate-900 dark:text-white">
          {item.titulo}
        </h3>
        <button
          type="button"
          onClick={copiar}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-brand-200"
        >
          {copiado ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copiado ? 'Copiado' : 'Copiar'}
        </button>
      </div>

      <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-slate-50 p-3.5 font-sans text-sm leading-relaxed text-slate-700 dark:bg-slate-950 dark:text-slate-300">
        {item.prompt}
      </pre>

      {item.nota && (
        <p className="mt-3 flex gap-2 text-xs leading-relaxed text-amber-800 dark:text-amber-200">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{item.nota}</span>
        </p>
      )}
    </li>
  )
}

export default function Prompts({ items, intro }) {
  if (!items?.length) return null

  return (
    <section id="prompts" className="card p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
          <Sparkles className="h-4.5 w-4.5" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Prompts de la sesión</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Cópialos en orden en el asistente de Colab y revisa el resultado de cada paso antes de seguir
          </p>
        </div>
      </div>

      {intro && (
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{intro}</p>
      )}

      <ol className="mt-5 grid gap-4">
        {items.map((it, i) => (
          <Prompt key={it.titulo} numero={i + 1} item={it} />
        ))}
      </ol>
    </section>
  )
}
