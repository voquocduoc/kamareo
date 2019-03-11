import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Table, Container, Row, Col, Button, Modal,
  ModalHeader, ModalBody, ModalFooter, Input, Label, Form,
  FormGroup, Spinner, FormText } from 'reactstrap';
import {connect} from "react-redux";
import StoreHOC from "./StoreHOC";
import {selectStoreIdToView} from "../actionCreators";
import Dialog from 'material-ui/Dialog';

// form - meterial-ui
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name', 'address', 'phone', 'invoicename', 'redinvoiceaddress', 'mst' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(values.phone)) {
    errors.email = 'Invalid Phone Number'
  }
  return errors
}

const renderTextField = ({ input, label, defaultValue, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} value={defaultValue} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const submitform = (props) => {
  console.log(props)
}

class StoreDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
          modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
      var currentState = this.state.modal;
      this.setState({
        modal: !currentState
      });
    }

    componentWillMount() {
        const storeId = this.props.match.params.id;
        this.props.dispatch(selectStoreIdToView(storeId));
    }

    onFileLoad = (event) => {
      const file = event.target.files[0];
      console.log(file, event.target.files);
    }

    render() {
        var data = this.props.selectedStore && Object.keys(this.props.selectedStore).length ? this.props.selectedStore : null;
        const { handleSubmit, pristine, reset, submitting } = this.props;
        if (data) {
          const redInvoice = data.redInvoice ? data.redInvoice : null;
          return (
            <Container>
              <Row>
                <Col xs="6" sm="4">
                    <Card>
                      <img width="100%" src={data.logoUrl} alt="Card image cap" />
                      <CardBody>
                        <CardTitle>
                          <h3>Store Info</h3>
                        </CardTitle>
                        <Table striped>
                          <tbody>
                            <tr>
                              <td>
                                Name:
                              </td>
                              <td>
                                {data.name}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Address:
                              </td>
                              <td>
                                {data.address}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Phone:
                              </td>
                              <td>
                                {data.phone}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                      <CardBody>
                        <CardTitle>
                          <h3>
                            Red Invoice Info
                          </h3>
                        </CardTitle>
                        <Table striped>
                          <tbody>
                            <tr>
                              <td>
                                Company Name:
                              </td>
                              <td>
                                {redInvoice.name}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Address:
                              </td>
                              <td>
                                {redInvoice.address}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                MST:
                              </td>
                              <td>
                                {redInvoice.taxCode}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <Button color="primary" size="lg" block onClick={this.toggle}>Edit</Button>
                      </CardBody>
                      <Dialog
                        modal={true}
                        open={this.state.modal}
                        scroll={'paper'}
                        {...data}
                      >
                        <Row>
                          <Col xs="4">
                            <img width="100%" src={data.logoUrl} alt="Card image cap" />
                          </Col>

                          <Col xs="8">
                            <CardTitle>
                              <h3>Store Info</h3>
                            </CardTitle>
                              <form>
                                <Row form>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Field
                                        name="name"
                                        component={renderTextField}
                                        label="Store Name"
                                        defaultValue={data.name}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row form>
                                  <Col md={2}>
                                    <FormGroup>
                                      <Field
                                        name="address"
                                        component={renderTextField}
                                        label="Address"
                                        defaultValue={data.address}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row form>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Field
                                        name="phone"
                                        component={renderTextField}
                                        label="Phone Number"
                                        defaultValue={data.phone}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <CardTitle>
                                  <h3>Red Invoice Info</h3>
                                </CardTitle>
                                <Row form>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Field
                                        name="invoicename"
                                        component={renderTextField}
                                        label="Red Invoice Name"
                                        defaultValue={data.name}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row form>
                                  <Col md={2}>
                                    <FormGroup>
                                      <Field
                                        name="redinvoiceaddress"
                                        component={renderTextField}
                                        label="Red Invoice Address"
                                        defaultValue={data.address}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row form>
                                  <Col md={6}>
                                    <FormGroup>
                                      <Field
                                        name="mst"
                                        component={renderTextField}
                                        label="MST"
                                        defaultValue={data.phone}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row form>
                                  <Col md={4}>
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
                                  </Col>
                                  <Col md={4}>
                                    <Button color="primary" onClick={handleSubmit(submitform)}>Submit</Button>
                                  </Col>
                                </Row>
                              </form>
                          </Col>
                        </Row>
                      </Dialog>
                    </Card>
                </Col>
                <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
                <Col sm="4">.col-sm-4</Col>
              </Row>
            </Container>
          );
        } else {
          return (
              <Spinner size="sm" color="primary" />
          );
        }
    };
}

export default reduxForm({
  form: 'ProductDetail',
  validate
})(StoreHOC(StoreDetail));
