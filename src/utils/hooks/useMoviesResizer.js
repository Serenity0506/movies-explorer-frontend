import { useEffect } from 'react'
import { movieMoarSettings } from '../movieMoarSettings'

export const useMoviesResizer = (setInitial, setIncrease) => {

  useEffect(() => {
    const initialMoarSettings = movieMoarSettings()
    const handleResize = () =>
      setIncrease(movieMoarSettings().increase)

    window.addEventListener('resize', handleResize)

    setInitial(initialMoarSettings.initial)
    setIncrease(initialMoarSettings.increase)

    return () => window.removeEventListener('resize', handleResize)
  }, [setInitial, setIncrease])
}

