import { DashboardNavbar } from '@/components/dashboard/dashboard-navbar'
import { DashboardHomeClient } from '@/components/dashboard/DashboardHomeClient'
import React from 'react'

export default function page() {
  return (
    <div>
        <DashboardNavbar />
        <div className='max-w-7xl p-5 mx-auto'><DashboardHomeClient /></div>
        
    </div>
  )
}
