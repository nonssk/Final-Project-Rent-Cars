//หน้าแก้ไข รถ โดยอิงสถานะรถ
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Api from "./Service/api";
import Auth from "./Service/authlogin";
import Nev from "./nevbar";
import "../css/background.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Card from "./subcomponenct/card_managecar";
export default class Main extends Component {
  constructor() {
    super();
    this.api = new Api();
    this.Auth = new Auth();
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
      data: [],
    };
  }

  componentDidMount() {
    this.getcarall();
  }

  getcarall = () => {
      console.log('ss');
    this.api.getcarall().then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  getcarbystatus = (status) => {
    this.api.getcarbystatus(status).then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  render() {
    return (
      <>
        <Container>
          <Nev />
          <div className="background-login">
            <h4 style={{ color: "white" }}>จัดการรถ</h4>
            <Button
              style={{
                backgroundColor: "white",
                width: "150px",
                padding: "10px",
              }}
              onClick={() => {
                this.getcarall();
              }}
            >
              ทั้งหมด
            </Button>
            &nbsp;
            <Button
              style={{
                backgroundColor: "white",
                width: "150px",
                padding: "10px",
              }}
              onClick={() => {
                this.getcarbystatus('ว่าง');
              }}
            >
              ว่าง
            </Button>
            &nbsp;
            <Button
              style={{
                backgroundColor: "white",
                width: "150px",
                padding: "10px",
              }}
              onClick={() => {
                this.getcarbystatus('ไม่ว่าง');
              }}
            >
              ไม่ว่าง
            </Button>
            &nbsp;
            <br/>
            <br/>
            <Grid container>
              {this.state.data.map((data) => {
                return (
                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    style={{ paddingBottom: "10px" }}
                  >
                    <center>
                      <Card data={data} />
                    </center>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Container>
      </>
    );
  }
}
