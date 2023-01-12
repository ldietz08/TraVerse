import { Link } from "react-router-dom";
import { logout } from "../../firebase/Firebase";
import "./Header.scss";
import TraverseLogo from "../../assets/logo/traverse-logo.png";

const Header = ({ setIsAuth, isAuth }) => {
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      setIsAuth(false);
    } catch (err) {
      console.log("An error has occurred", err);
    }
  };
  return (
    <>
      <header className="header">
        <div>
          <Link className="navBar__list-link" to="/">
            <img className="header__logo" src={TraverseLogo} alt="Traverse logo"></img>
          </Link>
        </div>
        <div>
          <nav className="navBar">
            <ul className="navBar__list">
              <Link className="navBar__list-link" to="/">
                <li className="navBar__list-item">Home</li>
              </Link>
              <Link className="navBar__list-link" to="/favorites">
                <li className="navBar__list-item">Favorites</li>
              </Link>
              <Link className="navBar__list-link" to="/bulletin">
                <li className="navBar__list-item">Bulletin</li>
              </Link>
              {!isAuth ? (
                <Link className="navBar__list-link" to="/login">
                  <li className="navBar__list-item navBar__auth">Login</li>
                </Link>
              ) : (
                <Link
                  className="navBar__list-link"
                  to="/login"
                  onClick={handleLogout}
                >
                  <li className="navBar__list-item navBar__auth">Logout</li>
                </Link>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
