import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`btn ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

/**
 * Component

export default function Button({ children, className = '', ...props }: ButtonProps) {
Destructuring:

children — what's inside the button
className — optional extra CSS classes (defaults to '')
...props — everything else (onClick, disabled, type, etc.)
Render

<button className={`btn ${className}`.trim()} {...props}>
  {children}
</button>
btn — shared style from index.css
${className} — lets you add more classes if needed
{...props} — forwards remaining props to the real <button>
{children} — renders the content
Example usage
<Button type="submit" disabled={loading} onClick={handleClick}>
  Log in
</Button>
Becomes roughly:

<button class="btn" type="submit" disabled>
  Log in
</button>
Why build it?
Instead of repeating <button className="btn" ...> everywhere, you define styles once and reuse Button across LoginPage, Navbar, etc. If you change button styling later, you update one component.
 */