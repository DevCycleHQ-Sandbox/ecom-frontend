import { DevCycleJSON } from "@devcycle/js-client-sdk"

declare module "@devcycle/types" {
  interface CustomVariableDefinitions extends DVCVariableTypes {
    // Marker property to satisfy lint rule requiring a non-empty interface
    __dvc_non_empty__?: never
  }
}

export type CustomData = {
  "is-premium-user"?: boolean
  email?: string
  has_awards?: boolean
}
export type DVCVariableTypes = {
  /**
   * key: saleprice
   * created by: Parth Suthar
   * created on: 2025-09-05
   */
  saleprice: number
  /**
   * key: banner-props
   * created by: Parth Suthar
   * created on: 2025-07-03
   */
  "banner-props": DevCycleJSON
  /**
   * key: show-canada-day-banner
   * created by: Parth Suthar
   * created on: 2025-07-03
   */
  "show-canada-day-banner": boolean
  /**
   * key: new-flow
   * created by: Parth Suthar
   * created on: 2025-06-20
   */
  "new-flow": boolean
  /**
   * key: use-neon
   * created by: Parth Suthar
   * created on: 2025-06-20
   */
  "use-neon": boolean
  /**
   * key: free-shipping
   * created by: Parth Suthar
   * created on: 2025-06-19
   */
  "free-shipping": boolean

  /**
   * key: example-text
   * created by: Parth Suthar
   * created on: 2024-11-08
   */
  "example-text": string
  /**
   * key: togglebot-speed
   * created by: Parth Suthar
   * created on: 2024-11-08
   */
  "togglebot-speed": string
  /**
   * key: togglebot-wink
   * created by: Parth Suthar
   * created on: 2024-11-08
   */
  "togglebot-wink": boolean
  /**
   * key: feature-to-test
   * created by: Parth Suthar
   * created on: 2023-09-25
   */
  "feature-to-test": string
}

/**
 * key: show-popular-product-border
 * description: Whether to render the highlighted border around the Popular Products section.
 * created by: Parth Suthar
 * created on: 2025-09-05
 * @deprecated This variable is part of complete feature "Popular Products" and should be cleaned up.

*/

/**
 * key: show-popular-products
 * description: Whether to render the Popular Products section.
 * created by: Parth Suthar
 * created on: 2025-09-05
 * @deprecated This variable is part of complete feature "Popular Products" and should be cleaned up.

*/

/**
 * key: saleprice
 * created by: Parth Suthar
 * created on: 2025-09-05
 */

export const SALEPRICE = "saleprice" as const

/**
 * key: banner-props
 * created by: Parth Suthar
 * created on: 2025-07-03
 */

export const BANNER_PROPS = "banner-props" as const

/**
 * key: show-canada-day-banner
 * created by: Parth Suthar
 * created on: 2025-07-03
 */

export const SHOW_CANADA_DAY_BANNER = "show-canada-day-banner" as const

/**
 * key: new-flow
 * created by: Parth Suthar
 * created on: 2025-06-20
 */

export const NEW_FLOW = "new-flow" as const

/**
 * key: use-neon
 * created by: Parth Suthar
 * created on: 2025-06-20
 */

export const USE_NEON = "use-neon" as const

/**
 * key: free-shipping
 * created by: Parth Suthar
 * created on: 2025-06-19
 */

export const FREE_SHIPPING = "free-shipping" as const

/**
 * key: complete
 * created by: Parth Suthar
 * created on: 2025-06-05
 * @deprecated This variable is part of complete feature "complete" and should be cleaned up.

*/

/**
 * key: example-text
 * created by: Parth Suthar
 * created on: 2024-11-08
 */

export const EXAMPLE_TEXT = "example-text" as const

/**
 * key: togglebot-speed
 * created by: Parth Suthar
 * created on: 2024-11-08
 */

export const TOGGLEBOT_SPEED = "togglebot-speed" as const

/**
 * key: togglebot-wink
 * created by: Parth Suthar
 * created on: 2024-11-08
 */

export const TOGGLEBOT_WINK = "togglebot-wink" as const

/**
 * key: feature-to-test
 * created by: Parth Suthar
 * created on: 2023-09-25
 */

export const FEATURE_TO_TEST = "feature-to-test" as const
