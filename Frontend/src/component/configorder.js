// หน้าแก้ไขการจอง โดยอิงสถานะ
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Nev from "./nevbar";
import "../css/background.css";
import Container from "@material-ui/core/Container";
import Card from "./subcomponenct/card_configcar";
import Button from "@material-ui/core/Button";
import Auth from "./Service/authlogin";
import Api from "./Service/api";
export default class Main extends Component {

  constructor(props){
    super(props);
    this.auth= new Auth();
    this.api = new Api();
    if(this.auth.loggedIn()){
        let profile =this.auth.getProfile();
        if(profile.status==="999"){
        }else{
          window.location.href="/";
        }
      }else{
        window.location.href="/";
      }
    this.state={
      profile:[],
      data:[]
    }
  }

  componentDidMount(){
    this.getorderall();
  }

  getorderall=()=>{
    this.api.getallorder().then(res=>{
      this.setState({
        data:res.data
      })
    })
  }

  getorderbystatus=(status)=>{
      this.api.getorderbystatus(status).then(res=>{
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
          <h4 style={{color:'white'}}>รายการ</h4>
          <Button style={{backgroundColor:'white',width:'150px',padding:'10px'}} onClick={()=>{this.getorderall()}}>ทั้งหมด</Button>&nbsp;
          <Button style={{backgroundColor:'white',width:'150px',padding:'10px'}} onClick={()=>{this.getorderbystatus("จอง")}}>จอง</Button>&nbsp;
          <Button style={{backgroundColor:'white',width:'150px',padding:'10px'}} onClick={()=>{this.getorderbystatus("ส่งรถ")}}>ส่งรถ</Button>&nbsp;
          <Button style={{backgroundColor:'white',width:'150px',padding:'10px'}} onClick={()=>{this.getorderbystatus("เรียบร้อย")}}>เรียบร้อย</Button>&nbsp;
          <br/>
          <br/>
            <Grid container>

              {this.state.data.map((data)=>{
                return <Grid item xl={3} lg={3} md={4} sm={6} xs={12} style={{paddingBottom:'10px'}}>
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
