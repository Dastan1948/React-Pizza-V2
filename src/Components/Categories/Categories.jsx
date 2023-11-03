import { useState } from 'react'

const Categories = ({value, onChangeCategory}) => {

	const categories = [
		'Все',
		'Вегетарианская',
		'Мясные',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, index) => {
					return (
						<li
							key={index}
							className={value === index ? 'active' : ''}
							onClick={() => onChangeCategory(index)}
						>
							{categoryName}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Categories
