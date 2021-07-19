import Head from 'next/head';
import Link from 'next/link';
import { api } from '../services/api';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import styles from '../styles/home.module.scss';
import { useState } from 'react';

export default function Home({ items }) {
	const [loader, setLoader] = useState(false)

	const onLoader = () => {
		setLoader(true);
	}
	
	return (
		<div className={styles.homepage}>
			<Head>
				<title>Home | WebJump</title>
			</Head>

			<div style={{display: loader ? 'block' : 'none'}}>
				<Footer />
			</div>

			<div className={styles.container}>
				<Header options={items} />

				<div className={styles.content}>
					<div className={styles.main}>
						<div className={styles.assiderBar}>
							<ul>
								<Link href="/">
									<li>Página Inicial</li>
								</Link>
								{items.map(item => (
									<Link href={`/categories/${item.path}`} key={item.id}>
										<li onClick={onLoader}>{item.name}</li>
									</Link>
								))}
								<li>Contato</li>
							</ul>
						</div>
						<div className={styles.details}>
							<div className={styles.banner}></div>
							<div className={styles.welcome}>
								<h2>Seja bem-vindo!</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
							</div>
						</div>
					</div>
					
					<Footer />
				</div>
			</div>
		</div>
	)
}

export async function getStaticProps() {
	const { data } = await api.get('categories/list');

	const items = data.items.map(item => {
		return {
			id: item.id,
			name: item.name,
			path: item.path
		};
	});

	return {
		props: {
			items
		},
		revalidate: 60 * 60 * 8,
	}
}