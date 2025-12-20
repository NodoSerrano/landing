"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex w-full sm:w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      interactive: {
        true: "hover:scale-105 active:scale-95",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: true,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  target?: string;
  rel?: string;
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      href,
      icon,
      iconPosition = "left",
      children,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    // If href is provided, check if it's an anchor link
    if (href && !asChild) {
      // Handle anchor links with scroll behavior
      if (href.startsWith('#')) {
        const handleAnchorClick = () => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            // Update URL without triggering scroll
            window.history.replaceState(null, "", href);
          }
        };

        return (
          <button
            className={cn(buttonVariants({ variant, size, className, interactive: !props.disabled }))}
            onClick={handleAnchorClick}
            ref={ref as React.RefObject<HTMLButtonElement>}
          >
            {iconPosition === "left" && icon && <span>{icon}</span>}
            {children}
            {iconPosition === "right" && icon && <span>{icon}</span>}
          </button>
        );
      }

      // Regular links use Next.js Link
      const linkProps = {
        href,
        target,
        rel,
        className: cn(buttonVariants({ variant, size, className, interactive: true })),
        ...(ref && { ref: ref as React.Ref<HTMLAnchorElement> }),
      };

      return (
        <Link {...linkProps}>
          {iconPosition === "left" && icon && <span>{icon}</span>}
          {children}
          {iconPosition === "right" && icon && <span>{icon}</span>}
        </Link>
      );
    }

    // Otherwise, use button or Slot
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, interactive: !props.disabled }))}
        ref={ref as React.RefObject<HTMLButtonElement>}
        {...props}
      >
        {iconPosition === "left" && icon && <span>{icon}</span>}
        {children}
        {iconPosition === "right" && icon && <span>{icon}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
