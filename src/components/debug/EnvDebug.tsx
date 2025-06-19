"use client"

interface EnvDebugProps {
  show?: boolean
}

export function EnvDebug({ show = false }: EnvDebugProps) {
  if (!show) return null

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const nodeEnv = process.env.NODE_ENV
  const vercelEnv = process.env.VERCEL_ENV
  const isVercel = process.env.VERCEL
  const vercelUrl = process.env.VERCEL_URL

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs font-mono z-50 max-w-md opacity-95 shadow-lg">
      <h3 className="font-bold mb-2 text-red-400">
        🔍 Vercel Environment Debug
      </h3>
      <div className="space-y-1">
        <div>
          <span className="text-yellow-400">NEXT_PUBLIC_API_URL:</span>{" "}
          <span className={apiUrl ? "text-green-400" : "text-red-400"}>
            {apiUrl || "❌ MISSING"}
          </span>
        </div>
        <div>
          <span className="text-yellow-400">NODE_ENV:</span>{" "}
          <span className="text-green-400">{nodeEnv || "undefined"}</span>
        </div>
        <div>
          <span className="text-yellow-400">VERCEL_ENV:</span>{" "}
          <span className="text-green-400">{vercelEnv || "undefined"}</span>
        </div>
        <div>
          <span className="text-yellow-400">VERCEL:</span>{" "}
          <span className="text-green-400">
            {isVercel ? "✅ true" : "❌ false"}
          </span>
        </div>
        <div>
          <span className="text-yellow-400">VERCEL_URL:</span>{" "}
          <span className="text-green-400 break-all">
            {vercelUrl || "undefined"}
          </span>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-600">
          <span className="text-yellow-400">Effective API URL:</span>{" "}
          <span className="text-blue-400 break-all">
            {apiUrl || "http://localhost:3001/api"}
          </span>
        </div>

        {!apiUrl && (
          <div className="mt-2 pt-2 border-t border-red-600 text-red-300">
            <div className="font-bold">❌ Environment Variable Missing!</div>
            <div className="text-xs mt-1">
              1. Check Vercel Dashboard → Settings → Environment Variables
              <br />
              2. Ensure variable is set for correct environment
              <br />
              3. Redeploy after adding the variable
            </div>
          </div>
        )}

        <div className="mt-2 pt-2 border-t border-gray-600 text-xs text-gray-400">
          💡 Remove this component after fixing env vars
          <br />
          🔧 Check browser Network tab for API calls
        </div>
      </div>
    </div>
  )
}
