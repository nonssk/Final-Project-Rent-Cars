// การ์ด แสดงรถ
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Auth from '../Service/authlogin';

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
  const auth = new Auth();
  return (
    <>
      <div style={{width:'95%'}}>
        <Card className={classes.root}>
          <CardContent>
            <img src={props.data.pic} alt="" width="200px" height="210px" />
            <Typography variant="h5" component="h2">
              {props.data.name}
            </Typography>
            {auth.loggedIn()?(<>
            <Typography variant="body2" component="p" style={{paddingTop:'10px'}}>
                <Link to={"/carorder/"+props.data.id}>
                    <Button style={{backgroundColor:'gray',width:'150px'}}>จอง</Button>
                </Link>
            </Typography>
            {auth.getProfile().status==="999"?(<>
              <Link to={"/editcar/"+props.data.id}>
                    <Button style={{backgroundColor:'red',width:'150px'}}>แก้ไข</Button>
                </Link>
          </>):(<></>)}
            </>):(<></>)}
            

          </CardContent>
          <CardActions>
                <Link to={"/cardetail/"+props.data.id}>
                <Button size="small">รายละเอียด</Button>
                </Link>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
