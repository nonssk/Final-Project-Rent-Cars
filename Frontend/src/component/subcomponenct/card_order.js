// การ์ด การจอง
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { MDBIcon } from "mdbreact";
import Api from "../Service/api";
import Swal from "sweetalert2";
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
  let [cus_time, set_cus_time] = useState("2020-01-01");
  let [cus_address, set_cus_address] = useState("");
  const Submit = () => {
    let api = new Api();
    if (cus_time === "" || cus_address === "") {
      Swal.fire({
        title: "พบข้อผิดพลาด!",
        text: "ใส่ข้อมูลให้ครบถ้วน",
        icon: "error",
        timer: 5000,
      });
    } else {
      api
        .addorder(
          props.profile.id,
          props.data.id,
          props.data.price,
          cus_time,
          cus_address
        )
        .then((res) => {
          if (res.status) {
            set_cus_time("");
            set_cus_address("");
              window.location.href = "/listorder";
          } else {
            Swal.fire({
              title: "พบข้อผิดพลาด!",
              text: "จองไม่สำเร็จ",
              icon: "error",
              timer: 5000,
            });
          }
        });
    }
  };

  if (props.data) {
    return (
      <>
        <div style={{ width: "95%" }}>
          <h2 style={{ color: "white" }}>จอง {props.data.name}</h2>
          <Card className={classes.root}>
            <CardContent>
              <img src={props.data.pic} alt="" width="200px" height="210px" />
              <Typography variant="h5" component="h2">
                <br />

                <div className="input-group" style={{ paddingBottom: "10px" }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon">
                      <MDBIcon icon="user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ชื่อ"
                    aria-label="name"
                    aria-describedby="basic-addon"
                    name="name"
                    value={props.profile.fullname}
                    disabled
                  />
                </div>

                <div className="input-group" style={{ paddingBottom: "10px" }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon">
                      <MDBIcon icon="phone-alt" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="เบอร์โทร"
                    aria-label="name"
                    aria-describedby="basic-addon"
                    name="phone"
                    value={props.profile.phone}
                    disabled
                  />
                </div>
                <table style={{ width: "100%" }}>
                  <tr>
                    <td style={{ width: "10%" }}>
                      <center>
                        <h4>เวลา</h4>
                      </center>
                    </td>
                    <td>
                      <input
                        style={{ width: "100%" }}
                        type="date"
                        id="start"
                        name="trip-start"
                        value={cus_time}
                        min="2020-01-01"
                        max="2030-12-31"
                        onChange={(e) => {
                          set_cus_time(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                </table>

                <div className="input-group" style={{ paddingBottom: "10px" }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon">
                      <MDBIcon icon="map-marker-alt" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ที่อยู่"
                    aria-label="name"
                    aria-describedby="basic-addon"
                    name="address"
                    value={cus_address}
                    onChange={(e) => {
                      set_cus_address(e.target.value);
                    }}
                  />
                </div>

                <div className="input-group" style={{ paddingBottom: "10px" }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon">
                      <MDBIcon icon="money-bill" />
                      &nbsp; ราคามัดจำ
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ราคามัดจำ"
                    aria-label="name"
                    aria-describedby="basic-addon"
                    name="sssss"
                    value={props.data.price}
                    disabled
                  />
                </div>
                <br />
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ paddingTop: "10px" }}
              >
                <Button
                  style={{ backgroundColor: "gray", width: "150px" }}
                  onClick={Submit}
                >
                  จอง
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div style={{ width: "95%" }}>
          <h2 style={{ color: "white" }}>จอง</h2>
          <Card className={classes.root}>
            <CardContent>Empty</CardContent>
          </Card>
        </div>
      </>
    );
  }
}
