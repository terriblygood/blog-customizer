import clsx from 'clsx';
import { useState, FormEvent, useRef, useEffect} from 'react';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { ArticleStateType, OptionType, backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions, defaultArticleState} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
export type ArticleParamsProps = {
	setAppState: (value: ArticleStateType) => void;
};


export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const {setAppState} = props;
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

	const handleChange = (fieldName: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppState(formState);
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setAppState(defaultArticleState);
	};


	// useEffect(() => {
	// 	const handleDocumentClick = (e: MouseEvent) => {
	// 	  if (!e.target) {
	// 		// 	  return;
	// 		// 	};
	// 	  if (!e.target.closest(`.${styles.form}`)) {
	// 		setIsOpen(false);
	// 	  }
	// 	};
	// 	document.addEventListener('click', handleDocumentClick);
	// 	return () => {
	// 	  document.removeEventListener('click', handleDocumentClick);
	// 	};
	//   }, [isOpen]);
	  
	  

	return (
		<>
			<div onClick={() => setIsOpen(false)} className={clsx(styles.overlay, isOpen && styles.overlay_open)}></div>
			<ArrowButton isActive={isOpen} onClick={() => setIsOpen	((currentIsOpened) => !currentIsOpened)}/>
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Text weight={800} size={31} uppercase={true}>Задайте параметры</Text>
					<Select title='Шрифт' selected={formState.fontFamilyOption} options={fontFamilyOptions} onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
