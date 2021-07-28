/*


      <Col xs={10} md={8}>
        <MovieView movieData={selectedMovie} /* onBackClick={movie => this.setSelectedMovie(movie)} */ /*/>
      </Col>

   movies.map(movie => (
      <Col xs={7} sm={6} md={4} lg={3}>
        <MovieCard key={movie._id} movieData={movie} /* onMovieClick={movie => this.setSelectedMovie(movie)} */ /*/>
      </Col>
    ))
*/

// Function to go straight to login where user already registered
const handleGoToLogin = (registered) => {
  console.log('take me to login');
  props.onRegistered(registered);
}

RegistrationView.propTypes = {
  onRegistered:PropTypes.func.isRequired
}

import PropTypes from 'prop-types';


//  Commenting out the registered user view until the routing has been determined
  /*  if (!registeredUser) return (
      <Row className="registration-view justify-content-center">
        <Col xs={8} md={6} lg={4}>
          <RegistrationView onRegistered={registered => this.onRegistered(registered)} />
        </Col>
      </Row>
    ) 
  */

//  <br></br>
//  <h3>myFlix members</h3>
//  <Button variant="danger" type="button" onClick={handleGoToLogin}>Login</Button>

const [validated, setValidated] = useState(false);

const form = e.currentTarget;
    if (form.checkValidity() === false) {

      setValidated(true);
      if (validated === true) {
        noValidate validated={validated} 
        <InputGroup hasValidation></InputGroup>
        <Form.Control.Feedback type="invalid">Please enter your username</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please enter your password</Form.Control.Feedback>