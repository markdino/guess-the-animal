import styled from 'styled-components'
import bg from '../assets/images/bg.png'

const Main = styled('main')({
  backgroundImage: `url("${bg}")`,
  backgroundColor: '#ade3fe',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '100vh',
})
const FooterMark = styled('footer')({
  position: 'absolute',
  right: 0,
  bottom: 0,
  color: 'rgba(0, 0, 0, 0.5)',
  textAlign: 'center',
  fontSize: '0.8rem',
  padding: '4px',
  a: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})
const Sup = styled('sup')({
  fontSize: '0.6rem',
})
const Layout = ({ children }) => {
  return (
    <Main>
      {children}
      <FooterMark>
        {'Develop and design by '}
        <a href='http://www.markdino.com'>Mark Dino Pelonia</a>
        {' © '}
        <Sup>{new Date().getFullYear()}</Sup>
      </FooterMark>
    </Main>
  )
}

export default Layout
