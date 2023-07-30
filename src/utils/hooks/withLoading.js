import { useEffect, useState } from "react";

export function useLoadingEffect(promise, args, deps) {
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   action(args).
  //     then
  // }, deps)
}