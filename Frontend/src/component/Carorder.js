//หน้า จองรถ
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Nev from "./nevbar";
import "../css/background.css";
import Container from "@material-ui/core/Container";
import Card from "./subcomponenct/card_order";
import Auth from "./Service/authlogin";
import Api from "./Service/api";
export default class Main extends Component {
  constructor(props){
    super(props);
    this.api=new Api();
    this.Auth=new Auth();
    this.state={
      data:[],
      profile:[]
    }
  }

  componentDidMount(){
    this.setState({
      profile:this.Auth.getProfile()
    });

    this.api.getcarbyid(this.props.match.params.id).then(res=>{
      if(res.status){
        this.setState({
          data:res.data
        })
      }else{
        window.location.href="/";
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
              <Grid
                item
                xl={3}
                lg={3}
                md={3}
                sm={12}
                xs={12}
                style={{ paddingBottom: "10px" }}
              ></Grid>

              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                style={{ paddingBottom: "10px" }}
              >
                <center>
                  <Card data={this.state.data[0]} profile={this.state.profile} />
                </center>
              </Grid>
              
              <Grid
                item
                xl={3}
                lg={3}
                md={3}
                sm={12}
                xs={12}
                style={{ paddingBottom: "10px" }}
              ></Grid>

            </Grid>
          </div>
        </Container>
      </>
    );
  }
}
