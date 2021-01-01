// การ์ด แก้ไขการจอง
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
      status: "",
      time: "",
      phone: "",
      address: "",
    };
  }

  componentDidMount() {
    let profile = this.auth.getProfile();
    if (profile.status !== "999") {
      window.location.href = "/";
    }
    this.getorderbyid();
  }

  getorderbyid = () => {
    this.api.getorderbyid(this.props.match.params.id).then((res) => {
        console.log(res.data[0]);
      this.setState({
        id: res.data[0].id,
        status: res.data[0].statuscar,
        time: res.data[0].time,
        phone: res.data[0].phone,
        address: res.data[0].address,
      });
    });
  };

  updateorder=()=>{
      this.api.updateorder(this.state.id,this.state.address,this.state.time,this.state.status).then(res=>{
          if(res.status){
              window.location.href="/configorder"
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
                      <h3>รายการที่ {this.state.id}</h3>
                    <br />

                    <div
                      className="input-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                        เบอร์โทร
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="เบอร์โทร"
                        aria-label="name"
                        aria-describedby="basic-addon"
                        name="phone"
                        value={this.state.phone}
                        disabled
                      />
                    </div>

                    <div
                      className="input-group"
                      style={{ paddingBottom: "10px" }}
                    >
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                        ที่อยู่ส่งรถ
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ที่อยู่ส่งรถ"
                        aria-label="name"
                        aria-describedby="basic-addon"
                        name="address"
                        value={this.state.address}
                        onChange={(e) => {
                          this.setState({ address: e.target.value });
                        }}
                      />
                    </div>


                    <table style={{width:'100%',textAlign:'left'}}>
                      <tr>
                        <td style={{width:'15%'}}>
                          <h5>เวลา</h5>
                        </td>
                        <td>
                        <input
                        style={{ width: "100%" }}
                        type="date"
                        id="start"
                        name="trip-start"
                        value={this.state.time}
                        min="2020-01-01"
                        max="2030-12-31"
                        onChange={(e) => {
                          this.setState({time:e.target.value})
                        }}
                      />
                        </td>
                      </tr>
                    </table>


                    <table style={{width:'100%',textAlign:'left'}}>
                      <tr>
                        <td style={{width:'15%'}}>
                          <h5>สถานะ</h5>
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
                            <MenuItem value={"จอง"}>จอง</MenuItem>
                            <MenuItem value={"ส่งรถ"}>ส่งรถ</MenuItem>
                            <MenuItem value={"เรียบร้อย"}>เรียบร้อย</MenuItem>
                          </Select>
                        </td>
                      </tr>
                    </table>

                            <br/>
                    <MDBBtn
                      color={"dark"}
                      onClick={this.updateorder}
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
