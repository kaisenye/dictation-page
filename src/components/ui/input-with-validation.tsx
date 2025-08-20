import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import ValidationIcon from "./validation-icon"

export interface InputWithValidationProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean
  hasError?: boolean
  showValidation?: boolean
}

const InputWithValidation = React.forwardRef<HTMLInputElement, InputWithValidationProps>(
  ({ className, isValid = false, hasError = false, showValidation = true, value, ...props }, ref) => {
    const isEmpty = !value || value === ""
    
    return (
      <div className="relative">
        <Input
          className={cn(
            // Add padding for icon
            showValidation && "pr-10",
            // Border colors based on validation state
            isValid && !hasError && !isEmpty && "border-green-500/50 focus-visible:border-green-500",
            hasError && "border-red-500/50 focus-visible:border-red-500",
            className
          )}
          value={value}
          ref={ref}
          {...props}
        />
        {showValidation && (
          <ValidationIcon
            isValid={isValid}
            hasError={hasError}
            isEmpty={isEmpty}
          />
        )}
      </div>
    )
  }
)

InputWithValidation.displayName = "InputWithValidation"

export { InputWithValidation }