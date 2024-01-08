const { axiosInstance, shopeeCreatorApi } = require("./api");
const Table = require("cli-table");
const axios = require("axios");
const fs = require("fs");

class Action {
	constructor() {
		this.axiosInstance = axiosInstance;
		this.shopeeCreatorApi = shopeeCreatorApi;
		this.session = "";
	}

	get sessionID() {
		return this.session;
	}

	set sessionID(session) {
		this.session = session;
	}

	async getSession() {
		return await shopeeCreatorApi
			.get(
				"https://creator.shopee.co.id/supply/api/lm/sellercenter/realtime/sessionList?page=1&pageSize=10&name="
			)
			.then((response) => {
				return response.data.data.list[0].sessionId;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getVochers = () => {
		return axiosInstance
			.get(`/session/${this.session}/voucher?scene=0`)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return null;
			});
	};

	checkAccountInfo = async () => {
		return await shopeeCreatorApi
			.get("https://creator.shopee.co.id/supply/api/lm/sellercenter/userInfo")
			.then((response) => {
				return response.data.data;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	pinItem = (data) => {
		// fetch("https://live.shopee.co.id/webapi/v1/session/54977867/show", {
		// 	headers: {
		// 		accept: "application/json, text/plain, */*",
		// 		"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
		// 		"client-info": "platform=9",
		// 		"content-type": "application/json",
		// 		"sec-ch-ua":
		// 			'"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
		// 		"sec-ch-ua-mobile": "?0",
		// 		"sec-ch-ua-platform": '"Windows"',
		// 		"sec-fetch-dest": "empty",
		// 		"sec-fetch-mode": "cors",
		// 		"sec-fetch-site": "same-origin",
		// 		"x-livestreaming-auth":
		// 			"ls_web_v1_30001_1704518821_sghjtupc1voksgy72816ed6ekw95cj6tchhi|Tswi/f9XFzkeo64zSVNz+kS/rZs2vn2VQD4Dzn1yozU=",
		// 		"x-ls-sz-token":
		// 			"pKUz6dgssTD6+3i3Oucx/g==|33LLX87BU2NpLXdwPKZffNMHR77erdizDacB87BBOeKgo5ksTLwPpJv1KFDuVTLGbjY5JqqZZCk=|QN4RLlGE+p3KVEMn|08|3",
		// 		cookie:
		// 			"SPC_F=YVOjfdyj1MHhVv145n2bTpW7dYYWa2Bq; REC_T_ID=f07efde5-4ed3-11ee-8ee8-b47af1b53120; _gcl_au=1.1.922170559.1704175958; _med=refer; _gid=GA1.3.1080167558.1704175965; SPC_CLIENTID=WVZPamZkeWoxTUhoyduvzjqoiduvvwgj; SPC_EC=.SldjNk4zaklRcUw1WVNMTNjX4lXVNAI6o3dYAn+f+FxtPnvFW4KVhn7RyKwbqGHLIVzhA2zw38tTTsm79aFk8+kQxRwySzzw9hrYGAyi91rINqM8X3wG9++DHO20aEKrInOhtiKGg5HpvXuRGl2/QH3oVVRcTYWfadlkU7KWDAVp6x/uOknx7IzFhtLzhcVefDs7to++EqO0t+UMYfpHFg==; SPC_ST=.SldjNk4zaklRcUw1WVNMTNjX4lXVNAI6o3dYAn+f+FxtPnvFW4KVhn7RyKwbqGHLIVzhA2zw38tTTsm79aFk8+kQxRwySzzw9hrYGAyi91rINqM8X3wG9++DHO20aEKrInOhtiKGg5HpvXuRGl2/QH3oVVRcTYWfadlkU7KWDAVp6x/uOknx7IzFhtLzhcVefDs7to++EqO0t+UMYfpHFg==; SPC_U=15950212; SPC_R_T_ID=Q1S/nKzrw5/odK+olBA9rGFdX0MDeuT4Vz08LXzfRad/GYMD8xBBDw0s5zFGGCkk3fHRqT+p9+g8zFESyG1dff+56Z4MuBbb6JODTu0xB3tbuMRqcAwhHRa68XfDYO6ho33csJEAwqvBeOdJ5aAlxb7VEnWj3a5R9MrK2w3PIb4=; SPC_R_T_IV=TUR0aExIVXUwa2Y5UjJXNA==; SPC_T_ID=Q1S/nKzrw5/odK+olBA9rGFdX0MDeuT4Vz08LXzfRad/GYMD8xBBDw0s5zFGGCkk3fHRqT+p9+g8zFESyG1dff+56Z4MuBbb6JODTu0xB3tbuMRqcAwhHRa68XfDYO6ho33csJEAwqvBeOdJ5aAlxb7VEnWj3a5R9MrK2w3PIb4=; SPC_T_IV=TUR0aExIVXUwa2Y5UjJXNA==; SPC_SC_TK=a064e2e54ed87e456d9ecbbb8932fdab; SPC_SC_UD=15950212; SPC_STK=syobANNV5EdYln+prv0PhZp4G6OIgwg4eOIjky+q3M5a7muiMviuU9+5xJFIo/f/AVR5JFb2TBEVIP7V//uTiMSSdA7UrfAeW9ZndC3P7jxXfZNFrIfnrxTQkM9aXyc/LPlPG0rzMZ3HLc4kdWZrtKVvZUO1oL7P1vyqKUYyslQ=; SC_DFP=TooqubJaVtuJCdkKpeaaVjTRgZrBRwiQ; _ga_QMX630BLLS=GS1.1.1704176015.1.0.1704176041.34.0.0; _med=refer; LIVE_STREAMING_UUID_KEY=z3anGzlrYLos7DIOsWlA7KxCTmQT07y2; SPC_SI=08qTZQAAAABDTk10Y2FvMhtmEgAAAAAAUnhHcVlrWGk=; SL_G_WPT_TO=en; _QPWSDCXHZQA=e6e7e829-d9fe-4c2c-f7f9-c8874c12b3d0; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; shopee_webUnique_ccd=pKUz6dgssTD6%2B3i3Oucx%2Fg%3D%3D%7C33LLX87BU2NpLXdwPKZffNMHR77erdizDacB87BBOeKgo5ksTLwPpJv1KFDuVTLGbjY5JqqZZCk%3D%7CQN4RLlGE%2Bp3KVEMn%7C08%7C3; _ga=GA1.3.2115113650.1704175962; _ga_SW6D8G0HXK=GS1.1.1704491374.23.1.1704491516.60.0.0",
		// 		Referer: "https://live.shopee.co.id/pc/live?session=54977867",
		// 		"Referrer-Policy": "strict-origin-when-cross-origin",
		// 	},
		// 	body: '{"item":"{\\"item_id\\":6575569319,\\"shop_id\\":8623912,\\"name\\":\\"Rok Plisket PREMIUM MAYUNG By AURA Jersey Hyget Lipatan Besar Termurah Bawahan Panjang Best Seller\\",\\"image\\":\\"1087cd8eef41cecc862b3d46a964c489\\",\\"currency\\":\\"IDR\\",\\"price\\":\\"15500\\",\\"price_before_discount\\":\\"15500\\",\\"price_min\\":\\"15500\\",\\"price_min_before_discount\\":\\"15500\\",\\"price_max\\":\\"15500\\",\\"price_max_before_discount\\":\\"15500\\",\\"id\\":38,\\"ask_time\\":1704507979728,\\"ask_user_id\\":1117441812,\\"ask_username\\":\\"nyxetchsidyeys\\",\\"ask_count\\":21,\\"track_link\\":\\"https://shope.ee/2VSQQI7NZE?channel_code=Shopeelive\\",\\"track_data\\":\\"{\\\\\\"af_click_lookback\\\\\\":\\\\\\"7d\\\\\\",\\\\\\"af_reengagement_window\\\\\\":\\\\\\"7d\\\\\\",\\\\\\"af_siteid\\\\\\":\\\\\\"an_11302120099\\\\\\",\\\\\\"af_sub_siteid\\\\\\":\\\\\\"----\\\\\\",\\\\\\"af_viewthrough_lookback\\\\\\":\\\\\\"1d\\\\\\",\\\\\\"c\\\\\\":\\\\\\"-\\\\\\",\\\\\\"is_retargeting\\\\\\":\\\\\\"true\\\\\\",\\\\\\"item_id\\\\\\":\\\\\\"6575569319\\\\\\",\\\\\\"pid\\\\\\":\\\\\\"affiliates\\\\\\",\\\\\\"shop_id\\\\\\":\\\\\\"8623912\\\\\\",\\\\\\"utm_campaign\\\\\\":\\\\\\"-\\\\\\",\\\\\\"utm_content\\\\\\":\\\\\\"Livestreaming\\\\\\",\\\\\\"utm_medium\\\\\\":\\\\\\"affiliates\\\\\\",\\\\\\"utm_source\\\\\\":\\\\\\"an_11302120099\\\\\\"}\\",\\"label\\":{\\"popularity_labels\\":[{\\"type\\":1,\\"type_name\\":\\"star_rate\\",\\"star_count\\":20747}]},\\"sp_flag\\":false,\\"sp_end_time\\":0,\\"item_promotion\\":{\\"display_promotions\\":[{\\"promotion_id\\":192390344298496,\\"promotion_type\\":202,\\"stock\\":12010,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"start_time\\":1704128400,\\"end_time\\":1704646799,\\"model_ids\\":[63287239340,63287239342,63287239343,85482011810,63287239338,63287239345,63287239336,193751445987,63287239333,63287239337,63287239350,63287239346,177945050214,63287239348,63287239335,63287239341,63287239344,63287239331,63287239349,107054028644,63287239332,63287239347,63287239334],\\"models\\":[{\\"model_id\\":63287239340,\\"stock\\":1175,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239342,\\"stock\\":4784,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239343,\\"stock\\":898,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":85482011810,\\"stock\\":434,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239338,\\"stock\\":627,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239345,\\"stock\\":685,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239336,\\"stock\\":428,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":193751445987,\\"stock\\":437,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239333,\\"stock\\":336,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239337,\\"stock\\":248,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239350,\\"stock\\":0,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239346,\\"stock\\":103,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":177945050214,\\"stock\\":91,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239348,\\"stock\\":0,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239335,\\"stock\\":152,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239341,\\"stock\\":58,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239344,\\"stock\\":159,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239331,\\"stock\\":16,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239349,\\"stock\\":15,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":107054028644,\\"stock\\":368,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239332,\\"stock\\":228,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239347,\\"stock\\":415,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239334,\\"stock\\":353,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0}]},{\\"promotion_id\\":0,\\"promotion_type\\":0,\\"stock\\":0,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"start_time\\":0,\\"end_time\\":0,\\"model_ids\\":[85109788814,193751445986],\\"models\\":[{\\"model_id\\":85109788814,\\"stock\\":0,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":193751445986,\\"stock\\":0,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0}]}],\\"ongoing_promotions\\":[{\\"promotion_id\\":758736350237584,\\"promotion_type\\":301,\\"stock\\":12010,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"start_time\\":1702788660,\\"end_time\\":1718297940,\\"model_ids\\":[63287239340,63287239342,63287239343,85482011810,63287239338,63287239345,63287239336,193751445987,63287239333,63287239337,63287239350,63287239346,177945050214,63287239348,63287239335,63287239341,63287239344,63287239331,63287239349,107054028644,63287239332,63287239347,63287239334],\\"models\\":[{\\"model_id\\":63287239340,\\"stock\\":1175,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239342,\\"stock\\":4784,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239343,\\"stock\\":898,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":85482011810,\\"stock\\":434,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239338,\\"stock\\":627,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239345,\\"stock\\":685,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239336,\\"stock\\":428,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":193751445987,\\"stock\\":437,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239333,\\"stock\\":336,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239337,\\"stock\\":248,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239350,\\"stock\\":0,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239346,\\"stock\\":103,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":177945050214,\\"stock\\":91,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239348,\\"stock\\":0,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239335,\\"stock\\":152,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239341,\\"stock\\":58,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239344,\\"stock\\":159,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239331,\\"stock\\":16,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239349,\\"stock\\":15,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":107054028644,\\"stock\\":368,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239332,\\"stock\\":228,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239347,\\"stock\\":415,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239334,\\"stock\\":353,\\"price\\":\\"16250\\",\\"display_price\\":\\"16250\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0}]},{\\"promotion_id\\":0,\\"promotion_type\\":0,\\"stock\\":12010,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"start_time\\":0,\\"end_time\\":0,\\"model_ids\\":[63287239340,63287239342,63287239343,85482011810,63287239338,63287239345,63287239336,193751445987,63287239333,63287239337,63287239350,63287239346,177945050214,63287239348,63287239335,63287239341,63287239344,63287239331,85109788814,63287239349,107054028644,63287239332,193751445986,63287239347,63287239334],\\"models\\":[{\\"model_id\\":63287239340,\\"stock\\":1175,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239342,\\"stock\\":4784,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239343,\\"stock\\":898,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":85482011810,\\"stock\\":434,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239338,\\"stock\\":627,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239345,\\"stock\\":685,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239336,\\"stock\\":428,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":193751445987,\\"stock\\":437,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239333,\\"stock\\":336,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239337,\\"stock\\":248,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239350,\\"stock\\":0,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239346,\\"stock\\":103,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":177945050214,\\"stock\\":91,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239348,\\"stock\\":0,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239335,\\"stock\\":152,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239341,\\"stock\\":58,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239344,\\"stock\\":159,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239331,\\"stock\\":16,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":85109788814,\\"stock\\":0,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239349,\\"stock\\":15,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":107054028644,\\"stock\\":368,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239332,\\"stock\\":228,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":193751445986,\\"stock\\":0,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239347,\\"stock\\":415,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239334,\\"stock\\":353,\\"price\\":\\"50000\\",\\"display_price\\":\\"50000\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0}]},{\\"promotion_id\\":192390344298496,\\"promotion_type\\":202,\\"stock\\":12010,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"start_time\\":1704128400,\\"end_time\\":1704646799,\\"model_ids\\":[63287239340,63287239342,63287239343,85482011810,63287239338,63287239345,63287239336,193751445987,63287239333,63287239337,63287239350,63287239346,177945050214,63287239348,63287239335,63287239341,63287239344,63287239331,63287239349,107054028644,63287239332,63287239347,63287239334],\\"models\\":[{\\"model_id\\":63287239340,\\"stock\\":1175,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239342,\\"stock\\":4784,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239343,\\"stock\\":898,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":85482011810,\\"stock\\":434,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239338,\\"stock\\":627,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239345,\\"stock\\":685,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239336,\\"stock\\":428,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":193751445987,\\"stock\\":437,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239333,\\"stock\\":336,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239337,\\"stock\\":248,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239350,\\"stock\\":0,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239346,\\"stock\\":103,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":177945050214,\\"stock\\":91,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239348,\\"stock\\":0,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239335,\\"stock\\":152,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239341,\\"stock\\":58,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239344,\\"stock\\":159,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239331,\\"stock\\":16,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239349,\\"stock\\":15,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":107054028644,\\"stock\\":368,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239332,\\"stock\\":228,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239347,\\"stock\\":415,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0},{\\"model_id\\":63287239334,\\"stock\\":353,\\"price\\":\\"15500\\",\\"display_price\\":\\"15500\\",\\"has_timeslot\\":false,\\"psp_reverse_stock\\":0}]}]}}"}',
		// 	method: "POST",
		// });
		return axiosInstance
			.post(`/session/${this.session}/show`, data)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	getRequestedItems = () => {
		return axiosInstance
			.get(`/session/${this.session}/asked_items?ctx_id=&offset=0&limit=100`)
			.then((response) => {
				return response.data.data.items;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	showVoucher = (data) => {
		return axiosInstance
			.post(`/session/${this.session}/voucher/show`, data)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	FakeVOC = (data) => {
		return axiosInstance
			.post(`auction/session/${this.session}/start`, data)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	getSales = () => {
		return shopeeCreatorApi
			.get(
				`https://creator.shopee.co.id/supply/api/lm/sellercenter/realtime/dashboard/productList?sessionId=${this.session}&productName=&productListTimeRange=0&productListOrderBy=productClicks&sort=desc&page=1&pageSize=100`
			)
			.then(async (response) => {
				let data = response.data.data.list.filter(
					(product) => product.itemSold > 0
				);

				data.sort((a, b) => b.revenue - a.revenue);

				var table = new Table({
					head: ["ID", "Product Name", "Total Sold", "Total Revenue"],
					colWidths: [15, 30, 10, 20],
				});

				table.push(
					...data.map((product) => [
						product.itemId,
						product.title,
						product.itemSold,
						new Intl.NumberFormat("id-ID", {
							style: "currency",
							currency: "IDR",
						}).format(product.revenue),
					])
				);

				console.log(table.toString());

				var totalSold = data.reduce(
					(total, product) => total + product.itemSold,
					0
				);
				var totalRevenue = data.reduce(
					(total, product) => total + product.revenue,
					0
				);

				console.log(`Total Sold: ${totalSold}`);
				console.log(
					`Total Revenue: ${new Intl.NumberFormat("id-ID", {
						style: "currency",
						currency: "IDR",
					}).format(totalRevenue)}`
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

module.exports = Action;
