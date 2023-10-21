// 获取ip
function getIpInfo() {
  var fetchUrl = "https://api.qjqq.cn/api/Local"
  fetch(fetchUrl).then(res => res.json()).then(json => {
    document.getElementById("userAgentIp").innerHTML = json.ip;
    document.getElementById("userAgentCountry").innerHTML = json.data.country;
    document.getElementById("userAgentRegion").innerHTML = json.data.prov;
    document.getElementById("userAgentCity").innerHTML = json.data.city;
    document.getElementById("userAgentIsp").innerHTML = json.data.isp;
    var uaInfo = navigator.userAgent;
    document.getElementById("userAgentDevice").innerHTML = uaInfo;
  }
  )
}

getIpInfo()