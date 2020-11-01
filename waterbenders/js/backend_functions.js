function hideSignIn() {
    document.getElementById("signText").innerText = "Sign Out";
}

function setSessionData(cname, cvalue) {
    //alert("setter");
    window.sessionStorage.setItem(cname, cvalue);
}
function getSessionData(cname) {
    let ptr = window.sessionStorage.getItem(cname);
    if (ptr === null) return "";
    return ptr;
}

let backend_URL = 'https://testingpostgressapp.azurewebsites.net';

let months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

function get_user_mail() {
    // return 'andrei@gmail.com';
    var message = document.getElementById("usernamevalue").value;
    
    return message;
}

function upload_doc(document_name, upload_date, expire_date, content, reminders) {
    user_mail = getSessionData("user_mail");
    console.log(user_mail);
    //alert(document_name + "#" + upload_date + "#" + expire_date + "#" + content + "#");
    post_url = backend_URL + '/documents/create';
    console.log(post_url);
    console.log(convert_link);
    show_popup("Document loading...");
    axios.post(post_url, {
        "user_email" : user_mail,
        "document_name" : document_name,
        "upload_date" : upload_date,
        "expire_date" : expire_date,
        "reminders" : reminders,
        "content" : convert_link // txt link URL
    }).then( function(response){
        hide_popup();
        console.log(response);
        window.location.reload();
    }).catch(function (error) {
        // handle error
        hide_popup();
        console.log(error);
        window.location.reload();
    });
    
}

function process_docs(docs_json) {
    doc_names = [];
    doc_keywords = [];
    doc_dates = [];
    doc_ids = [];
    docs_json.forEach(doc => {
        doc_names.push(get_json_doc_name(doc));
        doc_keywords.push(get_keywords(doc));
        doc_dates.push(get_expiration(doc));
        doc_ids.push(get_json_doc_id(doc))
    });
    console.log(JSON.stringify(docs_json));
    add_data_to_gird();
}

function get_docs() {
    show_popup("Loading documents from server...");
    user_mail = getSessionData("user_mail");
    axios.post(backend_URL + '/documents', {
        "email" : user_mail
    }).then(resp => {
        hide_popup();
        process_docs(JSON.parse(JSON.stringify(resp.data)));
    });
}

function get_json_doc_name(json) {
    return json["document_name"];
}   

function get_keywords(json) {
    return json["keywords"];
}

function get_json_doc_id(json) {
    return json["id"];
}

function get_expiration(json) {
    try{
        date = json["expire_date"];
        arr = date.split('-');
        return arr[0] + " " + months[parseInt(arr[1]-1)] + " " + arr[2];
    }
    catch{
        return '';
    }
}

function on_upload() {
    open_doc_form();
    upload_doc("", "", "", "", []);
}

let doc_ids = []
let doc_names = []
let doc_keywords = []
let doc_dates = []

function open_doc_form() {
    document.getElementById("showpdf").style.opacity = "1";
    document.getElementById("submitform").style.opacity = "1";
}

function submit_button() {
    document.getElementById("showpdf").style.opacity = "0";
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    //alert("why");
    let document_name = document.getElementById("documentname").value;
    //alert(document_name);
    let expire_date = document.getElementById("expiredate").value;
    //alert(expire_date);
    let alert_name = document.getElementById("alertname").value;
    //alert(alert_name);
    let alert_date = document.getElementById("alertdate").value;
    //alert(alert_date);
    

    var reminders = []
    if(!(alert_date === '' || alert_name === ''))
        reminders.push({"date":alert_date, "name":alert_name});

    console.log(reminders);
    upload_doc(document_name, today, expire_date, convert_link, reminders);
    //alert("bunica");
    document.getElementById("submitform").style.display = "none";
    
}

function delivery_button() {
    document.getElementById("delivery_button").style.display = "none";
    document.getElementById("delivery_finish").style.display = "block";
    document.getElementById("deliveryform").style.opacity = "1";
}

function delivery_finish_button() {
    let targetemail = document.getElementById("targetemail").value;

    document.getElementById("delivery_button").style.display = "block";
    document.getElementById("delivery_finish").style.display = "none";
    document.getElementById("deliveryform").style.opacity = "0";
}

function add_data_to_gird(){
    console.log(doc_names);
    var data_row = document.getElementById('data_row');
    
    for(i=0; i < doc_names.length; i++){
        var new_card = '<div class="col-lg-2 col-xs-8 bg-dark m-3 mt-4 heightadjust" id="imgindex">' 
                        +'<div class="custom-control custom-checkbox float-right mt-3">'
                        +'<input type="checkbox" class="custom-control-input" id="customControlInline' + i +'">'
                        +'<label class="custom-control-label" for="customControlInline'+ i +'"></label>'
                        + '</div>'
                        + '<img src="img/icon.png" alt="" class="hoverscale" onmouseover="chbg()">'
                        + '<div class="idtext">' + doc_names[i] +'</div>'
                        + '<div>' + doc_dates[i] + '</div>'
                        + '</div>'
                       
                        ;
        
        document.getElementById('data_row').innerHTML += new_card;
    }
    // document.getElementById('data_row').innerHTML += 'aaaaaa';
    ///<div class="col-lg-2 col-xs-8 bg-dark m-3 mt-4 heightadjust" id="imgindex">
    //     <img src="img/" alt="" class="hoverscale" onmouseover="chbg()">
    //   </div>
}

