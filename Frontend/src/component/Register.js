// หน้าสมัครสมาชิก
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { MDBBtn, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import Swal from "sweetalert2";
import "../css/background.css";
import Auth from "./Service/authlogin";
import Api from "./Service/api";
import Config from "../files/config.json";
import Nev from "./nevbar";
import Container from "@material-ui/core/Container";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth();
    this.api = new Api();
    this.state = {
      username: "",
      password: "",
      repassword: "",
      fullname: "",
      phone: "",
    };
  }


  setVal = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  OnSubmit = () => {
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.repassword === "" ||
      this.state.fullname === "" ||
      this.state.phone === ""
    ) {
      Swal.fire({
        title: "พบข้อผิดพลาด!",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        icon: "error",
        timer: 5000,
      });
    } else if (this.state.password !== this.state.repassword) {
      Swal.fire({
        title: "พบข้อผิดพลาด!",
        text: "Password ไม่ตรงกัน",
        icon: "error",
        timer: 5000,
      });
    } else {
      this.api.register(this.state.username,this.state.password,this.state.fullname,this.state.phone).then((res) => {
        if (res.status) {
          this.setState({
            username: "",
            password: "",
            repassword: "",
            fullname: "",
            phone: "",
          });
          Swal.fire({
            title: "สำเร็จ!",
            text: "บันทึกข้อมูลสำเร็จ",
            icon: "success",
            timer: 5000,
          });
        } else {
          Swal.fire({
            title: "พบข้อผิดพลาด!",
            text: res.err,
            icon: "error",
            timer: 5000,
          });
        }
      });
    }
  };

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
                <center>
                  <MDBCard
                    style={{
                      width: "80%",
                      borderRadius: "20px",
                      backgroundColor: [Config.color],
                      opacity: "0.8",
                    }}
                  >
                    <div
                      style={{
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        paddingLeft: "5px",
                      }}
                    >
                      <br />
                    </div>
                    <br />
                    <div style={{ paddingBottom: "5px" }}>
                      <center>
                        <input
                          style={{
                            textAlign: "center",
                            fontSize: "30px",
                            fontFamily: "Roboto",
                            color: [Config.Textcolor],
                          }}
                          type="text"
                          className="form-control"
                          value={"สมัครใช้งานระบบ ยังไม่เสร็จ"}
                          disabled
                        />
                      </center>
                    </div>
                    <MDBCardBody
                      style={{
                        backgroundColor: "GrayText",
                        opacity: "0.8",
                      }}
                    >
                      <div
                        className="input-group"
                        style={{ paddingBottom: "10px" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon">
                            <MDBIcon icon="user" />
                          </span>
                        </div>
                        <input
                          type="text"
                          style={{ color: [Config.Textcolor] }}
                          className="form-control"
                          placeholder="ชื่อผู้ใช้"
                          aria-label="Username"
                          aria-describedby="basic-addon"
                          name="username"
                          value={this.state.username}
                          onChange={this.setVal}
                        />
                      </div>

                      <div
                        className="input-group"
                        style={{ paddingBottom: "10px" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon">
                            <MDBIcon icon="unlock" />
                          </span>
                        </div>
                        <input
                          type="password"
                          style={{ color: [Config.Textcolor] }}
                          className="form-control"
                          placeholder="รหัสผ่าน"
                          aria-label="Password"
                          aria-describedby="basic-addon"
                          name="password"
                          value={this.state.password}
                          onChange={this.setVal}
                        />
                      </div>

                      <div
                        className="input-group"
                        style={{ paddingBottom: "10px" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon">
                            <MDBIcon icon="unlock" />
                          </span>
                        </div>
                        <input
                          type="password"
                          style={{ color: [Config.Textcolor] }}
                          className="form-control"
                          placeholder="ยืนนยันรหัสผ่าน"
                          aria-label="Password"
                          aria-describedby="basic-addon"
                          name="repassword"
                          value={this.state.repassword}
                          onChange={this.setVal}
                        />
                      </div>

                      <div
                        className="input-group"
                        style={{ paddingBottom: "10px" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon">
                            <MDBIcon icon="user" />
                          </span>
                        </div>
                        <input
                          type="text"
                          style={{ color: [Config.Textcolor] }}
                          className="form-control"
                          placeholder="ชื่อ-สกุล"
                          aria-label="text"
                          aria-describedby="basic-addon"
                          name="fullname"
                          value={this.state.fullname}
                          onChange={this.setVal}
                        />
                      </div>

                      <div
                        className="input-group"
                        style={{ paddingBottom: "10px" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon">
                            <MDBIcon icon="phone-alt" />
                          </span>
                        </div>
                        <input
                          type="text"
                          style={{ color: [Config.Textcolor] }}
                          className="form-control"
                          placeholder="เบอร์โทร"
                          aria-label="text"
                          aria-describedby="basic-addon"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.setVal}
                        />
                      </div>

                      <MDBBtn
                        color={[Config.Btncolor]}
                        style={{ color: [Config.Textcolor] }}
                        onClick={this.OnSubmit}
                      >
                        สมัครเข้าใช้งาน
                      </MDBBtn>
                    </MDBCardBody>
                    <span style={{ opacity: "0.6", color: [Config.Textcolor] }}>
                      {Config.AppName}
                    </span>
                  </MDBCard>
                </center>
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={12} xs={12}></Grid>
            </Grid>
          </div>
        </Container>
      </>
    );
  }
}
