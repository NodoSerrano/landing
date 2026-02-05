"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "relative neumorphism-shadow border border-white/20 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "",
        link: "text-primary underline-offset-4 hover:underline shadow-none border-0",
      },
      size: {
        default: "px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "w-8 h-8",
      },
      interactive: {
        true: "hover:scale-105 active:scale-95",
        false: "",
      },
      loading: {
        true: "grayscale opacity-50 cursor-not-allowed",
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
  target?: string;
  rel?: string;
  loading?: boolean;
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
      children,
      target,
      rel,
      loading = false,
      ...props
    },
    ref
  ) => {
    // If href is provided, check if it's an anchor link
    if (href && !asChild) {
      // Handle anchor links with scroll behavior
      if (href.startsWith("#")) {
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
            className={cn(
              buttonVariants({
                variant,
                size,
                className,
                interactive: !props.disabled && !loading,
                loading,
              })
            )}
            onClick={handleAnchorClick}
            disabled={props.disabled || loading}
            ref={ref as React.RefObject<HTMLButtonElement>}
          >
            <span
              className={`flex flex-row justify-center items-center gap-2 ${
                loading ? "invisible" : ""
              }`}
            >
              {children}
            </span>
            {loading && (
              <Loader2
                className="absolute inset-0 m-auto h-6 w-6 animate-spin"
                strokeWidth={2.5}
              />
            )}
          </button>
        );
      }

      // Regular links use Next.js Link
      const linkProps = {
        href,
        target,
        rel,
        className: cn(
          buttonVariants({
            variant,
            size,
            className,
            interactive: !loading,
            loading,
          })
        ),
        ...(ref && { ref: ref as React.Ref<HTMLAnchorElement> }),
      };

      return (
        <Link {...linkProps}>
          <span
            className={`flex flex-row justify-center items-center gap-2 ${
              loading ? "invisible" : ""
            }`}
          >
            {children}
          </span>
          {loading && (
            <Loader2
              className="absolute m-auto h-6 w-6 animate-spin"
              strokeWidth={2.5}
            />
          )}
        </Link>
      );
    }

    // Otherwise, use button or Slot
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
            interactive: !props.disabled && !loading,
            loading,
          })
        )}
        ref={ref as React.RefObject<HTMLButtonElement>}
        disabled={props.disabled || loading}
        {...props}
      >
        <span
          className={`flex flex-row justify-center items-center gap-2 ${
            loading ? "invisible" : ""
          }`}
        >
          {children}
        </span>
        {loading && (
          <Loader2
            className="absolute m-auto h-6 w-6 animate-spin"
            strokeWidth={2.5}
          />
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
