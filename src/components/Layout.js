import styled from 'styled-components'
import bg from '../assets/images/bg.png'
import packageJson from '../../package.json'

const Main = styled('main')({
  backgroundImage: `url("${bg}")`,
  backgroundColor: '#ade3fe',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom center',
  height: '100vh',
})

const Footer = styled('footer')({
  position: 'absolute',
  right: 0,
  left: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  color: 'rgba(0, 0, 0, 0.5)',
  textAlign: 'center',
  fontSize: '0.8rem',
  padding: '4px 8px',
})

const Sup = styled('sup')({
  fontSize: '0.6rem',
})

const Link = styled('a')({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'underline',
  },
})

const Layout = ({ children }) => {
  const { author, version } = packageJson
  return (
    <Main>
      {children}
      <Footer>
        <section>{`version: ${version}`}</section>
        <section>
          {'Develop and design with ❤️ by '}
          <Link href={author?.url}>{author?.name}</Link>
          {' © '}
          <Sup>{new Date().getFullYear()}</Sup>
        </section>
      </Footer>
    </Main>
  )
}

export default Layout
