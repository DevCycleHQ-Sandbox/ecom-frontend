import { setupDevCycle } from "@devcycle/nextjs-sdk/server"
import { cookies } from "next/headers"

const getUserIdentity = async () => {
  const cookieStore = await cookies()
  const userId = cookieStore.get("user_id")?.value || "anonymous"
  return {
    user_id: userId,
  }
}

export const {
  getVariableValue,
  getClientContext,
  getAllVariables,
  getAllFeatures,
} = setupDevCycle({
  serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? "",
  clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? "",
  userGetter: getUserIdentity,
  options: {},
})
