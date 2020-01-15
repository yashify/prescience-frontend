function searchDashboard(highChartJson, dataType) {
    var searchKeyword = $("#search").val();
    var searchData = {
        "text": searchKeyword
    };   

    $.ajax({
        url: 'https://localhost:5000/api/get-result',
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(searchData),
        success: function (response, responseStatus, xhr) {
            showResult(response, searchData.text);
            // $('body').append(response);
        },
        error: function (xhr, responseStatus, errorThrown) {
            console.log('Error in Operation', responseStatus);
        }
    });
}

function showResult(respData, searchKeywords) {
    // var dept = respData.dept;    
    // dept = dept[0] != "" ? dept[0] : "Not Found";
    // dept = dept ? dept : "Not Found";
    // var tenure = respData.tenure;
    // tenure = tenure[0] != "" ? tenure[0] : "Not Found";
    // tenure = tenure ? tenure : "Not Found";
    // var $tagList = $("#tagList");
    // $tagList.empty();
    // var temp = '<li><span class="result-head">Department: </span>' + dept;
    // $tagList.append(temp);
    // var temp = '<li><span class="result-head">Tenure: </span>' + tenure;
    // $tagList.append(temp);
    // respData.map(function (_tag) {
    // });

    if (respData.code == 200){
        renderCharts(respData, searchKeywords);
    } else {
        displayNoRecords(searchKeywords);
    }
}

function displayNoRecords(searchQuery){
    $("#viz-result").html("<p>We cannot find results for the query: '" + searchQuery + "'</p>");
}

function startDictation() {

    if (window.hasOwnProperty('webkitSpeechRecognition')) {
        var recognition = new webkitSpeechRecognition();
    } else if (window.hasOwnProperty('SpeechRecognition')) {
        var recognition = new SpeechRecognition();
    } else {
        return;
    }

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    
    recognition.onresult = function (e) {        
        document.getElementById('search').value = e.results[0][0].transcript;
        console.log(document.getElementById('search').value);
        // recognition.stop();
        evt = $.Event('keyup');
        evt.keyCode = 13; // enter
        $('#search').trigger(evt);
    };
    
    recognition.onspeechend = function () {
        console.log("Ended");
        recognition.stop();
    }
    
    recognition.onerror = function (e) {
        console.log(e);
        recognition.stop();
    }
    
    recognition.start();
    console.log("Started");
}

function onInit(){
    $("#search").keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

    $("#search").keyup(function (e) {
        if (e.keyCode == 13) {
            searchDashboard();
        }
    });

    $("#search-icon").click(function (e) {
        searchDashboard();
    });

    if (window.hasOwnProperty('webkitSpeechRecognition') || window.hasOwnProperty('SpeechRecognition')) {
        $("#voice-icon").show();
        $("#voice-icon").click(function (e) {
            startDictation();
        });
    } else {
        $("#voice-icon").hide();
    }
}

onInit();