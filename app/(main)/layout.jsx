"use client"
import React from 'react'
import DashboardProvider from './provider'
function Dashboard({children}){
    return (
        <div>
            <DashboardProvider>
                {children}</DashboardProvider>
        </div>
    )
}
export default Dashboard