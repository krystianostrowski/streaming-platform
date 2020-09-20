import React from 'react';
import styles from './nav.module.css';

class Nav extends React.Component 
{   
    state = {
        isMenuOpen: false,
        isCPDropdownOpen: false,
        isUserDropdownOpen: false,
    }

    toggleIsMenuOpen = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    };

    toggleIsCPDropdownOpen = () => {
        this.setState({
            isCPDropdownOpen: !this.state.isCPDropdownOpen
        });
    };

    toggleIsUserDropdownOpen = () => {
        this.setState({
            isUserDropdownOpen: !this.state.isUserDropdownOpen
        });
    };

    render() {
        const { lv, login } = this.props.user;
        const { isMenuOpen, isCPDropdownOpen, isUserDropdownOpen } = this.state;

        return(
            <>
                <button
                    className={isMenuOpen ? [styles.button, styles.buttonActive].join(' ') : styles.button } 
                    onClick={this.toggleIsMenuOpen} 
                >
                    <div className={styles.hamburger} />
                </button>
                <div className={isMenuOpen ? [styles.navWrapper, styles.navOpen].join(' ') : styles.navWrapper} >
                    <ul className={styles.nav}>
                        <li><a href="/browse">Browse</a></li>
                        <li><a href="/music">Music</a></li>
                        <li><a href="/video">Video</a></li>
                        {lv == 1 || lv == 2 && <CPMenu clickFn={this.toggleIsCPDropdownOpen} isOpen={isCPDropdownOpen} lv={lv} />}
                        <li onClick={this.toggleIsUserDropdownOpen}><span>{login}</span>
                            <ol className={isUserDropdownOpen ? [styles.submenu, styles.submenuOpen].join(' ') : styles.submenu }>
                                <li><a href="/logout">Logout</a></li>
                                <li><a href="/error/notImplemented">Settings</a></li>
                            </ol>
                        </li>
                    </ul>
                </div>
                <div onClick={this.toggleIsMenuOpen} className={isMenuOpen ? [styles.blur, styles.blurActive].join(' ') : styles.blur} />
            </>
        );
    }
}

function CPMenu({lv, clickFn, isOpen})
{
    return(
        <li onClick={clickFn}><span>Control Panel</span>
            <ol className={isOpen ? [styles.submenu, styles.submenuOpen].join(' ') : styles.submenu }>
                {(lv == 1 || lv == 2) && <li><a href="/control-panel/media">Media</a></li>}
                {(lv == 2) && <li><a href="/control-panel/categories">Categories</a></li>}
                {(lv == 2) && <li><a href="/control-panel/">Manage users</a></li>}
            </ol>
        </li>
    )
}

export default Nav;