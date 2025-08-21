import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import ValidationIcon from "./validation-icon"

export interface InputWithValidationProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean
  hasError?: boolean
  showValidation?: boolean
  showValidationOnlyAfterSubmit?: boolean
  isSubmitted?: boolean
}

const InputWithValidation = React.forwardRef<HTMLInputElement, InputWithValidationProps>(
  ({ 
    className, 
    isValid = false, 
    hasError = false, 
    showValidation = true, 
    showValidationOnlyAfterSubmit = false,
    isSubmitted = false,
    value, 
    ...props 
  }, ref) => {
    const isEmpty = !value || value === ""
    
    // Determine if we should show validation styles
    const shouldShowValidation = showValidationOnlyAfterSubmit ? isSubmitted : true
    
    return (
      <div className="relative">
        <Input
          className={cn(
            // Add padding for icon
            showValidation && "pr-10",
            // Border colors based on validation state
            // Only show green border when validation should be shown, field is valid, has content, and no errors
            shouldShowValidation && isValid && !hasError && !isEmpty && "border-green-500/50 focus-visible:border-green-500",
            // Only show red border when validation should be shown and field has errors
            shouldShowValidation && hasError && "border-red-500/50 focus-visible:border-red-500",
            className
          )}
          value={value}
          ref={ref}
          {...props}
        />
        {showValidation && shouldShowValidation && (
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