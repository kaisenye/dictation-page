"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AuthLayout from "@/components/auth/auth-layout"
import { InputWithValidation } from "@/components/ui/input-with-validation"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function UpdatePasswordPage() {
  const supabase = createClient()
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [status, setStatus] = useState<"idle" | "updating" | "updated" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  // If link sets a session, user will be authenticated. We keep this page accessible via middleware exception.
  const isValidPassword = (val: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(val)
  const passwordsMatch = password.length > 0 && password === confirm

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setStatus("updating")

    if (!isValidPassword(password) || !passwordsMatch) {
      setError("Please enter a strong password and confirm it correctly.")
      setStatus("error")
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setStatus("updated")
      // Let user proceed to dashboard after a brief moment
      setTimeout(() => router.replace("/dashboard"), 800)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update password")
      setStatus("error")
    }
  }

  return (
    <AuthLayout title="Set a new password" subtitle="Enter and confirm your new password">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <InputWithValidation
            id="password"
            type="password"
            placeholder="At least 8 chars, mixed case & number"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isValid={isValidPassword(password)}
            hasError={!!password && !isValidPassword(password)}
            showValidationOnlyAfterSubmit
            isSubmitted={status !== "idle"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm Password</Label>
          <InputWithValidation
            id="confirm"
            type="password"
            placeholder="Re-enter your new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            isValid={passwordsMatch}
            hasError={!!confirm && !passwordsMatch}
            showValidationOnlyAfterSubmit
            isSubmitted={status !== "idle"}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-900/20 border border-red-800 rounded-md">
            <p className="text-sm text-red-400" role="alert">{error}</p>
          </div>
        )}

        {status === "updated" && (
          <div className="p-3 bg-green-900/20 border border-green-800 rounded-md">
            <p className="text-sm text-green-400">Password updated. Redirecting…</p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={status === "updating"}>
          {status === "updating" ? "Updating…" : "Update password"}
        </Button>
      </form>
    </AuthLayout>
  )
}

