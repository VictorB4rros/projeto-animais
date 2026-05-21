import './styles.css';
import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <header className="header">
            <nav className="container">
                <Link to={"/"}>
                    <h1>MeAdota.com</h1>
                </Link>
                <div className="navbar-right">
                    <div className="menu-items-container">

                        <div className="menu-item">

                        </div>

                    </div>
                </div>
            </nav>
        </header>
    );
}