import Link from 'next/link';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import styles from './styles.module.scss';

export function Header({ options, onSearch }) {
    const [search, setSearch] = useState('');
    const [isMenu, setIsMenu] = useState('-100%');
    const [moveHeader, setMoveHeader] = useState('0px');

    const onEnter = (event) => {
        if (event.key === 'Enter') {
            onSearch(event.target.value);
        }
    }

    const handleMenu = () => {
        if (isMenu == '100%') {
            setIsMenu('-100%');
            setMoveHeader('0px');
            enableBodyScroll(document);
        } else {
            setIsMenu('100%');
            setMoveHeader('-28px');
            disableBodyScroll(document);
        }
    }

    return (
        <header className={styles.container} style={{
            transform: `translateY(${moveHeader})`
        }}>
            <div className={styles.access}>
                <div>
                    <span>Acesse sua Conta</span>&nbsp; ou &nbsp;<span>Cadastra-se</span>
                </div>
            </div>
            <div className={styles.mobileMenu} style={{
                transform: `translateX(${isMenu})`,
                visibility: `${isMenu == '100%' ? 'visible' : 'hidden'}`
            }}>
                <ul className={styles.list}>
                    <Link href="/">
                        <li className={styles.listItem}>
                            <span className={styles.link}>Página Inicial</span>
                        </li>
                    </Link>
                    {options.map(item => (
                        <Link href={`/categories/${item.path}`} key={item.id}>
                            <li className={styles.listItem}>
                                <span className={styles.link}>{item.name}</span>
                            </li>
                        </Link>
                    ))}
                    <li className={styles.listItem}>
                        <span className={styles.link}>Contato</span>
                    </li>
                </ul>
            </div>
            <div className={styles.content}>
                <div>
                    <div className={styles.mobileIcon}>
                        <input type="checkbox" className={styles.check} id="check" onClick={handleMenu} />
                        <label htmlFor="check" className={styles.mobileLabel}></label>
                        <span className={styles.mobileSpan}></span>
                    </div>
                    <img src="/logo_webjump.png" alt="Logo" />
                    <div className={styles.filter}>
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            onKeyPress={(event) => onEnter(event)}
                        />
                        <button onClick={() => onSearch(search)}>Buscar</button>
                    </div>
                    <MdSearch className={styles.search} />
                </div>
            </div>
            <div className={styles.menu}>
                <div>
                    <ul>
                        <Link href="/">
                            <li>
                                <span className={styles.linkAnimate}>Página Inicial</span>
                            </li>
                        </Link>
                        {options.map(item => (
                            <Link href={`/categories/${item.path}`} key={item.id}>
                                <li>
                                    <span className={styles.linkAnimate}>{item.name}</span>
                                </li>
                            </Link>
                        ))}
                        <li>
                            <span className={styles.linkAnimate}>Contato</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}