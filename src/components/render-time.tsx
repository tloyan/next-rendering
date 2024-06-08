import EnvComponent from './env-component'

export default function RenderTime() {
  return (
    <div className="border-grey-100 border-2">
      <p className="animate-color-cycle text-sm">
        Rendu le {new Date().toISOString()}
      </p>
      <EnvComponent name={RenderTime.name} disabled={true} />
    </div>
  )
}
