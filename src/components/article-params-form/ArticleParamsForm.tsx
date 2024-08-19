import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';
import clsx from 'clsx';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import { fontFamilyOptions } from '../../constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { useOutsideFormClickClose } from '../select/hooks/useOutsideFormClickClose';

//type состояние статьи и функция изменения состояния

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (p: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	//завести юсстайт состояние
	//на форму вещаем сабмит функц из пропсов
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [selectsState, setSelectsState] = useState(articleState);

	const changeHandler = (selectElement: OptionType) => {
		console.log(selectElement);
	};

	const inputChangeHandler = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectsState((p) => ({
			...p,
			[key]: value,
		}));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(selectsState);
		setIsMenuOpen(false);
	};

	const clearForm = () => {
		setArticleState(defaultArticleState);
		setSelectsState(defaultArticleState);
	}
	const formElement = useRef<HTMLDivElement | null>(null);
	useOutsideFormClickClose({
		isOpen: isMenuOpen,
		rootRef: formElement,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClose={(p) => setIsMenuOpen(p)} />
			<aside className={clsx(styles.container, isMenuOpen && styles.container_open)} ref={formElement}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='ШРИФТ'
						selected={selectsState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selectElement: OptionType) => {
							inputChangeHandler('fontFamilyOption', selectElement);
							console.log(selectElement);
						}}
					/>
					<RadioGroup
						name={'size'}
						options={fontSizeOptions}
						selected={selectsState.fontSizeOption}
						title={'размер шрифта'}
						onChange={(selectElement: OptionType) => {
							inputChangeHandler('fontSizeOption', selectElement);
							console.log(selectElement);
						}}
					/>
					<Select
						title='ЦВЕТ ШРИФТА'
						selected={selectsState.fontColor}
						options={fontColors}
						onChange={(selectElement: OptionType) => {
							inputChangeHandler('fontColor', selectElement);
							console.log(selectElement);
						}}
					/>
					<Separator />
					<Select
						title='ЦВЕТ ФОНА'
						selected={selectsState.backgroundColor}
						options={backgroundColors}
						onChange={(selectElement: OptionType) => {
							inputChangeHandler('backgroundColor', selectElement);
							console.log(selectElement);
						}}
					/>
					<Select
						title='ШИРИНА КОНТЕНТА'
						selected={selectsState.contentWidth}
						options={contentWidthArr}
						onChange={(selectElement: OptionType) => {
							inputChangeHandler('contentWidth', selectElement);
							console.log(selectElement);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={clearForm}/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
