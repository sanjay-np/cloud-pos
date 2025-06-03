import React from "react";
import * as PhosphorIcons from "@phosphor-icons/react";
import type { IconProps as PhosphorIconProps } from "@phosphor-icons/react";

export interface IconProps extends PhosphorIconProps {
    name: keyof typeof PhosphorIcons;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
    const DynamicIcon = PhosphorIcons[name] as React.FC<PhosphorIconProps>;

    if (!DynamicIcon) {
        console.warn(`Icon "${name}" not found in Phosphor Icons.`);
        return null;
    }

    return <DynamicIcon {...props} />;
};

export default Icon;
