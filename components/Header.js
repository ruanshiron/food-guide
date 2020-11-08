import Link from 'next/link'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {

  const isActive = (route) => {
    return (route == router.pathname)
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light">
      <Container>
        <Link href="/">
          <Navbar.Brand>Food Guide</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/recipes">
              <Nav.Link>Recipes</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header