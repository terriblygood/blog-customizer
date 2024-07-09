import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
// export type OnClick = () => void;
export type ArrowButtonProps = {
	onClick: () => void;
	isActive: boolean;
}

export const ArrowButton = (props: ArrowButtonProps) => {
	const {onClick, isActive} = props;
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={()=> onClick()}
			className={clsx(styles.container, isActive && styles.container_open)}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, isActive && styles.arrow_open)} />
		</div>
	);
};
