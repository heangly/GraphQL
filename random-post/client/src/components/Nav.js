import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../redux/slices/auth'

const Nav = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth.user)

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <nav
      className='navbar navbar-expand-lg navbar-light bg-light'
      style={{ height: '90px' }}
    >
      <div className='container'>
        <Link to='/' className='nav-link' style={{ alignContent: 'center' }}>
          <h4 className='pt-2'>Random Post</h4>
        </Link>

        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </li>

          {token ? (
            <li className='nav-item'>
              <Link to='#' className='nav-link' onClick={logoutHandler}>
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li className='nav-item'>
                <Link to='/login' className='nav-link'>
                  Login
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/register' className='nav-link'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
