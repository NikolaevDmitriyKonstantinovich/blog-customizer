import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArticleStateType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);



const App = () => {
	const [state, setState] = useState(defaultArticleState);
	//завести состояние статьи и передать defaultstate
	return (
		<main>
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm articleState={state} setArticleState={setState}/>
			<Article />
		</div>
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
