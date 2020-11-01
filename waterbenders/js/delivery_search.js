function similar_text (first, second) {
    // Calculates the similarity between two strings  
    // discuss at: http://phpjs.org/functions/similar_text

    if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
        return 0;
    }

    first += '';
    second += '';

    var pos1 = 0,
        pos2 = 0,
        max = 0,
        firstLength = first.length,
        secondLength = second.length,
        p, q, l, sum;

    max = 0;

    for (p = 0; p < firstLength; p++) {
        for (q = 0; q < secondLength; q++) {
            for (l = 0;
            (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++);
            if (l > max) {
                max = l;
                pos1 = p;
                pos2 = q;
            }
        }
    }

    sum = max;

    if (sum) {
        if (pos1 && pos2) {
            sum += this.similar_text(first.substr(0, pos2), second.substr(0, pos2));
        }

        if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
            sum += this.similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max));
        }
    }

    return sum;
}

function Compare(strA,strB){
    strA = strA.toLowerCase();
    strB = strB.toLowerCase();

    for(var result = 0, i = strA.length; i--;){
        if(typeof strB[i] == 'undefined' || strA[i] == strB[i]);
        else if(strA[i].toLowerCase() == strB[i].toLowerCase())
            result++;
        else
            result += 4;
    }
    let bonus = 0;
    if (strA.includes(strB))
        bonus += 15;
    return bonus + 1 - (result + 4*Math.abs(strA.length - strB.length))/(2*(strA.length+strB.length));
}

function swap(a, b) {
    let c = a;
    a = b;
    b = c;
}

function procces_delivery_search() {
    str = document.getElementById("searchzone").value;
    //alert(str);
    
    let len = doc_keywords.length;
    //alert(len);
    scores = [];
    for (let i=0; i<len; ++i) {
        let len2 = doc_keywords[i].length;
        let max = Compare(doc_names[i], str);
        for (let j=0; j<len2; ++j) {
            let keyword = doc_keywords[i][j]["text"];
            //alert(keyword);

            let val = Compare(keyword, str);
            if (val > max)
                max = val
        }
        scores.push(max);
    }

    let perm = [];
    for (let i=0; i<len; ++i) 
        perm.push(i);

    perm.sort(function(a, b) {
          return scores[b] - scores[a];
     });

     //alert("aa");

     copy_ids = JSON.parse(JSON.stringify(doc_ids));
     copy_dates = JSON.parse(JSON.stringify(doc_dates));
     copy_keywords = JSON.parse(JSON.stringify(doc_keywords));
     copy_names = JSON.parse(JSON.stringify(doc_names));

    for (let i=0; i<len; ++i) {
        doc_ids[i] = copy_ids[perm[i]];
        doc_dates[i] = copy_dates[perm[i]];
        doc_keywords[i] = copy_keywords[perm[i]];
        doc_names[i] = copy_names[perm[i]];
    }

    document.getElementById('data_row').innerHTML = "";
    //for (let i=0; i<len; ++i) {
    //    alert(perm[i]);
    //}
    add_data_to_gird();
}