let convertApi = ConvertApi.auth({secret: '7UUjA1tj0BG0tPqw'});
convert_link = "";
uploaded_doc_id = null;

// On file input change, start conversion
document.getElementById('fileInput').addEventListener('change', async e => {
    show_popup("PDF loading...");
    document.documentElement.style.cursor = 'wait';
    
    try {

        // Converting DOCX to PDF file
        show_popup("PDF loading");
        let params = convertApi.createParams()
        params.add('file', e.currentTarget.files[0])

        // axios.post(backend_URL + '/documents/upload', e.currentTarget.files[0], {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }});
        
        let result = await convertApi.convert( 'pdf','txt', params)

        convert_link = result.files[0].Url;
        console.log(convert_link);
        hide_popup();
    }
    catch{
        console.log('ex')
    } 
    finally {
        document.documentElement.style.cursor = 'default'
    }
})