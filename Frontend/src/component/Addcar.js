import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Nev from "./nevbar";
import Config from "../files/config.json";
import "../css/background.css";
import { MDBBtn, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Swal from "sweetalert2";

import Auth from "./Service/authlogin";
import Api from "./Service/api";
export default class Main extends Component {
  constructor() {
    super();
    this.Auth = new Auth();
    this.api = new Api();
    if(this.Auth.loggedIn()){
      let profile =this.Auth.getProfile();
      if(profile.status==="999"){
        
      }else{
        window.location.href="/";
      }
    }else{
      window.location.href="/";
    }

    this.state = {
      imgSrc: "",
      type: "",
      name: "",
      code: "",
      price: "",
    };
  }
  addimg = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imgSrc: reader.result
      });
    }
    reader.readAsDataURL(file)
  };

  setVal = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  settype = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  OnSubmit = () => {
    if (
      this.state.imgSrc === "" ||
      this.state.type === "" ||
      this.state.name === "" ||
      this.state.code === "" ||
      this.state.price === ""
    ) {
      Swal.fire({
        title: "พบข้อผิดพลาด!",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        icon: "error",
        timer: 5000,
      });
    } else {
      this.api
        .addcar(
          this.state.imgSrc,
          this.state.type,
          this.state.name,
          this.state.code,
          this.state.price
        )
        .then((res) => {
          if (res.status) {
            Swal.fire({
              title: "สำเร็จ!",
              text: "บันทึกข้อมูลสำเร็จ",
              icon: "success",
              timer: 5000,
            });
            this.setState({
              imgSrc: "",
              type: "",
              name: "",
              code: "",
              price: "",
            });
          } else {
            Swal.fire({
              title: "พบข้อผิดพลาด!",
              text: "ไม่สามารถบันทึกข้อมูลได้",
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
                          value={"เพิ่มรถ"}
                          disabled
                        />
                      </center>
                    </div>

                    <MDBCardBody
                      style={{
                        backgroundColor: "GrayText",
                        opacity: "1.2",
                      }}
                    >
                      {this.state.imgSrc !== "" ? (
                        <>
                          <img src={this.state.imgSrc} alt="" width="250px" />
                          <br />
                          <br />
                        </>
                      ) : (
                        <></>
                      )}
                      รูปภาพ :{" "}
                      <input
                        ref="file"
                        type="file"
                        name="user[image]"
                        multiple="true"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={this.addimg}
                      />
                      <br />
                      <br />
                      <div
                        className="input-group"
                        style={{ paddingBottom: "10px" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon">
                            <MDBIcon icon="car-side" />
                          </span>
                        </div>
                        <input
                          type="text"
                          style={{ color: [Config.Textcolor] }}
                          className="form-control"
                          placeholder="ชื่อรถ"
                          aria-label="name"
                          aria-describedby="basic-addon"
                          name="name"
                          value={this.state.name}
                          onChange={this.setVal}
                        />
                      </div>
                      <div
                        className="input-group"
                        style={{ paddingBottom: "10px" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon">
                            <MDBIcon far icon="address-card" />
                          </span>
                        </div>
                        <input
                          type="text"
                          style={{ color: [Config.Textcolor] }}
                          className="form-control"
                          placeholder="ทะเบียน"
                          aria-label="code"
                          aria-describedby="basic-addon"
                          name="code"
                          value={this.state.code}
                          onChange={this.setVal}
                        />
                      </div>
                      <div
                        className="input-group"
                        style={{ paddingBottom: "10px" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon">
                            <MDBIcon icon="money-bill" />
                          </span>
                        </div>
                        <input
                          type="text"
                          style={{ color: [Config.Textcolor] }}
                          className="form-control"
                          placeholder="ราคามัดจำ"
                          aria-label="price"
                          aria-describedby="basic-addon"
                          name="price"
                          value={this.state.price}
                          onChange={this.setVal}
                        />
                      </div>
                      <table style={{ width: "100%" }}>
                        <tr>
                          <td style={{ width: "20%" }}>
                            <h5 style={{ color: "white" }}>ชนิดรถ</h5>
                          </td>
                          <td style={{ width: "80%" }}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={this.state.type}
                              onChange={this.settype}
                              style={{ width: "100%" }}
                            >
                              <MenuItem value={4}>บรรทุก 4 ล้อ</MenuItem>
                              <MenuItem value={6}>บรรทุก 6 ล้อ</MenuItem>
                              <MenuItem value={10}>บรรทุก 10 ล้อ</MenuItem>
                            </Select>
                          </td>
                        </tr>
                      </table>
                      <br />
                      <MDBBtn
                        color={[Config.Btncolor]}
                        style={{ color: [Config.Textcolor] }}
                        onClick={this.OnSubmit}
                      >
                        เพิ่ม
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
