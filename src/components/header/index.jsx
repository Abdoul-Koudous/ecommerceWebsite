import React from 'react'

import { Link } from 'react-router-dom';
import Search from '../search';
import { FaHeart, FaShoppingCart, FaBalanceScale } from "react-icons/fa";
import Navigation from './navigation';
const Header = () => {
  return (
    <header>
        <div className="top-strip">
            <div className="container">
                <div className="cont1">
                    <p>Obtenez 25%, de reduction sur vos achat de cette semaine !!!</p>
                </div>
                <div className="cont2">
                    <ul>
                        <li><Link to="track-order" className='lien'>Suivre la commande</Link></li>
                        <li><Link to="help-center" className='lien'>Centre d'aide</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="header">
            <div className="container">
                <div className="cont1">
                    <Link to={"/"}><img src="/logo.png" alt="" /></Link>
                </div>
                <div className="cont2">
                    <Search/>
                </div>
                <div className="cont3">
                    <ul>
                        <li><Link className='lien' to={"Login"}>Connexion</Link> | <Link className='lien' to={"Register"}>Enregistrement</Link></li>
                        <li className="iconBox">
                        <FaHeart className="icon" />
                        <span className="count">3</span>
                        <span className="tooltip">Souhaits</span>
                        </li>

                        <li className="iconBox">
                        <FaBalanceScale className="icon" />
                        <span className="count">2</span>
                        <span className="tooltip">Comparer</span>
                        </li>

                        <li className="iconBox">
                        <FaShoppingCart className="icon" />
                        <span className="count">5</span>
                        <span className="tooltip">Panier</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Navigation/>
    </header>
  )
}
export default Header;