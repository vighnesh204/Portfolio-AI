import { forwardRef } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';

// Reusable internal navigation link that triggers the vertical panel page transition.
// Preserves real <a> tags, hrefs, modifier-keys, and standard Link behavior.
const TransitionLink = forwardRef(
  ({ to, children, onClick, onNavigate: explicitOnNavigate, ...rest }, ref) => {
    // Grab onNavigate from Outlet context if we are inside a page route.
    const context = useOutletContext();
    
    // Use explicit prop (from Header/MenuOverlay) or fallback to context (from Pages).
    const onNavigate = explicitOnNavigate || context?.onNavigate;
    const navigate = useNavigate();

    const handleClick = (e) => {
      // Respect modifier keys for default browser behavior (e.g. open in new tab).
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        if (onClick) onClick(e);
        return;
      }

      // Intercept normal left-click.
      e.preventDefault();
      if (onClick) onClick(e);

      if (onNavigate) {
        onNavigate(to);
      } else {
        // Fallback if no transition handler exists (e.g. rendered outside RootLayout somehow)
        navigate(to);
      }
    };

    return (
      <Link to={to} onClick={handleClick} ref={ref} {...rest}>
        {children}
      </Link>
    );
  }
);

TransitionLink.displayName = 'TransitionLink';

export default TransitionLink;
