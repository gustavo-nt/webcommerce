import { useEffect, useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import styles from './styles.module.scss';

export function Product({data, view}) {
    const [feature, setFeature] = useState('');

    useEffect(() => {
        data.filter.map(filter => {
            for (var value in filter){
                setFeature(filter[value]); 
            } 
        });
    }, []);

    return ( 
        <div className={`${styles.container} ${view == 'grid' ? styles.grid : styles.list}`}>
            <div className={styles.image}>
                <img src={`${process.env.REACT_APP_URL}${data.image}`}  alt={data.name}/>
            </div>
            <div className={styles.details}>
                <div className={styles.title}>
                    {data.name}
                    <span>{data.sku}</span>
                </div>
                <div className={styles.prices}>
                    {data.specialPrice ? (
                        <>
                            <div className={styles.promotion}>
                                R${data.specialPrice}
                            </div>
                            <p>R${data.price}</p>
                        </>
                    ): (
                        <>
                            <p>R${data.price}</p>
                        </>
                    )}
                    
                </div>
                <div className={styles.feature}>
                    <GiCheckMark />
                    <p>
                        {feature}
                    </p>
                </div>
                <button>Comprar</button>
            </div>
        </div>
    );
}