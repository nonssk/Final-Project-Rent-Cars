// หน้าเกี่ยวกับเรา
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
      about:""
    }
  }
  componentDidMount(){
    this.api.getdata().then(res=>{
      this.setState({
        about:res.data[3].value
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
                        <h1><strong>เกี่ยวกับเรา</strong><br/></h1>
                        <h3>{this.state.about}</h3>
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
