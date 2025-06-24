import {
  useBooleanFlagDetails,
  useNumberFlagDetails,
  useStringFlagDetails,
  useFlag,
  useObjectFlagDetails,
} from "@openfeature/react-sdk"

// Convenience hooks for specific types that work with DevCycle
export function useBooleanFlag(flagKey: string, defaultValue: boolean = false) {
  return useBooleanFlagDetails(flagKey, defaultValue)
}

export function useStringFlag(flagKey: string, defaultValue: string = "") {
  return useStringFlagDetails(flagKey, defaultValue)
}

export function useNumberFlag(flagKey: string, defaultValue: number = 0) {
  return useNumberFlagDetails(flagKey, defaultValue)
}

// For the general hook, we'll just pass through to DevCycle
export function useFeatureFlag(flagKey: string, defaultValue: any) {
  return useFlag(flagKey, defaultValue)
}

// Alias for object/JSON flags
export function useObjectFlag(flagKey: string, defaultValue: any) {
  return useObjectFlagDetails(flagKey, defaultValue)
}
