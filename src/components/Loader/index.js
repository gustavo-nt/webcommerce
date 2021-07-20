import styles from './styles.module.scss';

export function Loading() {
    return(
        <div className={styles.container}>
            <svg width="100" height="100" viewBox="0 0 35 35">
                <polygon
                    className={styles.triangle}
                    fill="none"
                    stroke="#CC0D1F"
                    strokeWidth="1"
                    points="16,1 32,32 1,32"
                />
            </svg>
        </div>
    );
}