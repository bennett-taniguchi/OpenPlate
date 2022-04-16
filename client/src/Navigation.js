// Routing component of app, displayed at top of every page
// search -> app
// openplate -> main
// analytics -> data
import {Navbar,Container,Nav} from 'react-bootstrap'
export default function Navigation() {


    return(
        <Navbar expand='lg' variant='light' bg='light'
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",

        }}
      >

<Container>

        <Nav.Link href="/App">Search</Nav.Link>
        <Navbar.Brand href='/'>OpenPlate</Navbar.Brand>
        <Nav.Link href="/Data">Analytics</Nav.Link>
        </Container>
      </Navbar>
    )
}
        
      