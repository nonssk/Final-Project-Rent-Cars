// การ์ด แก้ไขรถ
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Api from "../Service/api";
import Nev from "../nevbar";
import "../../css/background.css";
import Container from "@material-ui/core/Container";
import Auth from "../Service/authlogin";
import { MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Swal from "sweetalert2";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.api = new Api();
    this.auth = new Auth();
    this.state = {
      id: "",
      name: "",
      code: "",
      type: "",
      price: "",
      status: "",
      rec: "",
      pic: "",
    };
  }

  componentDidMount() {
    let profile = this.auth.getProfile();
    if (profile.status !== "999") {
      window.location.href = "/";
    }
    this.getcarbyid();
  }

  getcarbyid = () => {
    this.api.getcarbyid(this.props.match.params.id).then((res) => {
      this.setState({
        id: res.data[0].id,
        name: res.data[0].name,
        code: res.data[0].code,
        type: res.data[0].type,
        price: res.data[0].price,
        status: res.data[0].status,
        rec: res.data[0].rec,
        pic: res.data[0].pic,
      });
    });
  };

  updateCar=()=>{
      this.api.updatecar(this.state.id,this.state.name,this.state.code,this.state.price,this.state.status,this.state.rec).then(res=>{
          if(res.status){
              window.location.href="/"
          }else{
            Swal.fire({
                title: "พบข้อผิดพลาด!",
                text: "บันทึกข้อมูลไม่สำเร็จ",
                icon: "error",
                timer: 5000,
              });
          }
      })
  }

  render() {
    return (
      <>
        <Container>
          <Nev />
          <div className="background-login">
            <Grid container>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}></Grid>
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                style={{ padding: 1 }}
              >
                <MDBCard
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                    backgroundColor: "gray",
                  }}
                >
                  <MDBCardBody
                    style={{
                      opacity: "0.8",
                    }}
                  >
                    <img src={this.state.pic} alt="" width="200px" />
                    <br />
                    <br />
                    <div
                      className="input-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                          ไอดี
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ไอดี"
                        aria-label="name"
                        aria-describedby="basic-addon"
                        name="id"
                        value={this.state.id}
                        disabled
                      />
                    </div>

                    <div
                      className="input-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                          ชื่อ
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ชื่อ"
                        aria-label="name"
                        aria-describedby="basic-addon"
                        name="name"
                        value={this.state.name}
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
                        }}
                      />
                    </div>

                    <div
                      className="input-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                          ป้ายทะเบียน
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="เบอร์โทร"
                        aria-label="name"
                        aria-describedby="basic-addon"
                        name="code"
                        value={this.state.code}
                        onChange={(e) => {
                          this.setState({ code: e.target.value });
                        }}
                      />
                    </div>

                    <div
                      className="input-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                          ชนิด
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ชนิด"
                        aria-label="name"
                        aria-describedby="basic-addon"
                        name="phone"
                        value={this.state.type}
                        disabled
                      />
                    </div>

                    <div
                      className="input-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                          มัดจำ
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="มัดจำ"
                        aria-label="name"
                        aria-describedby="basic-addon"
                        name="phone"
                        value={this.state.price}
                        onChange={(e) => {
                          this.setState({ price: e.target.value });
                        }}
                      />
                    </div>


                    <table style={{width:'100%',textAlign:'left'}}>
                      <tr>
                        <td style={{width:'25%'}}>
                          <h5>สถานะรถ</h5>
                        </td>
                        <td>
                          <Select
                          style={{width:'100%'}}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.status}
                            onChange={(e) => {
                              this.setState({ status: e.target.value });
                            }}
                            label="Show"
                          >
                            <MenuItem value={"ว่าง"}>ว่าง</MenuItem>
                            <MenuItem value={"ไม่ว่าง"}>ไม่ว่าง</MenuItem>
                          </Select>
                        </td>
                      </tr>
                    </table>

                    <table style={{width:'100%',textAlign:'left'}}>
                      <tr>
                        <td style={{width:'25%'}}>
                          <h5>แสดงหน้าแรก</h5>
                        </td>
                        <td>
                          <Select
                          style={{width:'100%'}}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.rec}
                            onChange={(e) => {
                              this.setState({ rec: e.target.value });
                            }}
                            label="Show"
                          >
                            <MenuItem value={"true"}>true</MenuItem>
                            <MenuItem value={"false"}>false</MenuItem>
                          </Select>
                        </td>
                      </tr>
                    </table>
                            <br/>
                    <MDBBtn
                      color={"dark"}
                      onClick={this.updateCar}
                      style={{ fontSize: "20px" }}
                    >
                      บันทึก
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </Grid>

              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}></Grid>
            </Grid>
          </div>
        </Container>
      </>
    );
  }
}
