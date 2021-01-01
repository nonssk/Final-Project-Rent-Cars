// Service เข้าสู่ระบบ
export default class Authen {
  constructor() {
    this.domain = "http://localhost:4444";

    this.header = new Headers();
    this.header.append("Content-Type", "application/json");
    this.header.append("token", "token4444");

    this.login = this.login.bind(this);
  }

  login(username, password) {
    // เข้าระบบ
    return fetch(this.domain+'/login', {
      method: "POST",
      headers:this.header,
      body: JSON.stringify({
        username:username,
        password:password
      }),
    }).then(response=>response.json());
  }

  loggedIn() {
    // ตรวจสอบการเข้าระบบ
    if(localStorage.getItem("Auth")){
      return true;
    }else{
      return false;
    }
    
  }

  logout() {
    // ออกจากระบบ
    localStorage.removeItem("profile");
    localStorage.removeItem("Auth");
    window.location.href="/login"
  }

  getProfile(){
    // ดึงข้อมูล ส่วนตัว
    let profile = JSON.parse(localStorage.getItem("profile"));
    return profile;
  }

}
