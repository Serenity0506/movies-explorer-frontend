import { useMemo } from 'react'
import { UseCurrentUserContext } from '../context/CurrentUserContext'
import apiMain from './Api/ApiMain'

export const useApiMain = () => {
  const { onLogout } = UseCurrentUserContext()

  // https://jasonwatmore.com/post/2021/09/27/react-fetch-logout-on-401-unauthorized-or-403-forbidden-http-response
  // https://www.javascripttutorial.net/es6/javascript-proxy/
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
  // const apiMainProxy = apiMain
  const apiMainProxy = useMemo(() => new Proxy(apiMain, {
    get(target, prop) {
      return (...args) => {
        return target[prop].apply(target, args)
          .catch((res) => {
            if ([401, 403].includes(res.status)) {
              console.log('LOGOUT')
              onLogout()
            }
            return res
          })
      }
    }
  }), [onLogout])

  return apiMainProxy
}