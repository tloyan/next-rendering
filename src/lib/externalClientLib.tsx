//DO NOT EDIT IT
//IT SIMULATES AN EXTERNAL LIBRARY
import * as React from 'react'
import {useBoolean, useInterval} from 'react-use'

export default function ExternalLib({defaultDelay = 1000}) {
  const [count, setCount] = React.useState(0)
  const [delay, setDelay] = React.useState(defaultDelay)
  const [isRunning, toggleIsRunning] = useBoolean(true)

  useInterval(
    () => {
      setCount(count + 1)
    },
    // eslint-disable-next-line unicorn/no-null
    isRunning ? delay : null
  )

  return (
    <div>
      <h1 className="mb-4 text-center text-xl font-bold">External Librairie</h1>
      <div>
        delay:{' '}
        <input
          value={delay}
          onChange={(event) => setDelay(Number(event.target.value))}
        />
      </div>
      <h1>count: {count}</h1>
      <div>
        <button onClick={toggleIsRunning}>
          {isRunning ? 'stop' : 'start'}
        </button>
      </div>
    </div>
  )
}
