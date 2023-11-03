import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza = () => {
	const [pizza, setPizza] = useState()
	const { id } = useParams()

	const navigate = useNavigate()

	useEffect(() => {
		const fetchPizza = async () => {
			try {
				const { data } = await axios.get(
					`https://64e0c6ba50713530432caae7.mockapi.io/items/` + id
				)
				setPizza(data)
			} catch (error) {
				alert('Ошибка при получении пиццы!')
				navigate('/')
			}
		}

		fetchPizza()
	}, [])

	if (!pizza) {
		return (
			<div style={{ textAlign: 'center' }}>
				<h3>Загрузка...</h3>
			</div>
		)
	}

	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt='pizza' />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} Р</h4>
		</div>
	)
}

export default FullPizza
