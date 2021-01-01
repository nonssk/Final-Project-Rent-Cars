// แสดง รถ โดยอิงชนิดของรถ
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Nev from "./nevbar";
import "../css/background.css";
import Swal from "sweetalert2";
import Container from "@material-ui/core/Container";
import Card from './subcomponenct/card';
import Button from "@material-ui/core/Button";
import Api from "./Service/api";
export default class Main extends Component {
  constructor(){
    super();
    this.api=new Api();
    this.state={
      data:[]
    }
  }

  getbytype=(id)=>{
    this.api.getcarbytype(id).then(res=>{
      if(res.status){
        this.setState({
          data:res.data
        })
      }else{
        Swal.fire({
          title: "พบข้อผิดพลาด!",
          text: "ไม่สามารถดึงข้อมูลได้",
          icon: "error",
          timer: 5000,
        });
      }
    })
  }
  
  render() {
    return (
      <>
        <Container >
          <Nev />
          <div className="background-login">
          <Button style={{backgroundColor:'white',width:'150px',padding:'10px'}} onClick={()=>{this.getbytype(4)}}>บรรทุก 4 ล้อ</Button>&nbsp;
          <Button style={{backgroundColor:'white',width:'150px',padding:'10px'}} onClick={()=>{this.getbytype(6)}}>บรรทุก 6 ล้อ</Button>&nbsp;
          <Button style={{backgroundColor:'white',width:'150px',padding:'10px'}} onClick={()=>{this.getbytype(10)}}>บรรทุก 10 ล้อ</Button>&nbsp;
          <br/>
          <br/>
            <Grid container>

              {this.state.data.map((data)=>{
                return <Grid item xl={3} lg={3} md={4} sm={6} xs={12} style={{paddingBottom:'10px'}}>
                <center><Card data={data} /></center>
              </Grid>
              })}

              {/* <Grid item xl={3} lg={3} md={4} sm={6} xs={12} style={{paddingBottom:'10px'}}>
                <center><Card /></center>
              </Grid> */}

            </Grid>
          </div>
        </Container>
      </>
    );
  }
}
