import qs from 'qs'
import { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from './../redux/slices/filterSlice.js'

import { Link, useNavigate } from 'react-router-dom'
import Categories from '../Components/Categories/Categories'
import Pagination from '../Components/Pagination'
import PizzaBlock from '../Components/PizzaBlock/PizzaBlock'
import Skeleton from '../Components/PizzaBlock/Skeleton'
import Sort, { sortList } from '../Components/Sort/Sort'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice.js'

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter)
	const sortType = sort.sortProperty

	const { items, status } = useSelector(selectPizzaData)

	const onChangeCategory = id => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = number => {
		dispatch(setCurrentPage(number))
	}

	const getPizzas = async () => {
		// setIsLoading(true)

		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''
		const sortBy = sortType.replace('-', '')
		const order = sortType.includes('-') ? 'asc' : 'desc'

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage,
			})
		)
	}

	// Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortType,
				categoryId,
				currentPage,
			})

			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sortType, currentPage])

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = sortList.find(
				obj => obj.sortProperty === params.sortProperty
			)

			dispatch(
				setFilters({
					...params,
					sort,
				})
			)
			isSearch.current = true
		}
	}, [])

	// Если был первый рендер то запрашиваем пиццы
	useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			getPizzas()
		}

		isSearch.current = false
	}, [categoryId, sortType, searchValue, currentPage])

	const pizzas = items.map(obj => (
		<Link key={obj.id} to={`/pizza/${obj.id}`}>
			<PizzaBlock {...obj} />
		</Link>
	))

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>
						Произошла ошибка <span>😕</span>
					</h2>
					<p>
						К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
						позже
					</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home
