import React from 'react'
import { DashboardNavbar } from '@/components/common/dashboard-navbar'

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
}

export default function layout({ children }: AuthenticatedLayoutProps) {
    return (
        <div>
            <DashboardNavbar />
            <main className="p-5 mx-auto max-w-360">
                {children}
            </main>
        </div>
    )
}
