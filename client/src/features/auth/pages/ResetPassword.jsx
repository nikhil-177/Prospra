import React, { useEffect } from 'react'
import { AuthLayout } from '../AuthLayout'
import { useAuthLayoutStore } from '../../../store/useAuthLayoutStore'
import { ResetPasswordForm } from '../components/ResetPasswordForm'

export const ResetPassword = () => {
    const {changeMode} = useAuthLayoutStore()

    useEffect(()=>{
        changeMode('forgotPassword3')
    },[])

  return (
    <AuthLayout>
        <ResetPasswordForm/>
    </AuthLayout>
  )
}
