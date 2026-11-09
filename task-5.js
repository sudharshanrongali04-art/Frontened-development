function check(){
        let age=document.getElementById("age").value;
        let email=document.getElementById("email").value;
        let pass=document.getElementById("pass").value;
        let cpass=document.getElementById("cpass").value;
        /*document.getElementById("ageError").innerHTML="";
        document.getElementById("emailError").innerHTML="";
        document.getElementById("passError").innerHTML="";
        document.getElementById("cpassError").innerHTML="";*/
        
        if(age===""){
            alert("Please enter your age");
            
        }
        else if(Number(age) < 18){
            alert("You must be atleast 18 years old");
        }
        else if(email===""){
            alert("Enter valid email Address");
        }
        else if(pass===""){
            alert("Please enter the valid password");
            

        }
        else if(Number(pass.length) <8){
            alert("The password should be min 8 characters");
            
        }
        else if(pass!=cpass){
            alert("The password doesn't match");
        }
        else{
            alert('Your Account has been Created Successfully');
            document.querySelector("form").reset();
        }

}