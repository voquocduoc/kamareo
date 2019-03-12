import React, {Component} from 'react';
import { Card,
  CardTitle, CardBody, Table, Container, Row, Col, Button,
  FormGroup, Spinner } from 'reactstrap';
import StoreHOC from "./StoreHOC";
import { selectStoreIdToView } from "../actionCreators";
import Dialog from 'material-ui/Dialog';
import {uploadImage} from "../firebase/storage";
import {updateData } from "../firebase/db";

// form - meterial-ui
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name', 'address', 'phone', 'invoicename', 'redinvoiceaddress', 'mst' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  if (values.phone && !/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i.test(values.phone)) {
    errors.phone = 'Invalid Phone Number, ex: (111) 222-3333 | 1112223333 | 111-222-3333'
  }
  return errors
}

const renderTextField = ({ input, label, defaultValue, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} value={defaultValue} placeholder={label} type={type} />
      {touched && error && <span className="error">{error}</span>}   
    </div>
  </div>
)

class StoreDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
          image: null,
          modal: false,
          storeId: null,
          storeName: null,
          storeAddress: null,
          storePhone: null,
          redInvoiceName: null,
          redInvoiceAddress: null,
          redInvoicetax: null
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
      var currentState = this.state.modal;
      this.setState({
        modal: !currentState
      });
    }


    componentWillUpdate(nextProps, nextState) {
      if (nextProps.selectedStore && Object.keys(nextProps.selectedStore).length && nextProps.selectedStore.id !== this.state.storeId ) {
        this.setState({
          storeId: nextProps.selectedStore.id,
          storeName: nextProps.selectedStore.name,
          storeAddress: nextProps.selectedStore.address,
          storePhone: nextProps.selectedStore.phone,
          redInvoiceName: nextProps.selectedStore.redInvoice.name,
          redInvoiceAddress: nextProps.selectedStore.redInvoice.address,
          redInvoicetax: nextProps.selectedStore.redInvoice.taxCode,
          image: nextProps.selectedStore.logoUrl
        });
      }
    }
  
    componentWillMount() {
        const storeId = this.props.match.params.id;
        this.props.dispatch(selectStoreIdToView(storeId));
    }

    OnchangeImage = e => {
      const files = Array.from(e.target.files)
      let reader = new FileReader()
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.setState({
          image: reader.result
        })
        uploadImage(reader.result).then((resultImage) => {
          this.setState({
            image: resultImage
          })
        });
      };
      
    }

    submitform = () => {
      let dataUpdate = {
        store: {
          address: this.state.storeAddress,
          logoUrl: this.state.image,
          name: this.state.storeName,
          phone: this.state.storePhone
        },
        redInvoice: {
          address: this.state.redInvoiceAddress,
          name: this.state.redInvoiceName,
          taxCode: this.state.redInvoicetax
        }
      };
    
      console.log(dataUpdate);
    
      updateData(this.state.storeId, dataUpdate).then((result) => {
        alert("Done !");
        window.location.reload();
      });
    }

    render() {
        var data = this.props.selectedStore && Object.keys(this.props.selectedStore).length ? this.props.selectedStore : null;
        const { handleSubmit } = this.props;
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
                            <img width="100%" src={this.state.image} alt="Card image cap" />
                            <input type='file' id='single' onChange={this.OnchangeImage.bind(this)} /> 
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
                                        defaultValue={this.state.storeName}
                                        value={this.state.storeName}
                                        onChange={(event) => this.setState({
                                          storeName: event.target.value
                                        })}
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
                                        defaultValue={this.state.storeAddress}
                                        onChange={(event) => this.setState({
                                          storeAddress: event.target.value
                                        })}
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
                                        defaultValue={this.state.storePhone}
                                        onChange={(event) => this.setState({
                                          storePhone: event.target.value
                                        })}
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
                                        defaultValue={this.state.redInvoiceName}
                                        onChange={(event) => this.setState({
                                          redInvoiceName: event.target.value
                                        })}
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
                                        defaultValue={this.state.redInvoiceAddress}
                                        onChange={(event) => this.setState({
                                          redInvoiceAddress: event.target.value
                                        })}
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
                                        defaultValue={this.state.redInvoicetax}
                                        onChange={(event) => this.setState({
                                          redInvoicetax: event.target.value
                                        })}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row form>
                                  <Col md={4}>
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
                                  </Col>
                                  <Col md={4}>
                                    <Button color="primary" onClick={handleSubmit(this.submitform)}>Submit</Button>
                                  </Col>
                                </Row>
                              </form>
                          </Col>
                        </Row>
                      </Dialog>
                    </Card>
                </Col>
                <Col xs="6" sm="4"></Col>
                <Col sm="4"></Col>
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
