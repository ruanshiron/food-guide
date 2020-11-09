import Link from 'next/link'
import { Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {

  return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light">
      <Container>
        <Link href="/">
          <Navbar.Brand className="mr-4">
            <FontAwesomeIcon icon="drumstick-bite" className="mr-2" />
            Food Guide
          </Navbar.Brand>
        </Link>
        <Form className="m-auto" inline>
          <FormControl size="sm" type="text" placeholder="料理名・食材でレシピをさがす" className="mr-sm-2 flex-1" />
        </Form>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/recipes">
              <Nav.Link active as="a" href="/recipes">レシピカテゴリ</Nav.Link>
            </Link>
            <Link href="/recipes">
              <Nav.Link active as="a" href="/recipes">ホット</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header