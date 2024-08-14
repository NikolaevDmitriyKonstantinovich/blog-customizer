import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';
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
	const [open, setOpen] = useState<boolean>(false);
	const [selectsState, setSelectsState] = useState(articleState);

	const changeHandler = (selectElement: OptionType) => {
		console.log(selectElement);
	};

	const inputChangeHandlet = (
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
		setOpen(false);
	};

	const clearForm = () => {
		setArticleState(defaultArticleState);
		setSelectsState(defaultArticleState);
	}

	return (
		<>
			<ArrowButton isOpen={open} onClose={(p) => setOpen(p)} />
			<aside className={clsx(styles.container, open && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='ШРИФТ'
						selected={selectsState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selectElement: OptionType) => {
							inputChangeHandlet('fontFamilyOption', selectElement);
							console.log(selectElement);
						}}
					/>
					<RadioGroup
						name={'size'}
						options={fontSizeOptions}
						selected={selectsState.fontSizeOption}
						title={'размер шрифта'}
						onChange={(selectElement: OptionType) => {
							inputChangeHandlet('fontSizeOption', selectElement);
							console.log(selectElement);
						}}
					/>
					<Select
						title='ЦВЕТ ШРИФТА'
						selected={selectsState.fontColor}
						options={fontColors}
						onChange={(selectElement: OptionType) => {
							inputChangeHandlet('fontColor', selectElement);
							console.log(selectElement);
						}}
					/>
					<Separator />
					<Select
						title='ЦВЕТ ФОНА'
						selected={selectsState.backgroundColor}
						options={backgroundColors}
						onChange={(selectElement: OptionType) => {
							inputChangeHandlet('backgroundColor', selectElement);
							console.log(selectElement);
						}}
					/>
					<Select
						title='ШИРИНА КОНТЕНТА'
						selected={selectsState.contentWidth}
						options={contentWidthArr}
						onChange={(selectElement: OptionType) => {
							inputChangeHandlet('contentWidth', selectElement);
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
