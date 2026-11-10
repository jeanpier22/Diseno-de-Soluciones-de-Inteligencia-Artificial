/**
 * Logo de CERTUS. Va siempre sobre una pastilla blanca: el logo es azul marino
 * y desaparece sobre el fondo oscuro del modo nocturno o de la portada.
 */
export default function CertusLogo({ className = 'h-7', sombra = false }) {
  return (
    <span
      className={[
        'inline-flex shrink-0 items-center rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-slate-200',
        sombra ? 'shadow-lift' : '',
      ].join(' ')}
    >
      <img
        src={`${import.meta.env.BASE_URL}img/certus-logo.png`}
        alt="CERTUS"
        className={`${className} w-auto`}
        draggable="false"
      />
    </span>
  )
}
