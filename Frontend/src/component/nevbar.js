// แถบเมนู
import React, { Component } from "react";
import Auth from "./Service/authlogin";
import Config from "../files/config.json";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import User from "../assets/nav-icon.png";
export default class Nevbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      auth: false,
    };
    this.Auth = new Auth();
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) {
      let profile = this.Auth.getProfile();
      this.setState({ profile: profile });
      // console.log(profile);
    } else {
      // window.location.href="/login"
    }
  }

  render() {
    return (
      <>
        <div className="superbar">
          <div class="bs-example">
            <nav
              class="navbar navbar-expand-md navbar-light "
              style={{ backgroundColor: [Config.NevbarColor] }}
            >
              <Link to="/">
                <span
                  class="navbar-brand"
                  style={{ color: [Config.NevtxtColor] }}
                >
                  {Config.AppName}
                </span>
              </Link>
              <button
                type="button"
                class="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav">
                  <Link to="/">
                    <a
                      class="nav-item nav-link active"
                      style={{ color: [Config.NevtxtColor] }}
                    >
                      หน้าแรก
                    </a>
                  </Link>
                  <Link to="/cartype">
                    <a
                      class="nav-item nav-link active"
                      style={{ color: [Config.NevtxtColor] }}
                    >
                      ชนิดรถ
                    </a>
                  </Link>
                  <Link to="/about">
                    <a
                      class="nav-item nav-link active"
                      style={{ color: [Config.NevtxtColor] }}
                    >
                      เกี่ยวกับเรา
                    </a>
                  </Link>
                  <Link to="/contact">
                    <a
                      class="nav-item nav-link active"
                      style={{ color: [Config.NevtxtColor] }}
                    >
                      ติดต่อเรา
                    </a>
                  </Link>
                  {this.state.profile.status === "999" ? (
                    <>
                      <Link to="/addcar">
                        <a
                          class="nav-item nav-link active"
                          style={{ color: "red" }}
                        >
                          เพิ่มรถ
                        </a>
                      </Link>
                      <Link to="/configcar">
                        <a
                          class="nav-item nav-link active"
                          style={{ color: "red" }}
                        >
                          จัดการรถ
                        </a>
                      </Link>
                      <Link to="/configorder">
                        <a
                          class="nav-item nav-link active"
                          style={{ color: "red" }}
                        >
                          จัดการการจอง
                        </a>
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div class="navbar-nav ml-auto">
                  {this.Auth.loggedIn() ? (
                    <>
                      <div class="nav-item dropdown">
                        <a
                          href="#"
                          class="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          style={{ color: [Config.NevtxtColor] }}
                        >
                          <img src={User} alt="" width="20px" />
                          &nbsp;&nbsp;{this.state.profile.fullname}
                        </a>
                        <div class="dropdown-menu">
                          <Link to="/profile" style={{ padding: "0px" }}>
                            <a class="dropdown-item">ข้อมูลส่วนตัว</a>
                          </Link>

                          <Link to="/listorder" style={{ padding: "0px" }}>
                            <a class="dropdown-item">ข้อมูลการจอง</a>
                          </Link>

                          <Link
                            to="#!"
                            style={{ padding: "0px" }}
                            onClick={() => {
                              this.Auth.logout();
                            }}
                          >
                            <a class="dropdown-item">ออกจากระบบ</a>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="contained" color="primary">
                          เข้าสู่ระบบ/สมัครเข้าใช้งาน
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </>
    );
  }
}
