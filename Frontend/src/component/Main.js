// แสดงหน้ารถที่แนะนำ
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Api from "./Service/api";
import Nev from "./nevbar";
import "../css/background.css";
import Container from "@material-ui/core/Container";
import Card from './subcomponenct/card';
export default class Main extends Component {
  constructor(){
    super();
    this.api = new Api();
    this.state={
      rec:[]
    }
  }

  componentDidMount(){
    this.api.carrec().then(res=>{
      if(res.status){
        this.setState({
          rec:res.data
        })
      }
    })
  }


  render() {
    return (
      <>
        <Container >
          <Nev />
          <div className="background-login">
            <h4 style={{color:'white'}}>แนะนำ</h4>
            <Grid container>

              {this.state.rec.map((data)=>{
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
