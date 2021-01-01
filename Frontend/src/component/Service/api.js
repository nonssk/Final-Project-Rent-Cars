// Api ติดต่อหลังบ้าน ( Nodejs )
export default class API {
  constructor() {
    this.domain = "http://localhost:4444";
    this.header = new Headers();
    this.header.append("Content-Type", "application/json");
    this.header.append("token", "token4444");
  }

  carrec() {
    return fetch(this.domain+"/carrec",{headers:this.header}).then(response=>response.json());
  }

  getcarbyid(id) {
    return fetch(this.domain+"/getcarbyid/"+id,{headers:this.header}).then(response=>response.json());
  }

  getcarbyidadmin(id){
    return fetch(this.domain+"/getcarbyidadmin/"+id,{headers:this.header}).then(response=>response.json());
  }

  getcarbytype(id) {
    return fetch(this.domain+"/getcarbytype/"+id,{headers:this.header}).then(response=>response.json());
  }

  addorder(idcus,idcar,price,time,address){
    return fetch(this.domain+"/addorder",{
      method:"POST",
      headers:this.header,
      body:JSON.stringify({
        idcus:idcus,
        idcar:idcar,
        price:price,
        time:time,
        address:address
      })
    }).then(respons=>respons.json());
  }

  addcar(imgSrc,type,name,code,price){
    return fetch(this.domain+"/addcar",{
      method:"POST",
      headers:this.header,
      body:JSON.stringify({
        name:name,
        imgSrc:imgSrc,
        type:type,
        code:code,
        price:price
      })
    }).then(respons=>respons.json());
  }

  updatecar(id,name,code,price,status,rec){
    return fetch(this.domain+"/updatecar",{
      method:"POST",
      headers:this.header,
      body:JSON.stringify({
        id:id,
        name:name,
        code:code,
        price:price,
        status:status,
        rec:rec,
      })
    }).then(respons=>respons.json());
  }

  updateProfile(id,name,phone){
    return fetch(this.domain+"/updateprofile",{
      method:"POST",
      headers:this.header,
      body:JSON.stringify({
        id:id,
        name:name,
        phone:phone
      })
    }).then(respons=>respons.json());
  }

  register(username,password,fullname,phone){
    return fetch(this.domain+"/register",{
      method:"POST",
      headers:this.header,
      body:JSON.stringify({
        username:username,
        password:password,
        fullname:fullname,
        phone:phone
      })
    }).then(respons=>respons.json());
  }

  getdeal(id) {
    return fetch(this.domain+"/getdeal/"+id,{headers:this.header}).then(response=>response.json());
  }

  getallorder() {
    return fetch(this.domain+"/getallorder",{headers:this.header}).then(response=>response.json());
  }

  getorderbystatus(status){
    return fetch(this.domain+"/getorderbystatus",{
      method:"POST",
      headers:this.header,
      body:JSON.stringify({
        status:status
      })
    }).then(respons=>respons.json());
  }

  getorderbyid(id){
    return fetch(this.domain+"/getorderbyid/"+id,{headers:this.header}).then(response=>response.json());
  }

  updateorder(id,address,time,status){
    return fetch(this.domain+"/updateorder",{
      method:"POST",
      headers:this.header,
      body:JSON.stringify({
        id:id,
        address:address,
        time:time,
        status:status
      })
    }).then(respons=>respons.json());
  }

  deleteorder(id){
    return fetch(this.domain+"/deleteorder/"+id,{headers:this.header}).then(response=>response.json());
  }

  getcarall(){
    return fetch(this.domain+"/getcarall/",{headers:this.header}).then(response=>response.json());
  }


  getcarbystatus(status){
    return fetch(this.domain+"/getcarbystatus/"+status,{headers:this.header}).then(response=>response.json());
  }

  getdata(){
    return fetch(this.domain+"/getdata",{headers:this.header}).then(response=>response.json());
  }

  deletecar(id){
    return fetch(this.domain+"/deletecar/"+id,{headers:this.header}).then(response=>response.json());
  }

}
