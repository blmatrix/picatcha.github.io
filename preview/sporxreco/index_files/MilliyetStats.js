var MilliyetStatsClass = function () {
    this.FormName = "UrlTracingFrm";
    this.Form = document.createElement("form");
    this.FormExist = false;



    this.Form.method = "GET";
    this.Form.id = this.FormName;
    this.Form.name = this.FormName;

    this.AppendUrl();
    this.AppendHcase();
    this.AppendProperty();
}

MilliyetStatsClass.prototype.StatsRequest = function (sender) {
    return this.StartStats(sender, "StatsRequest", arguments);
}
MilliyetStatsClass.prototype.StatsRegion = function (sender) {
    return this.StartStats(sender, "StatsSource", arguments);
}

MilliyetStatsClass.prototype.StartStats = function (sender, hCase, arg) {
	//return false;
    if (!this.FormExist) {
        document.body.appendChild(this.Form);
        this.FormExist = true;
    }

    this.Form.action = "http://siyaset.milliyet.com.tr/D/StatsHandler/StatsRequestHandler.ashx";
    this.Form.target = sender.target;
    $("#MilliyetStats_hCase").val(hCase);
    $("#MilliyetStats_Url").val(sender.href);

    if (arg.length > 1) {
        for (i = 1; i < arg.length; i++) {
            $("#MilliyetStats_Properties").val(arg[i] + "|");
        }
    }
    this.Form.submit();
    return false;
}




MilliyetStatsClass.prototype.AppendHcase = function () {
    var Hcase = document.createElement("input")
    Hcase.type = "hidden";
    Hcase.id = "MilliyetStats_hCase";
    Hcase.name = "hCase"
    this.Form.appendChild(Hcase);
}
MilliyetStatsClass.prototype.AppendUrl = function()
{
     var UrlText = document.createElement("input")
        UrlText.type = "hidden";
        UrlText.id = "MilliyetStats_Url";
        UrlText.name = "Url";
      this.Form.appendChild(UrlText);
  }
  MilliyetStatsClass.prototype.AppendProperty = function () {
      var PropText = document.createElement("input")
      PropText.type = "hidden";
      PropText.id = "MilliyetStats_Properties";
      PropText.name = "Properties";
      this.Form.appendChild(PropText);
  }

var MilliyetStats = new MilliyetStatsClass();