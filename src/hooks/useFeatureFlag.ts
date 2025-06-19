import { useVariableValue } from "@devcycle/nextjs-sdk"

// Convenience hooks for specific types that work with DevCycle
export function useBooleanFlag(flagKey: string, defaultValue: boolean = false) {
  const value = useVariableValue(flagKey, defaultValue)
  return { value, loading: false, error: null }
}

export function useStringFlag(flagKey: string, defaultValue: string = "") {
  const value = useVariableValue(flagKey, defaultValue)
  return { value, loading: false, error: null }
}

export function useNumberFlag(flagKey: string, defaultValue: number = 0) {
  const value = useVariableValue(flagKey, defaultValue)
  return { value, loading: false, error: null }
}

// For the general hook, we'll just pass through to DevCycle
export function useFeatureFlag(flagKey: string, defaultValue: any) {
  const value = useVariableValue(flagKey, defaultValue)

  return {
    value,
    loading: false,
    error: null,
  }
}

// Alias for object/JSON flags
export const useObjectFlag = useFeatureFlag
