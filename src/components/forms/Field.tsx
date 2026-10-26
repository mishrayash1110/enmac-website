'use client';

import {Children, cloneElement, isValidElement, useId, useState, type ReactNode, type ReactElement, type HTMLAttributes} from 'react';

/** Displays the browser's existing validation rules without changing those rules. */
export default function Field({children, className, hint}: {children: ReactNode; className?: string; hint?: string}) {
  const id = useId();
  const [error, setError] = useState('');
  function validate(target: EventTarget | null) {
    if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) {
      setError(target.validity.valid ? '' : target.validationMessage);
    }
  }
  return <div className={className} onBlurCapture={event => validate(event.target)} onInvalidCapture={event => validate(event.target)} onInputCapture={event => { if (error) validate(event.target); }}><label>
    {Children.map(children, child => {
      if (!isValidElement(child) || (child.type !== 'input' && child.type !== 'select')) return child;
      const control = child as ReactElement<HTMLAttributes<HTMLInputElement>>;
      const describedBy = [control.props['aria-describedby'], hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ');
      return cloneElement(control, {id: control.props.id || id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy || undefined});
    })}
    </label>
    {hint && <span className="field-hint" id={`${id}-hint`}>{hint}</span>}
    {error && <span className="field-error" id={`${id}-error`} aria-live="polite">{error}</span>}
  </div>;
}
