function SendMail() {
    var params = {
      from_name: document.getElementById("full_name").value,
      email_id: document.getElementById("email_id").value,
      Phone_number: document.getElementById("phone_number").value,
      Age: document.getElementById("age").value,
      Gender: document.getElementById("gender").value,
      plan: document.getElementById("plan").value,
      message: document.getElementById("message").value,
    };
  
    const serviceID = "service_x09du4t";
    const templateID = "template_o2slsso";
    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        document.getElementById("full_name").value = "";
        document.getElementById("email_id").value = "";
        document.getElementById("phone_number").value = "";
        document.getElementById("age").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("plan").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message was sent successfully");
      })
      .catch((err) => console.log(err));
  }
  