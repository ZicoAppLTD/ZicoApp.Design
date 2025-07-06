import React from 'react';
import Text from './Text';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Button = ({
     children,
     variant = 'primary',
     size = 'default',
     disabled = false,
     href,
     onClick,
     className = '',
     textClassName = '',
     asChild = false,
     ...props
}: {
     children: React.ReactNode,
     variant?: 'primary' | 'secondary' | 'outline',
     size?: 'default' | 'lg',
     disabled?: boolean,
     href?: string,
     onClick?: () => void,
     className?: string,
     textClassName?: string,
     asChild?: boolean,
}) => {
     // Base classes that are common across all variants
     const baseClasses = "flex w-fit justify-center items-center cursor-pointer transition-all duration-500 select-none";

     // Size-specific classes
     const sizeClasses = {
          default: {
               container: "px-[15px] py-[18px] md:px-[20px]",
               text: "text-[18px] leading-[22px]"
          },
          lg: {
               container: "px-[25px] py-[15px] md:px-[30px] md:py-[20px]",
               text: "text-[22px] md:text-[25px] leading-[35px]"
          }
     };

     // Variant-specific classes
     const variantClasses = {
          primary: {
               container: "bg-primary/10 hover:bg-primary/15",
               text: "text-primary"
          },
          secondary: {
               container: "border-zinc-600/10 border-[2px] hover:bg-zinc-600/5 hover:border-zinc-600/15",
               text: "text-zinc-600"
          },
          outline: {
               container: "border-primary/10 border-[2px] hover:bg-primary/5",
               text: "text-primary"
          }
     };

     // Combine all classes
     const containerClasses = `
    ${baseClasses}
    ${variantClasses[variant].container}
    ${sizeClasses[size].container}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
    ${className}
  `.trim();

     const textClasses = `
    ${variantClasses[variant].text}
    ${sizeClasses[size].text}
    font-semibold
    ${textClassName}
  `.trim();

     const content = (
          <Text className={textClasses}>
               {children}
          </Text>
     );

     if (asChild) {
          return React.cloneElement(children as React.ReactElement<{ className?: string; onClick?: () => void }>, {
               className: cn(containerClasses),
               onClick: disabled ? undefined : onClick,
               ...props
          });
     }

     return (
          <Link
               href={disabled ? "#" : (href || "")}
               onClick={disabled ? undefined : onClick}
               className={cn(containerClasses)}
               {...props}>
               {content}
          </Link>
     );
};

export default Button;