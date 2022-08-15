//LiteXLoader Dev Helper
/// <reference path="c:\/Library/JS/Api.js" /> 

let DefaultLang = {
	"Get_Money": "§2击杀奖励§6{num}§2{money_name}",
	"Lang_Error": "读取语言文件出错！",
	"Cannot_Get_Money": "§b您在§e1小时§b内无法再从此生物中获取{money_name}!",
	"Debug_Killed": "§b[SADCHunter]您杀死了§e{mob_name}",
	"Config_Error": "您的config.json配置异常，已重置",
	"Config_Error_2": "您的mobs.json配置异常，已重置",
	"Update_config": "检测到配置文件非{configVersion}的版本，已重置配置项",
	"Get_NewVersion": "获取到云端版本{version_lastest}，正在更新...",
	"Get_NewVersion_Error": "获取最新版本异常",
	"UpdatePlugin_Successful": "自动更新成功",
	"UpdatePlugin_Error": "自动更新异常",
	"DegbugCommandText": "获取杀死怪物的标准类型名",
	"Debug_Open": "§b[SADCHunter]您打开了此功能",
	"Debug_Close": "§b[SADCHunter]您关闭了此功能",
	"Debug_Help": "§b[SADCHunter]提示\n/getmobid true-打开获取怪物类型名功能\n/getmobid false-关闭获取怪物类型名功能"
}







if (traab["自动更新"] == true) {
	network.httpGet('https://gitee.com/sheepxray/SADCHunter/raw/master/version.json', function (st, dat) {
		if (st == 200) {
			let version_lastest = JSON.parse(dat).version
			if (version_lastest != Version) {
				log(lang.Get_NewVersion.replace("{version_lastest}", version_lastest))
				network.httpGet('https://gitee.com/sheepxray/SADCHunter/raw/master/SADCHunter.lxl.js', function (st2, dat2) {
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