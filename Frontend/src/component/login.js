// หน้าเข้าสู่ระบบ
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { MDBBtn, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/background.css";
import PIC from "../assets/gif/animated-dog-image-0079.gif";
import Auth from "./Service/authlogin";
import Api from "./Service/api";
import Config from "../files/config.json";
import Nev from "./nevbar";
import Container from "@material-ui/core/Container";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth();
    this.api = new Api();
    this.state = {
      open: false,
      program_name: "",
      username: "",
      password: "",
    };
  }

  componentDidMount(){
    if(this.auth.loggedIn()){
      window.location.href="/";
    }
  }

  setVal = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  OnSubmit = () => {
    this.setState({ open: true });
    if (this.state.username === "" || this.state.password === "") {
      this.setState({
        open: false,
        username: "",
        password: "",
      });
      Swal.fire({
        title: "พบข้อผิดพลาด!",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        icon: "error",
        timer: 5000,
      });
    } else {
      this.auth.login(this.state.username,this.state.password).then(res=>{
        if(res.status){
          localStorage.setItem("profile",JSON.stringify(res.data));
          localStorage.setItem("Auth",true);
          window.location.href="/"
        }else{
          Swal.fire({
            title: "พบข้อผิดพลาด!",
            text: "Username หรือ Password ไม่ถูกต้อง",
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
                      <center>
                        <img src={PIC} alt="" width="200px" />
                      </center>
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
                          value={Config.AppName}
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
                          onKeyUp={(e) => {
                            if (e.keyCode === 13) {
                              this.OnSubmit();
                            }
                          }}
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
                          onSubmit={this.OnSubmit}
                          onKeyUp={(e) => {
                            if (e.keyCode === 13) {
                              this.OnSubmit();
                            }
                          }}
                        />
                      </div>
                      <MDBBtn
                        color={[Config.Btncolor]}
                        style={{ color: [Config.Textcolor] }}
                        onClick={this.OnSubmit}
                      >
                        เข้าสู่ระบบ
                      </MDBBtn>
                      <Link to="/register">
                        <MDBBtn
                          style={{
                            color: [Config.Textcolor],
                            backgroundColor: "pink",
                          }}
                        >
                          สมัครเข้าใช้งาน
                        </MDBBtn>
                      </Link>
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
