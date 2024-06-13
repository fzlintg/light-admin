export default {
	"schemas": [
		{
			"component": "Modal",
			"label": "对话框",
			"formItem": false,
			"type": "container",
			"componentProps": {
				"title": "对话框",
				"width": 1000,
				"slots": {},
				"onOkButtonClick__func": `  `,
				"onOkButtonClick__params": [
					"{_this,callback}"
				],
				"onCancelButtonClick__func": `  `,
				"onDialogOpened__func": `  `,
				"onDialogOpened__params": [
					"{fData,eData}"
				],
				"onDialogBeforeClose__func": `  `,
				"onDialogBeforeClose__params": [
					"{callback}"
				],
				"maxLength": 100
			},
			"children": [
				{
					"component": "SubForm",
					"label": "单行表单",
					"field": "fields",
					"type": "containerItem",
					"formItem": true,
					"componentProps": {
						"onRowDelete__params": [
							"{idx,data,row}"
						],
						"onRowInsert__params": [
							"{idx,data,row}"
						],
						"onRowAdd__params": [
							"{idx,data,row}"
						],
						"onRowChange__params": [
							"data"
						]
					},
					"children": [
						{
							"component": "Input",
							"label": "字段",
							"field": "field",
							"colProps": {
								"span": 24
							},
							"componentProps": {
								"type": "text",
								"defaultValue": "",
								"onChange__func": `  `,
								"disabled": true
							},
							"_type": "custom",
							"width": "200px",
							"itemProps": {
								"labelCol": {},
								"wrapperCol": {}
							}
						},
						{
							"component": "Input",
							"label": "中文名称",
							"field": "title",
							"colProps": {
								"span": 24
							},
							"componentProps": {
								"type": "text",
								"defaultValue": "",
								"onChange__func": `  `,
								"disabled": false
							},
							"_type": "custom",
							"width": "200px",
							"itemProps": {
								"labelCol": {},
								"wrapperCol": {}
							}
						}
					],
					"options": {
						"gutter": 0
					},
					"_type": "custom",
					"width": "200px",
					"colProps": {
						"span": 24
					},
					"itemProps": {
						"labelCol": {},
						"wrapperCol": {}
					}
				}
			],
			"_type": "custom",
			"width": "200px",
			"colProps": {
				"span": 24
			},
			"field": "modal",
			"itemProps": {
				"labelCol": {},
				"wrapperCol": {}
			}
		}
	],
	"layout": "horizontal",
	"labelLayout": "flex",
	"labelWidth": 100,
	"labelCol": {},
	"wrapperCol": {}
}