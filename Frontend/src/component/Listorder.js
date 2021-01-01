// หน้าข้อมูลการจอง
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Nev from "./nevbar";
import "../css/background.css";
import Container from "@material-ui/core/Container";
import Card from "./subcomponenct/card_deal";
import Auth from "./Service/authlogin";
import Api from "./Service/api";
export default class Main extends Component {

  constructor(props){
    super(props);
    this.auth= new Auth();
    this.api = new Api();
    this.state={
      profile:[],
      data:[]
    }
  }

  componentDidMount(){
    if(this.auth.loggedIn()){
      this.setState({
        profile:this.auth.getProfile()
      })
      this.getlist(this.auth.getProfile().id);
    }else{
      window.location.href="/";
    }
  }

  getlist=(id)=>{
    this.api.getdeal(id).then(res=>{
      console.log(res.data);
      this.setState({
        data:res.data
      })
    })
  }

  render() {
    return (
      <>
        <Container>
          <Nev />
          <div className="background-login">
          <h4 style={{color:'white'}}>ข้อมูลการจอง</h4>
            <Grid container>

              {this.state.data.map((data)=>{
                return <Grid item xl={4} lg={4} md={4} sm={6} xs={12} style={{paddingBottom:'10px'}}>
                        <center>
                          <Card data={data} />
                        </center>
                       </Grid>
              })}

            

            </Grid>
          </div>
        </Container>
      </>
    );
  }
}
