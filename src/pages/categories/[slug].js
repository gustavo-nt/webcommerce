import Head from 'next/head';
import Link from 'next/link';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { filterProducts, sortProducts } from '../../utils/request';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Loading } from '../../components/Loader';
import { Product } from '../../components/Product';

import { FaThList } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { VscChevronRight } from 'react-icons/vsc';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';

import styles from './category.module.scss';

export default function Category({ menu, products, category }) {
    const [selected, setSelected] = useState('any');
    const [isLoader, setIsLoader] = useState(false);
    const [errorWord, setErrorWord] = useState(false);
    const [isProducts, setIsProducts] = useState(true);
    const [activeRadio, setActiveRadio] = useState('');
    const [filterType, setFilterType] = useState(false);
    const [filterColor, setFilterColor] = useState(false);
    const [optionView, setOptionView] = useState('grid');
    const [colorsProducts, setColorsProducts] = useState([]);
    const [firstProducts, setFirstProducts] = useState(products.items);
    const [currentProducts, setCurrentProducts] = useState(products.items);

    const options = [
        { value: 'any', label: 'Escolha um filtro' },
        { value: 'asc', label: 'Preço Crescente' },
        { value: 'desc', label: 'Preço Decrescente' },
        { value: 'name', label: 'Ordem Alfabética' }
    ];

    const typeProduct = [
        { value: 'corrida', label: 'Corrida' },
        { value: 'caminhada', label: 'Caminhada' },
        { value: 'casual', label: 'Casual' },
        { value: 'social', label: 'Social' },
    ]

    const colors = [
        'Azul', 'Preta', 'Rosa', 'Bege', 'Laranja', 'Amarela', 'Cinza'
    ]

    useEffect(() => {
        setFirstProducts(products.items);
        setCurrentProducts(products.items);

        const arr = [];
        products.items.forEach(product => {
            colors.forEach(color => {
                if (product.filter[0].color == color) {
                    arr.indexOf(color.toLowerCase()) > -1 ? null : arr.push(color.toLowerCase());
                }
            });
        });

        setColorsProducts(arr);
    }, [products]);

    const handleOptionsView = (type) => {
        setOptionView(type);
    }

    const handleSort = async (event) => {
        setSelected(event.target.value);
        setIsProducts(false);
        setIsLoader(true);

        if (!(event.target.value === 'any' && filterColor || filterType || (event.target.value === 'any' && activeRadio.length > 0))) {
            const sort = await sortProducts(
                event.target.value === 'any' ? category.id : currentProducts, event.target.value
            );
            setCurrentProducts(sort);
        }
        
        setIsLoader(false);
        setIsProducts(true);
    }

    const handleFilter = async (type, value) => {
        setIsProducts(false);
        setIsLoader(true);

        switch (type) {
            case 'color':
                setActiveRadio('');
                setFilterType(false);

                const filteredColor = await filterProducts(category.id, type, value);
                const sortColor = selected === 'any' ? filteredColor : await sortProducts(filteredColor, selected);

                setCurrentProducts(sortColor);
                setFilterColor(true);
                break;
            case 'gender':
                setActiveRadio(value);
                setFilterType(false);

                const gender = value === 'masculine' ? 'masculina' : 'feminina';
                const filteredGender = await filterProducts(category.id, type, gender);
                const sortGender = selected === 'any' ? filteredGender : await sortProducts(filteredGender, selected);

                setCurrentProducts(sortGender);
                break;
            case 'type':
                setActiveRadio('');
                setFilterColor(false);

                const filteredType = await filterProducts(category.id, type, value);
                const sortType = selected === 'any' ? filteredType : await sortProducts(filteredType, selected);
                setCurrentProducts(sortType);

                setFilterType(true);
                setErrorWord(value);
                break;
            default:
                console.warn('Tipo de Requisição não suportada!');
        }

        setIsLoader(false);
        setIsProducts(true);
    }

    const onSearch = async (value) => {
        setIsProducts(false);
        setIsLoader(true);

        setErrorWord(value);
        setActiveRadio('');
        setFilterType(false);

        const filteredSearch = await filterProducts(category.id, 'search', value);
        setCurrentProducts(filteredSearch);

        setIsLoader(false);
        setIsProducts(true);
    }

    const onTrash = (value) => {
        switch (value) {
            case 'gender':
                setActiveRadio('');
                break;
            case 'type':
                setFilterType(false);
                break;
            case 'color':
                setFilterColor(false);
                break;
        }

        setCurrentProducts(firstProducts);
    }

    return (
        <div className={styles.category}>
            <Head>
                <title>{category.name} | WebJump</title>
            </Head>

            <Header options={menu} onSearch={onSearch} />

            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.sortMenu}>
                        <Link href="/">
                            Página Inicial
                        </Link>
                        <VscChevronRight />
                        <span>
                            {` ${category.name}`}
                        </span>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.assideBar}>
                            <h2>Filtre por</h2>
                            <div>
                                <h3>Categorias</h3>
                                <ul>
                                    {menu.map(item => (
                                        <Link href={`/categories/${item.path}`} key={item.id}>
                                            <li>{item.name}</li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                {products.filters.map((filter, index) => (
                                    <div key={index}>
                                        {filter.color ? (
                                            <>
                                                <div className={styles.titleAndTrash}>
                                                    <h3>Cores</h3>
                                                    {filterColor &&
                                                        <IoMdTrash onClick={() => onTrash('color')} />
                                                    }
                                                </div>
                                                <div className={styles.boxesColors}>
                                                    {colorsProducts.map((item, index) => (
                                                        <div className={`${styles.box} ${styles[item]}`} onClick={() => handleFilter('color', item)} key={index}></div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={styles.titleAndTrash}>
                                                    <h3>Gênero</h3>
                                                    {activeRadio !== '' &&
                                                        <IoMdTrash onClick={() => onTrash('gender')} />
                                                    }
                                                </div>
                                                <div className={styles.gender}>
                                                    <div className={styles.masculine}>
                                                        <input
                                                            type="radio"
                                                            name="masculine"
                                                            checked={activeRadio === 'masculine'}
                                                            onChange={() => handleFilter('gender', 'masculine')}
                                                        />
                                                        <span
                                                            onClick={() => handleFilter('gender', 'masculine')}
                                                        >Masculina</span>
                                                    </div>
                                                    <div className={styles.feminine}>
                                                        <input
                                                            type="radio"
                                                            name="feminine"
                                                            checked={activeRadio === 'feminine'}
                                                            onChange={() => handleFilter('gender', 'feminine')}
                                                        />
                                                        <span
                                                            onClick={() => handleFilter('gender', 'feminine')}
                                                        >Feminina</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className={styles.titleAndTrash}>
                                    <h3>Tipo</h3>
                                    {filterType &&
                                        <IoMdTrash onClick={() => onTrash('type')} />
                                    }
                                </div>
                                <ul>
                                    {typeProduct.map((item, index) => (
                                        <li onClick={() => handleFilter('type', item.value)} key={index}>{item.label}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.listProducts}>
                            <h1>{category.name}</h1>
                            <div className={styles.optionsFilters}>
                                <div className={styles.typeList}>
                                    <BsFillGrid3X3GapFill className={`${optionView == 'grid' ? styles.active : ''}`} onClick={() => handleOptionsView('grid')} />
                                    <FaThList className={`${optionView == 'list' ? styles.active : ''}`} onClick={() => handleOptionsView('list')} />
                                </div>
                                <div className={styles.sortList}>
                                    <span>Ordenar por</span>
                                    <select value={selected} onChange={handleSort}>
                                        {options.map((option, index) => (
                                            <option value={option.value} key={index}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {currentProducts.length > 0 ? (
                                <>
                                    <div className={`${styles.products} ${optionView == 'grid' ? styles.grid : ''} ${!isProducts ? 'hd' : ''}`}>
                                        {currentProducts.map(product => (
                                            <Product data={product} view={optionView} key={product.id} />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className={styles.notFound}>
                                    <div>
                                        Ops!
                                    </div>
                                    <p>
                                        Nenhum resultado encontrado para
                                        <span> "{errorWord}"</span>.
                                    </p>
                                </div>
                            )}
                            {isLoader &&
                                <div className={styles.loaderContainer}>
                                    <div className={styles.wrapper}>
                                        <div className={styles.loader}>
                                            {[0,1,2,3,4,5,6,7,8,9].map((item, index) => (
                                                <div key={index}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                            {currentProducts.length > 0 &&
                                <div className={styles.pagination}>
                                    <GoChevronLeft />
                                    <div className={styles.pages}>
                                        <span>1</span>
                                        <span>2</span>
                                        <span className={styles.current}>3</span>
                                        <span>4</span>
                                        <span>5</span>
                                    </div>
                                    <GoChevronRight />
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const { slug } = ctx.params;
    const categories = await api.get(`categories/list`);

    const options = categories.data.items.map(item => {
        return {
            id: item.id,
            name: item.name,
            path: item.path
        };
    });

    const category = options.find(item => item.path == slug);
    const { data } = await api.get(`categories/${category.id}`);

    return {
        props: {
            menu: options,
            products: data,
            category: category,
        }
    }
}