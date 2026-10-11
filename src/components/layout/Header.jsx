import TransitionLink from '../ui/TransitionLink';

// Fixed global header — editorial, minimal, automotive-inspired.
// Wordmark left, live status center, MENU button right.
function Header({ onMenuOpen, onNavigate }) {
  return (
    <header className="site-header" role="banner">
      <TransitionLink
        to="/"
        className="site-header__wordmark"
        aria-label="Vighnesh Borhade — home"
        onNavigate={onNavigate}
        data-cursor="go"
      >
        <span className="wordmark-signature">Vighnesh Borhade.</span>
      </TransitionLink>

      <div className="site-header__status" aria-hidden="true">
        <span className="status-dot" />
        <span className="status-text">PUNE, IN · AVAILABLE</span>
      </div>

      <button
        className="site-header__menu-btn"
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        data-cursor="open"
      >
        <span className="site-header__menu-label">MENU</span>
        <span className="site-header__menu-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
    </header>
  );
}

export default Header;
