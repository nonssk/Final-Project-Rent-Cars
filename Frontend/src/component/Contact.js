// หน้าติดต่อเรา
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Nev from "./nevbar";
import "../css/background.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Api from "./Service/api";
export default class Main extends Component {
  constructor(props){
    super(props);
    this.api=new Api();
    this.state={
      email:"",
      address:"",
      phone:""
    }
  }
  componentDidMount(){
    this.api.getdata().then(res=>{
      this.setState({
        email:res.data[0].value,
        address:res.data[1].value,
        phone:res.data[2].value
      })
    })
  }
  render() {
    return (
      <>
         <Container>
          <Nev />
          <div className="background-login">
            <Grid container>
            <Grid item xl={2} lg={2} md={2} sm={12} xs={12}></Grid>
              <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                <span
                  style={{
                    fontSize: "45px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  <Card style={{backgroundColor:'thistle',color:'back'}}>
                    <CardContent>
                      <Typography>
                        <h1><strong>ติดต่อเรา</strong><br/></h1>
                        <h4><span>หากท่านต้องการมองหาบริการรถขนของหรือต้องการ ติดต่อเรา ได้ที่ {this.state.email}</span></h4>
                      </Typography>
                    </CardContent>
                  </Card>
                </span>
                  <br/>
                <span
                  style={{
                    fontSize: "45px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  <Card style={{backgroundColor:'teal',color:'back'}}>
                    <CardContent>
                      <Typography>
                        <h1><strong>ระบบจองรถขนของ</strong><br/></h1>
                        <h4><span>{this.state.address}<br/></span></h4>
                        <h4><span>{this.state.phone}<br/></span></h4>
                      </Typography>
                    </CardContent>
                  </Card>
                </span>
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={12} xs={12}></Grid>
            </Grid>
          </div>
        </Container>
      </>
    );
  }
}
