import React from 'react';
import { Button } from "@nextui-org/react";

function CustomButton({onPress, endContent,radius, type, disabled, className, children, size, color, as, href, onClick, isLoading, variant, icon }) {
    return (
        <Button
            onPress={onPress}
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
            endContent={endContent}
        >
            {children}
        </Button>
    );
}

export default CustomButton;
