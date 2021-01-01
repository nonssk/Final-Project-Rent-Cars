// การ์ด จัดการรถ
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Api from "../Service/api";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  if (props.data) {
    return (
      <>
        <div style={{ width: "95%" }}>
          <Card className={classes.root}>
            <CardContent>
              <img src={props.data.pic} alt="" width="200px" height="210px" />
              <Typography variant="h5" component="h2">
                <br />
                <table style={{ width: "80%" }}>
                  <tr>
                    <td>ชนิดรถ</td>
                    <td>บรรทุก {props.data.type} ล้อ</td>
                  </tr>
                  <tr>
                    <td>ชื่อรถ</td>
                    <td>{props.data.name}</td>
                  </tr>
                  <tr>
                    <td>เลขทะเบียน</td>
                    <td>{props.data.code}</td>
                  </tr>
                  <tr>
                    <td>ราคามัดจำ</td>
                    <td>{props.data.price}</td>
                  </tr>
                </table>
                <br />
              </Typography>
              <table>
                <tr>
                  <td>
                    <Link to={"/managecar/" + props.data.id}>
                      <Button
                        style={{ backgroundColor: "gray", width: "100px" }}
                      >
                        จัดการ
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button style={{ backgroundColor: "red", width: "100px" }} onClick={()=>{
                      // props.data.id
                      let api= new Api();
                      api.deletecar(props.data.id).then(res=>{
                        if(res.status){
                          window.location.href="/configcar";
                        }
                      })
                    }}>
                      ลบ
                    </Button>
                  </td>
                </tr>
              </table>
            </CardContent>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div style={{ width: "95%" }}>
          <h2 style={{ color: "white" }}>รายละเอียด</h2>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <table style={{ width: "80%" }}>
                  <tr>
                    <td>ชนิดรถ</td>
                    <td>บรรทุก {} ล้อ</td>
                  </tr>
                  <tr>
                    <td>ชื่อรถ</td>
                    <td>{}</td>
                  </tr>
                  <tr>
                    <td>เลขทะเบียน</td>
                    <td>{}</td>
                  </tr>
                  <tr>
                    <td>ราคามัดจำ</td>
                    <td>บรรทุก 10 ล้อ</td>
                  </tr>
                </table>
                <br />
              </Typography>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
}
