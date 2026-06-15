'use client';

import React from 'react';
import * as Fa from 'react-icons/fa';
import * as Gi from 'react-icons/gi';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className, size }: DynamicIconProps) {
  // Check in FontAwesome
  if (name in Fa) {
    const IconComponent = Fa[name as keyof typeof Fa] as React.ComponentType<{ className?: string; size?: number }>;
    return <IconComponent className={className} size={size} />;
  }
  
  // Check in GameIcons (Gi)
  if (name in Gi) {
    const IconComponent = Gi[name as keyof typeof Gi] as React.ComponentType<{ className?: string; size?: number }>;
    return <IconComponent className={className} size={size} />;
  }

  // Fallback icon
  return <Fa.FaCogs className={className} size={size} />;
}
