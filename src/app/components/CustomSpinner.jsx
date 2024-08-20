import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function CustomSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
        <Spinner color='success' size='lg' />
    </div>
  )
}
