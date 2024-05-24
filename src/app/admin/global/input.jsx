import { Input } from '@nextui-org/react'
import React from 'react'

export default function MyInput({label, labelPlacement,variant}) {
    return (
        <Input
        label={label}
        labelPlacement={labelPlacement}
        variant={variant}
    />
    )
}
