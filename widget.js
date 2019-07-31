function mywidget(param) {
    var mywidget = {
        init: function () {
            this.createElement();
            this.render();
            this.bindevents();
        },
        createElement: function () {
            this.root = document.getElementById("widget-root");

            this.widgetContainer = document.createElement("div");
            this.widgetContainer.id = "my-widget";

            this.widgetHeader = document.createElement("div");
            this.widgetHeader.id = "widget-header";

            this.widgetTitle = document.createElement("h4");
            this.widgetTitle.id = "widget-title";
            this.widgetTitleText = document.createTextNode("DO YOU WANT A CALLBACK?")

            this.widgetTitleSpan = document.createElement("span");
            this.widgetTitleSpan.id = "widget-title-span-text";

            this.widgetTitleDesc = document.createElement("span");
            this.widgetTitleDesc.id = "widget-title-desc";
            this.widgetTitleDescText = document.createTextNode("Please give us your details and we will get back to you");

            this.widgetBody = document.createElement("div");
            this.widgetBody.id = "widget-body";

            this.widgetForm = document.createElement("form");
            this.widgetForm.id = "widget-form"

            this.widgetInputName = document.createElement("input");
            this.widgetInputName.id = "widget-input-name";
            this.widgetInputName.type = "text";
            this.widgetInputName.placeholder = "Your Name";

            this.widgetInputEmail = document.createElement("input");
            this.widgetInputEmail.id = "widget-input-email";
            this.widgetInputEmail.type = "email";
            this.widgetInputEmail.placeholder = "Email";

            this.widgetInputPhone = document.createElement("input");
            this.widgetInputPhone.id = "widget-input-phone";
            this.widgetInputPhone.type = "text";
            this.widgetInputPhone.placeholder = "ex: +62 813-5311-2222";

            this.widgetSubmitBtn = document.createElement("button");
            this.widgetSubmitBtn.id = "widget-btn-submit";
            this.widgetSubmitBtn.type = "button";
            this.widgetSubmitBtn.innerHTML = "Call Now";

            this.widgetCloseBtn = document.createElement("button");
            this.widgetCloseBtn.id = "widget-btn-close";
            this.widgetCloseBtn.innerHTML = "X";
            this.widgetCloseBtn.style.float = "right";

            this.widgetMinimizeContainer = document.createElement("div");
            this.widgetMinimizeContainer.id = "my-widget-minimize";

            this.widgetMinimizeBody = document.createElement("div");
            this.widgetMinimizeBody.id = "my-widget-minimize-body";

            this.widgetMinimizeTbl = document.createElement("table")
            this.widgetMinimizeTblRow = document.createElement("tr")
            this.widgetMinimizeTblData = document.createElement("td")
            this.widgetMinimizeTblData2 = document.createElement("td")

            this.widgetMinimizeImg = document.createElement("img");
            this.widgetMinimizeImg.id = "my-widget-minimize-img";
            this.widgetMinimizeImg.src = "minimized.png";
            this.widgetMinimizeImg.style.display = "inline-block";
            this.widgetMinimizeImg.style.width = "50px";

            this.widgetMinimizeText = document.createElement("span");
            this.widgetMinimizeText.id = "my-widget-minimize-text";
            this.widgetMinimizeText.style.display = "inline-block";
            this.widgetMinimizeText.innerHTML = "Click here to get a call-back";
        },
        render: function () {
            this.widgetContainer.appendChild(this.widgetHeader);
            this.widgetContainer.appendChild(this.widgetBody);

            this.widgetHeader.appendChild(this.widgetCloseBtn);
            this.widgetHeader.appendChild(this.widgetTitle);
            this.widgetHeader.appendChild(this.widgetTitleDesc)
            this.widgetTitle.appendChild(this.widgetTitleText);
            this.widgetTitleDesc.appendChild(this.widgetTitleDescText);

            this.widgetBody.appendChild(this.widgetForm);
            if (param.name == 1)
                this.widgetForm.appendChild(this.widgetInputName);
            if (param.email == 1)
                this.widgetForm.appendChild(this.widgetInputEmail);
            if (param.phone == 1)
                this.widgetForm.appendChild(this.widgetInputPhone);
            this.widgetForm.appendChild(this.widgetSubmitBtn);

            this.root.appendChild(this.widgetContainer);

            if (param.vertical == "top") {
                this.root.style.top = "10px";
            }
            else if (param.vertical == "bottom") {
                this.root.style.bottom = "10px";
            }
            if (param.horizontal == "left") {
                this.root.style.left = "10px";
            }
            else if (param.horizontal == "right") {
                this.root.style.right = "10px";
            }
            this.root.style.position = "absolute";
        },
        renderminimize: function () {
            this.widgetMinimizeContainer.appendChild(this.widgetMinimizeBody);
            this.widgetMinimizeBody.appendChild(this.widgetMinimizeTbl);
            this.widgetMinimizeTbl.appendChild(this.widgetMinimizeTblRow);
            this.widgetMinimizeTblRow.appendChild(this.widgetMinimizeTblData);
            this.widgetMinimizeTblData.appendChild(this.widgetMinimizeImg);
            this.widgetMinimizeTblRow.appendChild(this.widgetMinimizeTblData2);
            this.widgetMinimizeTblData2.appendChild(this.widgetMinimizeText);
            this.root.appendChild(this.widgetMinimizeContainer);
        },
        bindevents: function () {
            this.widgetSubmitBtn.onclick = this.submitform.bind();
            this.widgetCloseBtn.onclick = this.collapsingbox.bind(this);
            this.widgetMinimizeContainer.onclick = this.showingbox.bind(this);
        },
        submitform: function () {
            var nameValue = "", emailValue = "", phoneValue = "";

            if (param.name != "")
                nameValue = document.getElementById("widget-input-name").value;
            if (param.email != "")
                emailValue = document.getElementById("widget-input-email").value;
            if (param.phone != "")
                phoneValue = document.getElementById("widget-input-phone").value;

            if (param.name == false && param.email == false && param.phone == false) {
                alert("There's no data to post")
                return;
            }

            if (param.name == true && nameValue == "") {
                alert("Name cannot be empty")
                return;
            }
            if (param.email == true && emailValue == "") {
                alert("Email cannot be empty")
                return;
            }
            if (param.phone == true && phoneValue == "") {
                alert("Phone cannot be empty")
                return;
            }

            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://apilayer.net/api/validate?access_key=62149f1714a984404ddf0ca22422e990&number=" + phoneValue, true);
            xhr.onload = function () {
                if (this.status === 200) {
                    if (JSON.parse(this.responseText).valid == true) {
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function () {
                            document.getElementById("spinner").style.display = "block";
                            document.getElementById("widget-btn-submit").disabled = "disabled";
                            document.getElementById("widget-btn-submit").classList.add("btn-disabled");

                            if (this.readyState == 4 && this.status == 200) {
                                setTimeout(function () {
                                    document.getElementById("hereisthetext").innerHTML = this.responseText;
                                    document.getElementById("spinner").style.display = "none";

                                    document.getElementById("widget-input-name").value = "";
                                    document.getElementById("widget-input-email").value = "";
                                    document.getElementById("widget-input-phone").value = "";

                                    document.getElementById("widget-btn-submit").disabled = false;
                                    document.getElementById("widget-btn-submit").classList.remove("btn-disabled");
                                }.bind(this), 3000);
                            }
                        };
                        xhttp.open("GET", "test.txt", true);
                        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhttp.send();
                    }
                    else {
                        alert("Your phone number is not recognized!")
                    }
                }
            }
            xhr.send();

        },
        collapsingbox: function () {
            this.root.removeChild(this.widgetContainer);
            this.renderminimize();
        },
        showingbox: function () {
            this.root.removeChild(this.widgetMinimizeContainer);
            this.render();
        }
    }

    mywidget.init();
}