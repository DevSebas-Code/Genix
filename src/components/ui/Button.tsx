import React, { useRef, useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button-variants';

export interface ButtonProps
    extends Omit<HTMLMotionProps<"button">, "ref" | "children">,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, children, ...props }, ref) => {
        const localRef = useRef<HTMLButtonElement>(null);
        const [position, setPosition] = useState({ x: 0, y: 0 });

        React.useImperativeHandle(ref, () => localRef.current!);

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = localRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            setPosition({ x, y });
            props.onMouseMove?.(e);
        };

        const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
            setPosition({ x: 0, y: 0 });
            props.onMouseLeave?.(e);
        };

        return (
            <motion.button
                ref={localRef}
                className={cn(buttonVariants({ variant, size, className }))}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                {...props}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {children}
                </span>

                {/* Fill effect for primary variant */}
                {variant === 'primary' && (
                    <motion.div
                        className="absolute inset-0 bg-brand-600 rounded-full -z-0"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.5, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                )}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
export default Button;
