// app/components/Button.tsx

import React from 'react';
import { Button } from "@nextui-org/react";
function CustomButton({ radius,type,disabled,className,children,size,color,as,href, onClick , isLoading, variant ,icon}) {
    return (
        <Button 
            color={color} 
            onClick={onClick} 
            isLoading={isLoading} 
            variant={variant}
            as={as}
            href={href}
            startContent={icon}
            size={size}
            className={className}
            type={type}
            disabled={disabled}
            radius={radius}
        >
            {children}
        </Button>
    );
}

export default CustomButton;
