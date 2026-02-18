import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
    "relative rounded-full font-medium transition-colors duration-300 overflow-hidden group inline-flex items-center justify-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-white text-dark hover:text-white border border-transparent shadow",
                secondary: "bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20",
                outline: "bg-transparent text-white border border-white/20 hover:border-white/40",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-12 px-8 py-4",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-14 rounded-full px-10",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);
