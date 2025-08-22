import * as React from "react"

interface AuthLayoutProps {
    children: React.ReactNode
    title: string
    subtitle?: string
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 shadow-xl backdrop-blur-sm">
                    <h1 className="text-2xl font-bold mb-2">{title}</h1>
                    {subtitle && (
                        <p className="text-neutral-400 mb-6">{subtitle}</p>
                    )}
                    {children}
                </div>
            </div>
        </div>
    )
}