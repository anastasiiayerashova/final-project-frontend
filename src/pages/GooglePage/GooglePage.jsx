import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { api } from '../../utils/axios.config.js'
import { resetToken } from '../../redux/user/slice.js'
import Loader from '../../components/Loader/Loader.jsx'

const GooglePage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        async function fetch () {
            try {
                const code = searchParams.get('code')

                const { data: { data } } = await api.post('auth/confirm-oauth', {code})

                if (code) {
                    dispatch(resetToken(data.accessToken))
                    navigate('/tracker')
                }
            }
            catch (e) {
                console.log(e)
                navigate('/signup')
            }
        }
        fetch()
    }, [searchParams, dispatch, navigate])

    return (
        <div>
            <Loader/>
        </div>
    )
}

export default GooglePage