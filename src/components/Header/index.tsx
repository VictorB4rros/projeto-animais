import './styles.css';
import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <header className="header">
            <nav className="container">
                <Link to={"/"}>
                    <h1>MeAdota.com</h1>
                </Link>
            </nav>
        </header>
    );
}