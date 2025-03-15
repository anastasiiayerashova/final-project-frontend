import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { api } from '../../utils/axios.config.js'
import { resetToken } from '../../redux/user/slice.js'
import Loader from '../../components/Loader/Loader.jsx'

const GooglePage = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()

    const code = searchParams.get('code')

    useEffect(() => {
        async function fetch() {
            try {
                const { data: { data } } = await api.post('/auth/confirm-oauth', { code: code })
                
                dispatch(resetToken(data.accessToken))

                navigate('/tracker')
            }
            catch (e) {
                console.log(e)
                navigate('/signup')
            }
        }
        fetch()
    }, [code, dispatch, navigate])

    return (
        <div>
            <Loader/>
        </div>
    )
}

export default GooglePage