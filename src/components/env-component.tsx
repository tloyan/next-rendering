import {cn} from '@/lib/utils'

const EnvComponent = ({
  name = 'no name',
  disabled = false,
}: {
  name?: string
  disabled?: boolean
}) => {
  const isClient = typeof window !== 'undefined'
  const environment = process.env.NODE_ENV
  if (disabled) {
    return <></>
  }
  return (
    <div>
      {isClient
        ? `📄 I am a client component (${name})`
        : `🖥️ I am a server component (${name})`}
      <span
        className={cn({
          'text-red-600': environment === 'development',
          'text-green-600': environment === 'production',
        })}
      >
        Env: {environment}
      </span>
    </div>
  )
}

export default EnvComponent
