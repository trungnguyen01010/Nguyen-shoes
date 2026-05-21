const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Thông tin của bạn đã được gửi!");

    form.reset();

});