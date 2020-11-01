function show_popup(text) {
    //alert("alerta2");
    document.getElementById("popup").style.bottom = "10px";
    document.getElementById("popup_text").innerText = text;
    //alert("alerta3");
}

function hide_popup() {
    //alert("hide!!");
    document.getElementById("popup").style.bottom = "-50px";
}