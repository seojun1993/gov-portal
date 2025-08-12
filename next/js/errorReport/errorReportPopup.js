$(function() {
    $("#errorReportPop .popup_error_window_title_x").on("click", function() {
        handleClosePop()
    })

    $("#errorReportPop button.cancel").on("click", function() {
        handleClosePop()
    })

    $(document).on("errorReportPopOpen", function() {
        fetchArchiveDetail()
    })

    $(document).on("change", ".form_table .checks input[type=checkbox]", function(e) {
        let type = $(this).attr("name");
        let checked = e.target.checked;
        let currentContent = $(e.target).closest("th").next("td")[0].innerText.replace(/"/g, "&quot;").replace(/'/g, "&apos;")

        let param = {
            type, checked, currentContent
        }

        if(type === "KIKWAN") {
            param.currentOrgCode = errorReportParam.currentOrgCode
        }

        handleChangeCheckBox(param)
    })

    // TODO: 생산기관 검색 팝업
    $(document).on("click", "form[name=reportItemForm] table[name=KIKWAN] button", function() {
        window.open("/next/newsearch/errorReportOrgSearchPop.do",'searchcode','width=730 ,height=800 ,scrollbars=yes,resizable=no');
    })

    $("#errorReportPop button.okay").on("click", function() {
        let validate = validationCheck();
        if(!validate.result) {
            alert(validate.alertText)
            return
        }

        let confirmTf = confirm("오류신고 하시겠습니까?")

        if(!confirmTf) {
            return;
        }

        let reportItemList = []

        $("#errorReportPop form[name=reportItemForm] .reportItem .form_table2.not_mobile_t").each((index, item) => {
            let reportItem = {
                currentContent: $("input[name=currentContent]", item).val(),
                offerContent: $("input[name=offerContent]", item).val(),
                offerReason: $("input[name=offerReason]", item).val(),
                itemType: $(item).attr("name"),
                itemOrd: index + ""
            }

            if(reportItem.itemType === "KIKWAN") {
                let offerOrgCode = $("input[name=offerOrgCode]", item).val()
                let currentOrgCode = $("input[name=currentOrgCode]", item).val()

                reportItem = {...reportItem, offerOrgCode, currentOrgCode}
            }

            reportItemList.push(reportItem)
        })

        let param = {
            rcGbnCode: errorReportParam.rcGbnCode,
            rcCode: errorReportParam.rcCode,
            rcRfileNo: errorReportParam.rcRfileNo,
            rcRitemNo: errorReportParam.rcRitemNo,
            archiveName: errorReportParam.archiveName,
            archiveMngNo: errorReportParam.archiveMngNo,
            reportItemList,
            emailAddress: $(".form_table input[name=emailAddress]").val(),
            phoneNum: $(".form_table input[name=phoneNum]").val(),
            personalInfoCollectAgreeYn: $(".form_table input:radio[name=agree]:checked").val() === "Y" ? "1" : "0"
        }

        $.ajax({
          type: "POST",
          url: "/next/newsearch/insertErrorReport.do",
          data : JSON.stringify(param),
          contentType: "application/json",
          success : function(result) {
                alert("오류신고 되었습니다. 처리결과는 마이페이지에서 확인 가능합니다.")
                handleClosePop()
           },
          error : function(e, s, error) { console.log(e, error) }
        });
    })

    // 모바일, pc input 동기화
    $(document).on("change", ".form_table input:checkbox", function() {
        let isMobile = $(this).closest("table").hasClass("on_mobile_t")
        let value = $(this).prop("checked")
        let name = $(this).attr("name")
        if(isMobile) {
            $(`.form_table.not_mobile_t input[name=${name}]`).prop("checked", value)
        } else {
            $(`.form_table.on_mobile_t input[name=${name}]`).prop("checked", value)
        }
    })

    $(".form_table input:radio[name=agree]").on("change", function() {
        let value = $(this).val()
        $(`.form_table input:radio[name=m_agree][value=${value}]`).prop("checked", true)
    })

    $(".form_table input:radio[name=m_agree]").on("change", function() {
        let value = $(this).val()
        $(`.form_table input:radio[name=agree][value=${value}]`).prop("checked", true)
    })

    $(".form_table input[type=text]").on("change", function() {
        let isMobile = $(this).closest("table").hasClass("on_mobile_t")
        let value = $(this).val()
        let name = $(this).attr("name")
        if(isMobile) {
            $(`.form_table.not_mobile_t input[name=${name}]`).val(value)
        } else {
            $(`.form_table.on_mobile_t input[name=${name}]`).val(value)
        }
    })

    $(document).on("change", ".form_table2 input", function() {
        let value = $(this).val()
        let name = $(this).attr("name")
        let isMobile = $(this).closest("table").hasClass("on_mobile_t")
        let type = $(this).closest("div.reportItem").attr("name")
        if(isMobile) {
            $(`form[name=reportItemForm] div[name=${type}] .not_mobile_t input[name=${name}]`).val(value)
        } else {
            $(`form[name=reportItemForm] div[name=${type}] .on_mobile_t input[name=${name}]`).val(value)
        }
    })

    $("input[name=phoneNum]").on("input", function(e) {
        let value = $(this).val().replace(/[^0-9.]/g, '')

        $(this).val(value)
    })


    $(document).on("input", ".reportItem table[name=PROD_YEAR].form_table2 input[name=offerContent]", function(e) {
        let value = $(this).val().replace(/[^0-9.]/g, '').substring(0, 4)

        $(this).val(value);
    })

    function validationCheck() {
        let resultMap = {
            alertText: '',
            result: true
        }

        let isEmpty = $("#errorReportPop form[name=reportItemForm] .reportItem .form_table2.not_mobile_t input").length === 0
        if(isEmpty) {
            resultMap = { alertText: "신고 내용을 입력해주세요.", result: false }
            return resultMap
d        }

        let phoneNumReg = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/
        let phoneNum = $(".form_table input[name=phoneNum]").val()

        if(!phoneNumReg.test(phoneNum)) {
            resultMap = { alertText: "휴대폰번호 형식이 유효하지 않습니다.", result: false }
            return resultMap
        }

        let emailReg = /^[-_\.]?[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z][-_\.]?)*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
        let emailAddress = $(".form_table input[name=emailAddress]").val()

        if(!emailReg.test(emailAddress)) {
            resultMap = { alertText: "이메일 형식이 유효하지 않습니다.", result: false }
            return resultMap
        }

        // 항목입력 여부
        let reportItemList = $("#errorReportPop form[name=reportItemForm] .reportItem .form_table2.not_mobile_t input").not("[type=hidden]")
        console.log(reportItemList)
        reportItemList.each((index, item) => {
            let value = $(item).val()
            if(!value) {
                resultMap = { alertText: "모든 항목을 입력해주세요.", result: false }
                return resultMap
            }
        })

        // 개인정보 수집동의
        let agreeYn = $("#errorReportPop .form_table input:radio[name=agree]:checked").val()
        if(!agreeYn || agreeYn !== "Y") {
            resultMap = { alertText: "개인정보 수집에 동의해주세요.", result: false }
            return resultMap
        }

        return resultMap;
    }

    function handleChangeCheckBox(param) {
        let typeNm = ''
        switch(param.type) {
            case "TITLE":
                typeNm = `${errorReportParam.rcGbnCode === "0" ? "철" : "건"} 제목`
                break;
            case "PROD_YEAR":
                typeNm = "생산연도"
                break;
            case "PROD_YMD":
                typeNm = "생산등록일자"
                break;
            case "KIKWAN":
                typeNm = "생산기관"
                break;
            case "PAGE":
                typeNm = "페이지 정보"
                break;
            case "ORIGINAL":
                typeNm = "원문"
                break;
            default:
                break;
        }
        param = {...param, typeNm}

        if(!param.checked) {
            $(`form[name=reportItemForm] div[name=${param.type}]`).remove()

            if($("form[name=reportItemForm] .reportItem").length === 0) {
                $("form[name=reportItemForm]").css("display", "none")
            }
            return;
        }

        let addReportItemParam = param

        $.ajax({
          type: "POST",
          url: "/next/newsearch/getErrorReportItemView.do",
          data : addReportItemParam,
          dataType: "html",
          success : function(result) {
            $("form[name=reportItemForm]").append(result)
            $("form[name=reportItemForm]").css("display", "")
          },
          error : function(e, s, error) { console.log(e, error) }
        });
    }

    function fetchArchiveDetail() {
        $.ajax({
          type: "POST",
          url: "/next/newsearch/errorReportPopContent.do",
          data : errorReportParam,
          dataType: "html",
          success : function(result) {
            $("#archive-data").html(result)
          },
          error : function(e, s, error) { console.log(e, error) }
        });
    }

    function handleClosePop() {
        $("archive-data").children().remove()
        $("form[name=reportItemForm] div.reportItem").remove()
        $("form[name=reportItemForm]").css("display", "none")

        $(".form_table.not_mobile_t input[name=agree]").prop("checked", false)
        $(".form_table.on_mobile_t input[name=agree]").prop("checked", false)

        $(".form_table input[name=phoneNum]").each((index, item) => {
            $(item).val("")
        })

        $(".form_table input[name=emailAddress]").each((index, item) => {
            $(item).val("")
        })

        $("#errorReportPop").removeClass("active")
    }
})