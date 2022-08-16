//LiteXLoader Dev Helper
/// <reference path="c:\/Library/JS/Api.js" /> 

ll.registerPlugin(Fast_Find_Special_Biome,[1,0,0])
var Version = "v1.0"
var configVersion = "v1.0"
let DefaultLang = {
    "ConfigReadError":"配置文件读取出错！",
	"Update_config": "检测到配置文件非{configVersion}的版本，已重置配置项",
	"Get_NewVersion": "获取到云端版本{version_lastest}，正在更新...",
	"Get_NewVersion_Error": "获取最新版本异常",
	"UpdatePlugin_Successful": "自动更新成功",
	"UpdatePlugin_Error": "自动更新异常",
	"Debug_Open": "§b[SADCBiomeRadar]您打开了此功能",
	"Debug_Close": "§b[SADCBiomeRadar]您关闭了此功能",
}//配置文件生成
function Read(){
    let create = file.createDir("plugins/SADCbiomeRadar")
    let EXST = file.exists("plugins/SADCBiomeRadar/config.json")
    if(EXST){
        try {
            configtemp = file.readFrom("plugins\\SADCBiomeRadar\\config.json")
            configstand = JSON.parse(configtemp)
        }
        catch(err){
            log(DefaultLang.ConfigReadError)
            setconfig()
            configtemp = file.readFrom("plugins\\SADCBiomeRadar\\config.json")
            configstand = JSON.parse(configtemp)
        }
    }
    else{
        setconfig()
        configtemp = file.readFrom("plugins\\SADCBiomeRadar\\config.json")
        configstand = JSON.parse(configtemp)
    }
}
read()
//重置文件详情
function setcongfig(){
    let datatemp = {"配置文件版本号": configVersion, "自动更新": true}
    let datastand = JSON.stringify(datatemp, null, "\t")
    file.writeTo("plugins/SADCBiomeRadar/config.json",datastand)
}

if (configstand["自动更新"] == true) {
	network.httpGet('https://gitee.com/sheepxray/SADCBiomeRadar/raw/master/version.json', function (st, dat) {
		if (st == 200) {
			let version_lastest = JSON.parse(dat).version
			if (version_lastest != Version) {
				log(lang.Get_NewVersion.replace("{version_lastest}", version_lastest))
				network.httpGet('https://gitee.com/sheepxray/SADCHunter/raw/master/SADCBiomeRadar.lxl.js', function (st2, dat2) {
					if (st2 == 200) {
						let plugin = dat2.replace(/\r/g, '');
						file.writeTo("plugins/SADCHunter.js", plugin)
						log(lang.UpdatePlugin_Successful)
						mc.runcmdEx("lxl reload SADCHunter.js")
					}
					else {
						log(lang.UpdatePlugin_Error)
					}
				})
			}
		}
		else {
			log(lang.Get_NewVersion_Error)
		}
	})
}
//注册指令
mc.newCommand(Radar,判断脚底下是否有指定方块)

mc.listen("onPlayerCmd",(player:player,cmd:Radar)=>Boolean)
