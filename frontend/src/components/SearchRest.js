import React, { useState } from 'react'
import { Search } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Header from './common/Header'
import axios from 'axios'
import LoaderSM from './manager/LoaderSM'

const SearchRest = () => {

    const [ data, setData ] = useState([])
    const [ search, setSearch ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const handleChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios
        .get(`/api/list_restaurants/?search=${search.input}`)
        .then((res) => {
            setData(...data, res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className='manage_cont'>
            <Header title='Search' />
            <form onSubmit={handleSubmit} className='search_form'>
                <input
                    type='text'
                    name='input'
                    onChange={handleChange}
                    placeholder='Restaurant name...'
                />
                {search === '' ? (
                    <button className='full_btn' disabled><Search /></button>
                ) : (
                    <button type='submit' className='full_btn'><Search /></button>
                )}
            </form>
            {loading ? (
                <LoaderSM />
            ) : null}
            {data && data.length > 0 ? (
                <React.Fragment>
                    <h3 className='p-2'>Results:</h3>
                    {data.map((rest) => (
                    <Link
                        className='rest_link'
                        key={rest.id}
                        to={`/restaurants/${rest.id}`}
                    >
                        <img src={rest.image} alt={rest.image}/>
                        <p>{rest.name}</p>
                    </Link>
                ))}
                </React.Fragment>
                
            ) : null}
        </div>
    )
}

export default SearchRest
