{
	"info": {
		"_postman_id": "e423c742-0309-4236-ac99-ad13619814e0",
		"name": "astro namo",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "30735315"
	},
	"item": [
		{
			"name": "New Request",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		},
		{
			"name": "check api",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "customers-signup",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "customerName",
							"value": "Prachi Singh",
							"type": "text"
						},
						{
							"key": "phoneNumber",
							"value": "8724354888",
							"type": "text"
						},
						{
							"key": "gender",
							"value": "female",
							"type": "text"
						},
						{
							"key": "city",
							"value": "Ghaziabad",
							"type": "text"
						},
						{
							"key": "state",
							"value": "UP",
							"type": "text"
						},
						{
							"key": "zipCode",
							"value": "201005",
							"type": "text"
						},
						{
							"key": "dateOfBirth",
							"value": "23-02-1996",
							"type": "text"
						},
						{
							"key": "timeOfBirth",
							"value": "22:22:22",
							"type": "text"
						},
						{
							"key": "placeOfBirth",
							"value": "rajasthan",
							"type": "text"
						},
						{
							"key": "image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/home-screen.png"
						},
						{
							"key": "country",
							"value": "India",
							"type": "text"
						},
						{
							"key": "wallet",
							"value": "1000",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:3000/customers/customer-signup",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"customers",
						"customer-signup"
					]
				}
			},
			"response": []
		},
		{
			"name": "customers-profile-update",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "customerName",
							"value": "Prachi Singh",
							"type": "text"
						},
						{
							"key": "phoneNumber",
							"value": "8724354866",
							"type": "text"
						},
						{
							"key": "gender",
							"value": "female",
							"type": "text"
						},
						{
							"key": "city",
							"value": "Ghaziabad",
							"type": "text"
						},
						{
							"key": "state",
							"value": "UP",
							"type": "text"
						},
						{
							"key": "zipCode",
							"value": "201005",
							"type": "text"
						},
						{
							"key": "dateOfBirth",
							"value": "23-02-1996",
							"type": "text"
						},
						{
							"key": "timeOfBirth",
							"value": "22:22:22",
							"type": "text"
						},
						{
							"key": "placeOfBirth",
							"value": "rajasthan",
							"type": "text"
						},
						{
							"key": "image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/home-screen.png"
						},
						{
							"key": "country",
							"value": "India",
							"type": "text"
						},
						{
							"key": "wallet",
							"value": "1000",
							"type": "text"
						},
						{
							"key": "customerId",
							"value": "",
							"type": "text",
							"disabled": true
						}
					]
				},
				"url": {
					"raw": "http://localhost:3000/customers/update-customer-profile/656080f1222afe694e13cc4f",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"customers",
						"update-customer-profile",
						"656080f1222afe694e13cc4f"
					]
				}
			},
			"response": []
		},
		{
			"name": "customers-login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"phoneNumber\":\"786459863\",\r\n    \"fcmToken\":\"yhgyt67665\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/customers/customer-login",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"customers",
						"customer-login"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-add-skill",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "skill",
							"value": " Skill",
							"type": "text"
						},
						{
							"key": "image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/happy-eid.jpg"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/admin/skill",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"skill"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-get-skill",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-skill",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-skill"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-update-skill",
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "skill",
						"value": "marriage",
						"type": "text",
						"disabled": true
					},
					{
						"key": "image",
						"value": "",
						"type": "text",
						"disabled": true
					}
				],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "skill",
							"value": "skill1",
							"type": "text"
						},
						{
							"key": "image",
							"type": "file",
							"src": "/C:/Users/Dell/Downloads/5-mukhiface-rudraksha-pendant.jpg"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-skill/655efeae2b5be2ea02e013fc",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-skill",
						"655efeae2b5be2ea02e013fc"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-delete-skill",
			"request": {
				"method": "POST",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/delete-skill",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"delete-skill"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-add-sub-skill",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"skillId\":\"655b06a02266cca032fd8460\",\r\n    \"subskill\":\"abcd\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/sub-skill",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"sub-skill"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-update-sub-skill",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"subSkillId\":\"655c5cd2a3b65ce4ec65e806\", \r\n    \"subskill\":\"new subskill 2\", \r\n    \"newSkillId\":\"6565711a3fd234f46a3eadd5\" \r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-sub-skill",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-sub-skill"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-delete-sub-skill",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"subSkillId\":\"\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/delete-sub-skill",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"delete-sub-skill"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-add-remedy",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "remedy",
							"value": "astrologey",
							"type": "text"
						},
						{
							"key": "remedyIcon",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg"
						},
						{
							"key": "description",
							"value": "jdjkdsjds dndjkjd jkkndjsnd kjndjkns ",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-remedy",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-remedy"
					]
				}
			},
			"response": []
		},
		{
			"name": " /admin-view-remedy",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/view-remedy",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"view-remedy"
					]
				}
			},
			"response": []
		},
		{
			"name": " /admin-update-remedy",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "RemedyId",
							"value": "65673608a7df5e2b7f36caa9",
							"type": "text"
						},
						{
							"key": "remedy",
							"value": "astrologey",
							"type": "text"
						},
						{
							"key": "remedyIcon",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/home-screen.png"
						},
						{
							"key": "description",
							"value": "hdjjsdk iundisjkf iujndiwe ijwfenoiks ijewnuds",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-remedy",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-remedy"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-delete-remedy",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"remedyId\":\"\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/delete-remedy",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"delete-remedy"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-update-gift",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"giftId\":\"\"\r\n    \"gift\":\"gift 2\",\r\n    \"giftIcon\":\"hhhhhhhhh\",\r\n    \"amount\":\"555\", \r\n\"description\":\"iushdhfjkf jfnf lkkf dmfd ius jsjdks fjsdkf ijedks iknsdlk m\" \r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-gift",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-gift"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-add-gift",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"gift\":\"gift 2\",\r\n    \"giftIcon\":\"gifthdsbfjsdkj\",\r\n    \"amount\":\"757\", \r\n\"description\":\"iushdius jsjdks fjsdkf ijedks iknsdlk m\" \r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-gift",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-gift"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-get-sub-skill",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-sub-skill",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-sub-skill"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-add-review",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"customerId\":\"6567106d27854438e8f91aef\",\r\n    \"astrologerId\":\"6568161223de3221fb6f7139\",\r\n    \"ratings\":\"4\",\r\n    \"comments\":\"hdjshfdbfhdsfbhdfbsdh\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-review",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-review"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-get-all-review",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-all-review",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-all-review"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-update-review",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"customerId\":\"6567106d27854438e8f91aef\",\r\n    \"astrologerId\":\"6568161223de3221fb6f7139\",\r\n    \"ratings\":\"4\",\r\n    \"comments\":\"nnnn xx ccc vvvv z\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-review/65699b27e5a8c98fd8bd9b2c",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-review",
						"65699b27e5a8c98fd8bd9b2c"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-delete-review",
			"request": {
				"method": "POST",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/delete-review",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"delete-review"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-add-faq",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"question\":\"hjjnnjdjnasnj\",\r\n    \"description\":\"ujejsj ijends oieoiwoinniew n oejwo ioeijrejjr jrjerjk\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-faq",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-faq"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-get-all-faq",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-all-faq",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-all-faq"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-update-faq",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-faq",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-faq"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-delete-faq",
			"request": {
				"method": "POST",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/delete-faq",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"delete-faq"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-add-terms-condition",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"description\":\"hdsdbjshdbjksjks\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-terms-condition",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-terms-condition"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-add-privacy-policy",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"description\":\"hudsi jnjknkj jjkjk jkljkl jkncs\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-privacy-policy",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-privacy-policy"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-add-video-url",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"videoUrl\":\"uhdskjfiusjkendmfkjsm\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-video-url",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-video-url"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-get-privacy-policy",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-privacy-policy",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-privacy-policy"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-get-video-url",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-video-url",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-video-url"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-get-all-gift",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-all-gift",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-all-gift"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-add-title",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"title\":\"jjdjdjdjdj\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-title",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-title"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-get-all-title",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-all-title",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-all-title"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-update-title",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"askAstrologerId\":\"655c8995c5d81f01c57f7b04\",\r\n    \"title\":\"nnvbvbvbc\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-title",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-title"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-add-question",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"titleId\":\"\",\r\n    \"question\":\"hcdjkcnds\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-question",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-question"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-get-all-question",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-all-question",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-all-question"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-update-question",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \"questionId\":\"\",\r\n \"titleId\":\"\",\r\n  \"question\":\"\" }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-question",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-question"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-delete-question",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"questionId\":\"655c93c61be84df697b856ef\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/delete-question",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"delete-question"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-recharge-plan",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n          \"recharge_plan_amount\":\"234\",\r\n          \"recharge_plan_extra_percent\":\"65\",\r\n          \"recharge_start_date\":\"12-12-1990\",\r\n          \"recharge_end_date\":\"12-12-1997\",\r\n          \"recharge_status\":\"Active\"\r\n        }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/recharge-plan",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"recharge-plan"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-update-recharge-plan",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"rechargeId\":\"655ca2dca02a9afc760d6e0b\",\r\n          \"recharge_plan_amount\":\"24\",\r\n          \"recharge_plan_extra_percent\":\"65\",\r\n          \"recharge_start_date\":\"12-12-1990\",\r\n          \"recharge_end_date\":\"12-12-1997\",\r\n          \"recharge_status\":\"Active\"\r\n        }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-recharge-plan",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-recharge-plan"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-add-astrologer",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "profileImage",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg"
						},
						{
							"key": "phoneNumber",
							"value": "9878789998",
							"type": "text"
						},
						{
							"key": "astrologerName",
							"value": "Gaurav Roy",
							"type": "text"
						},
						{
							"key": "skill[0]",
							"value": "656839c3b9d928feebf3224f",
							"type": "text"
						},
						{
							"key": "expertise[0]",
							"value": "657032752c60d392105ff773",
							"type": "text"
						},
						{
							"key": "alternateNumber",
							"value": "5434523456",
							"type": "text"
						},
						{
							"key": "gender",
							"value": "female",
							"type": "text"
						},
						{
							"key": "email",
							"value": "p12@gmail.com",
							"type": "text"
						},
						{
							"key": "chat_price",
							"value": "20",
							"type": "text"
						},
						{
							"key": "call_price",
							"value": "30",
							"type": "text"
						},
						{
							"key": "experience",
							"value": "3",
							"type": "text"
						},
						{
							"key": "about",
							"value": "dfsfd rgfd esfds efsd",
							"type": "text"
						},
						{
							"key": "state",
							"value": "UP",
							"type": "text"
						},
						{
							"key": "city",
							"value": "gzb",
							"type": "text"
						},
						{
							"key": "country",
							"value": "India",
							"type": "text"
						},
						{
							"key": "zipCode",
							"value": "201005",
							"type": "text"
						},
						{
							"key": "dateOfBirth",
							"value": "1998-10-10",
							"type": "text"
						},
						{
							"key": "password",
							"value": "123ewqeqwe",
							"type": "text"
						},
						{
							"key": "language[0][language]",
							"value": "hindi",
							"type": "text"
						},
						{
							"key": "rating",
							"value": "2",
							"type": "text"
						},
						{
							"key": "startTime",
							"value": "10:10",
							"type": "text"
						},
						{
							"key": "endTime",
							"value": "12:10",
							"type": "text"
						},
						{
							"key": "panCard",
							"value": "JHYG5656543",
							"type": "text"
						},
						{
							"key": "account_holder_name",
							"value": "iudsjkfn",
							"type": "text"
						},
						{
							"key": "account_number",
							"value": "678767656543",
							"type": "text"
						},
						{
							"key": "IFSC_code",
							"value": "KKBK16253",
							"type": "text"
						},
						{
							"key": "country_phone_code",
							"value": "91",
							"type": "text"
						},
						{
							"key": "currency",
							"value": "INR",
							"type": "text"
						},
						{
							"key": "commission_remark",
							"value": "wew",
							"type": "text"
						},
						{
							"key": "address",
							"value": "hdhdj",
							"type": "text"
						},
						{
							"key": "consultation_price",
							"value": "2",
							"type": "text"
						},
						{
							"key": "commission_call_price",
							"value": "2",
							"type": "text"
						},
						{
							"key": "commission_chat_price",
							"value": "23",
							"type": "text"
						},
						{
							"key": "id_proof_image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg"
						},
						{
							"key": "bank_proof_image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg"
						},
						{
							"key": "preferredDays[0][day]",
							"value": "Tuesday",
							"type": "text"
						},
						{
							"key": "preferredDays[1][day]",
							"value": "Saturday",
							"type": "text"
						},
						{
							"key": "language[1][language]",
							"value": "English",
							"type": "text"
						},
						{
							"key": "language[2][language]",
							"value": "Spanish",
							"type": "text"
						},
						{
							"key": "mainExpertise[0]",
							"value": "6571603d51aeb1dafd3bace3",
							"type": "text"
						},
						{
							"key": "mainExpertise[1]",
							"value": "",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-astrologer",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-astrologer"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-add-astrologer Copy",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "profileImage",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg",
							"disabled": true
						},
						{
							"key": "phoneNumber",
							"value": "9878789998",
							"type": "text"
						},
						{
							"key": "astrologerName",
							"value": "Gaurav Roy",
							"type": "text"
						},
						{
							"key": "skill[0]",
							"value": "656839c3b9d928feebf3224f",
							"type": "text"
						},
						{
							"key": "expertise[0]",
							"value": "657032752c60d392105ff773",
							"type": "text"
						},
						{
							"key": "alternateNumber",
							"value": "5434523456",
							"type": "text",
							"disabled": true
						},
						{
							"key": "gender",
							"value": "female",
							"type": "text",
							"disabled": true
						},
						{
							"key": "email",
							"value": "p12@gmail.com",
							"type": "text",
							"disabled": true
						},
						{
							"key": "chat_price",
							"value": "20",
							"type": "text"
						},
						{
							"key": "call_price",
							"value": "30",
							"type": "text"
						},
						{
							"key": "experience",
							"value": "3",
							"type": "text"
						},
						{
							"key": "about",
							"value": "dfsfd rgfd esfds efsd",
							"type": "text"
						},
						{
							"key": "state",
							"value": "UP",
							"type": "text",
							"disabled": true
						},
						{
							"key": "city",
							"value": "gzb",
							"type": "text",
							"disabled": true
						},
						{
							"key": "country",
							"value": "India",
							"type": "text",
							"disabled": true
						},
						{
							"key": "zipCode",
							"value": "201005",
							"type": "text",
							"disabled": true
						},
						{
							"key": "dateOfBirth",
							"value": "1998-10-10",
							"type": "text",
							"disabled": true
						},
						{
							"key": "password",
							"value": "123ewqeqwe",
							"type": "text",
							"disabled": true
						},
						{
							"key": "language[0][language]",
							"value": "hindi",
							"type": "text",
							"disabled": true
						},
						{
							"key": "rating",
							"value": "2",
							"type": "text",
							"disabled": true
						},
						{
							"key": "startTime",
							"value": "10:10",
							"type": "text"
						},
						{
							"key": "endTime",
							"value": "12:10",
							"type": "text"
						},
						{
							"key": "panCard",
							"value": "JHYG5656543",
							"type": "text",
							"disabled": true
						},
						{
							"key": "account_holder_name",
							"value": "iudsjkfn",
							"type": "text",
							"disabled": true
						},
						{
							"key": "account_number",
							"value": "678767656543",
							"type": "text",
							"disabled": true
						},
						{
							"key": "IFSC_code",
							"value": "KKBK16253",
							"type": "text",
							"disabled": true
						},
						{
							"key": "country_phone_code",
							"value": "91",
							"type": "text",
							"disabled": true
						},
						{
							"key": "currency",
							"value": "INR",
							"type": "text",
							"disabled": true
						},
						{
							"key": "commission_remark",
							"value": "wew",
							"type": "text",
							"disabled": true
						},
						{
							"key": "address",
							"value": "hdhdj",
							"type": "text",
							"disabled": true
						},
						{
							"key": "consultation_price",
							"value": "2",
							"type": "text",
							"disabled": true
						},
						{
							"key": "commission_call_price",
							"value": "2",
							"type": "text",
							"disabled": true
						},
						{
							"key": "commission_chat_price",
							"value": "23",
							"type": "text",
							"disabled": true
						},
						{
							"key": "id_proof_image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg",
							"disabled": true
						},
						{
							"key": "bank_proof_image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg",
							"disabled": true
						},
						{
							"key": "preferredDays[0][day]",
							"value": "Tuesday",
							"type": "text"
						},
						{
							"key": "preferredDays[1][day]",
							"value": "Saturday",
							"type": "text"
						},
						{
							"key": "language[1][language]",
							"value": "English",
							"type": "text"
						},
						{
							"key": "language[2][language]",
							"value": "Spanish",
							"type": "text"
						},
						{
							"key": "mainExpertise[0]",
							"value": "6571603d51aeb1dafd3bace3",
							"type": "text",
							"disabled": true
						},
						{
							"key": "mainExpertise[1]",
							"value": "",
							"type": "text",
							"disabled": true
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-astrologer-details/",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-astrologer-details",
						""
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-add-expertise",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"expertise\":\"kundli\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-expertise",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-expertise"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-add-main-expertise",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"mainExpertise\":\"hdbsbskj\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-main-expertise",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-main-expertise"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-add-astrologer-inquiry",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n            \"name\":\"hdhdhdh\",\r\n            \"email\":\"gsjh12@gmail.com\",\r\n            \"phoneNumber\":\"5463536474\",\r\n            \"address\":\"hdhidhe\",\r\n            \"gender\":\"female\",\r\n            \"experience\":\"5\",\r\n            \"language\":\"hdsdb\"\r\n        }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/add-astrologer-inquiry",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"add-astrologer-inquiry"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-get-astrologer-inquiry",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/astrologer/get-astrologer-inquiry",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"get-astrologer-inquiry"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-get-all-astrologers",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-all-astrologers",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-all-astrologers"
					]
				}
			},
			"response": []
		},
		{
			"name": "customers-verify-customer",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \"phoneNumber\":\"7864536353\",\r\n \"fcmToken\":\"yhgyt67665\",\r\n \"otp\":\"1234\" }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/customers/verify-customer",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"customers",
						"verify-customer"
					]
				}
			},
			"response": []
		},
		{
			"name": "customers-get-customer-details",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"customerId\":\"65604077b75ed27082a85ec2\",\r\n    \"unique_id\":\"uwgduyewyue73736374\" \r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/customers/get-customer-detail",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"customers",
						"get-customer-detail"
					]
				}
			},
			"response": []
		},
		{
			"name": "customers-get-all-customers",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/customers/get-all-customers",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"customers",
						"get-all-customers"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-get-astrologers-id",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"email\":\"\",\r\n    \"password\":\"\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/get-astrologers-id",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-astrologers-id"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-astrologer-login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"phoneNumber\":\"786459863\",\r\n \"fcmToken\":\"yhgyt67665\"\r\n  }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/astrologer/astrologer-login",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"astrologer",
						"astrologer-login"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-verify-astrologer",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \"phoneNumber\":\"7864536353\",\r\n \"fcmToken\":\"yhgyt67665\",\r\n \"otp\":\"1234\" }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/astrologer/verify-astrologer",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"astrologer",
						"verify-astrologer"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-get-astrologer-details",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"astrologerId\":\"65716c598aeed5e302f8a63b\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/astrologer/get-astrologer-details",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"astrologer",
						"get-astrologer-details"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-get-all-astrologers",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/astrologer/get-all-astrologers",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"astrologer",
						"get-all-astrologers"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-blog-category-list",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/blog-category-list",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"blog-category-list"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-add-blog-category",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"blog_category\":\"bcbcbcbcbc\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-blog-category",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-blog-category"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-add-astro-blog",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "title",
							"value": "astrologers Blogs",
							"type": "text"
						},
						{
							"key": "image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/home-screen.png"
						},
						{
							"key": "blogCategoryId",
							"value": "656094e882a009191ea18a2d",
							"type": "text"
						},
						{
							"key": "created_by",
							"value": "Prachi",
							"type": "text"
						},
						{
							"key": "description",
							"value": "kkaksiw ksmwklas oisklamk ioskalsm kk",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-astro-blog",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-astro-blog"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-add-testimonial",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "name",
							"value": "anubhav",
							"type": "text"
						},
						{
							"key": "description",
							"value": "dhbsjbfkjsd",
							"type": "text"
						},
						{
							"key": "youtubeLink",
							"value": "dhsjskdbjsknfjkdsnfjskfskjd",
							"type": "text"
						},
						{
							"key": "astrologerId",
							"value": "655efb3dd5b6ac4c57f717a2",
							"type": "text"
						},
						{
							"key": "image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/1671364458419.jpg"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-testimonial",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-testimonial"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-get-all-testimonial",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-all-testimonial",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-all-testimonial"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-delete-testimonial",
			"request": {
				"method": "DELETE",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/delete-testimonial/6561ba904a223d66924fd6c7",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"delete-testimonial",
						"6561ba904a223d66924fd6c7"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-add-customer",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"customerName\":\"kajal\",\r\n    \"phoneNumber\":\"7633376453\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-customer",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-customer"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-delete-customer",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/delete-customer/65588214ca98b56fff628225",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"delete-customer",
						"65588214ca98b56fff628225"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-delete-user",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/delete-user/6561e5caf257b2c338336087",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"delete-user",
						"6561e5caf257b2c338336087"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-get-all-user",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-all-user",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-all-user"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-add-user",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": " {\r\n        \"username\":\"Ritik\",\r\n        \"email\":\"ritik12@gmail.com\",\r\n        \"password\":\"123456\",\r\n        \"phoneNumber\":\"7658842347\",\r\n       \"permissions\": [\"djskfnkjd\", \"write\", \"cooking\"]\r\n      }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-user",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-user"
					]
				}
			},
			"response": []
		},
		{
			"name": "customers-store-file",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "filePath",
							"type": "file",
							"src": "/C:/Users/Dell/Downloads/Apple bill (1).pdf"
						},
						{
							"key": "fileType",
							"value": "pdf",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/customers/store-file",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"customers",
						"store-file"
					]
				}
			},
			"response": []
		},
		{
			"name": " customers-deduct-wallet",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": " { \r\n     \"astrologerId\":\"6566f61a400958098e50a891\", \r\n     \"customerId\":\"6566dbedb827efa9a6e255fe\", \r\n     \"durationInSeconds\":\"50\" \r\n }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/customers/deduct-wallet",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"customers",
						"deduct-wallet"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-add-screenshot",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/admin/add-screenshot",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"add-screenshot"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-update-testimonial/",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "name",
							"value": "abcnxhsgd",
							"type": "text"
						},
						{
							"key": "image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-08-31 at 12.43.48.jpeg"
						},
						{
							"key": "astrologerId",
							"value": "65673037aa1a95c5f19d6c9c",
							"type": "text"
						},
						{
							"key": "description",
							"value": "sxha x suxbua suhabj sxhan sajxsa",
							"type": "text"
						},
						{
							"key": "youtubeLink",
							"value": "shajknsxiuajbxsajk",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-testimonial/656965a133b71553452175f1",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-testimonial",
						"656965a133b71553452175f1"
					]
				}
			},
			"response": []
		},
		{
			"name": "customers-get-customers-review",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"astrologerId\":\"6566f61a400958098e50a891\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/customers/get-customers-review",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"customers",
						"get-customers-review"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-wallet-balance",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"astrologerId\":\"6565b2ab0d67bfab497f7d24\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/astrologer-wallet-balance",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"astrologer-wallet-balance"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-get-average-rating",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"astrologerId\":\"6566f61a400958098e50a891\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/get-average-rating",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"get-average-rating"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-astrologers-review-count",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"astrologerId\":\"6566f61a400958098e50a891\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/astrologers-review-count",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"astrologers-review-count"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-recommended-astrologer",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/astrologer/recommended-astrologer",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"recommended-astrologer"
					]
				}
			},
			"response": []
		},
		{
			"name": " delete-astrologer-account",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/delete-astrologer-account/6565b2ab0d67bfab497f7d24",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"delete-astrologer-account",
						"6565b2ab0d67bfab497f7d24"
					]
				}
			},
			"response": []
		},
		{
			"name": "add-bank-account",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"astrologerId\":\"6568161223de3221fb6f7139\", \r\n    \"accountNumber\":\"7876565456\", \r\n    \"accountHolderName\":\"Rohan\", \r\n    \"IFSCCode\":\"HGYT8765\" \r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/add-bank-account",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"add-bank-account"
					]
				}
			},
			"response": []
		},
		{
			"name": "customers-add-profile",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "    {\r\n    \"customerId\": \"65608250222afe694e13cc5d\",\r\n    \"firstName\": \"Archi\",\r\n    \"lastName\": \"Sharma\",\r\n    \"gender\": \"female\",\r\n    \"dateOfBirth\": \"2023-12-08T06:15:17.346Z\",\r\n    \"timeOfBirth\": \"2023-12-08T06:15:17.346Z\",\r\n    \"placeOfBirth\": \"Someplace\",\r\n    \"maritalStatus\": \"unmarried\",\r\n    \"status\": 1\r\n}\r\n",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/customers/add-profile",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"customers",
						"add-profile"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-get-chat-history",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-chat-history",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-chat-history"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-strat-chat",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"customerId\":\"656080f1222afe694e13cc4f\",\r\n    \"astrologerId\":\"6568161223de3221fb6f7139\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/start-chat",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"start-chat"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-online-astrologer",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/astrologer/online-astrologer",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"online-astrologer"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-live-astrologer",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/astrologer/live-astrologer",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"live-astrologer"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-set-astrologer-online",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"astrologerId\" : \"65716c598aeed5e302f8a63b\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/set-astrologer-online",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"set-astrologer-online"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-start-chat",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n \r\n\"customerId\":\"656085b8d64aac080362b4aa\",\r\n\"astrologerId\":\"656816b023de3221fb6f7154\"\r\n\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/start-chat",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"start-chat"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-end-chat",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"customerId\":\"6561f0515ebf2f90a0562ee6\",\r\n    \"astrologerId\":\"6568161223de3221fb6f7139\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/end-chat",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"end-chat"
					]
				}
			},
			"response": []
		},
		{
			"name": " astrologer-astrologers-chat-history",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"astrologerId\":\"656816b023de3221fb6f7154\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/astrologers-chat-history",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"astrologers-chat-history"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-update-astrologer-details",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "profileImage",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg",
							"disabled": true
						},
						{
							"key": "phoneNumber",
							"value": "9878789998",
							"type": "text"
						},
						{
							"key": "astrologerName",
							"value": "Gaurav Roy",
							"type": "text"
						},
						{
							"key": "skill[0]",
							"value": "656839c3b9d928feebf3224f",
							"type": "text"
						},
						{
							"key": "expertise[0]",
							"value": "657032752c60d392105ff773",
							"type": "text"
						},
						{
							"key": "alternateNumber",
							"value": "5434523456",
							"type": "text",
							"disabled": true
						},
						{
							"key": "gender",
							"value": "female",
							"type": "text",
							"disabled": true
						},
						{
							"key": "email",
							"value": "p12@gmail.com",
							"type": "text",
							"disabled": true
						},
						{
							"key": "chat_price",
							"value": "20",
							"type": "text"
						},
						{
							"key": "call_price",
							"value": "30",
							"type": "text"
						},
						{
							"key": "experience",
							"value": "3",
							"type": "text"
						},
						{
							"key": "about",
							"value": "dfsfd rgfd esfds efsd",
							"type": "text"
						},
						{
							"key": "state",
							"value": "UP",
							"type": "text",
							"disabled": true
						},
						{
							"key": "city",
							"value": "gzb",
							"type": "text",
							"disabled": true
						},
						{
							"key": "country",
							"value": "India",
							"type": "text",
							"disabled": true
						},
						{
							"key": "zipCode",
							"value": "201005",
							"type": "text",
							"disabled": true
						},
						{
							"key": "dateOfBirth",
							"value": "1998-10-10",
							"type": "text",
							"disabled": true
						},
						{
							"key": "password",
							"value": "123ewqeqwe",
							"type": "text",
							"disabled": true
						},
						{
							"key": "language[0][language]",
							"value": "hindi",
							"type": "text",
							"disabled": true
						},
						{
							"key": "rating",
							"value": "2",
							"type": "text",
							"disabled": true
						},
						{
							"key": "startTime",
							"value": "10:10",
							"type": "text"
						},
						{
							"key": "endTime",
							"value": "12:10",
							"type": "text"
						},
						{
							"key": "panCard",
							"value": "JHYG5656543",
							"type": "text",
							"disabled": true
						},
						{
							"key": "account_holder_name",
							"value": "iudsjkfn",
							"type": "text",
							"disabled": true
						},
						{
							"key": "account_number",
							"value": "678767656543",
							"type": "text",
							"disabled": true
						},
						{
							"key": "IFSC_code",
							"value": "KKBK16253",
							"type": "text",
							"disabled": true
						},
						{
							"key": "country_phone_code",
							"value": "91",
							"type": "text",
							"disabled": true
						},
						{
							"key": "currency",
							"value": "INR",
							"type": "text",
							"disabled": true
						},
						{
							"key": "commission_remark",
							"value": "wew",
							"type": "text",
							"disabled": true
						},
						{
							"key": "address",
							"value": "hdhdj",
							"type": "text",
							"disabled": true
						},
						{
							"key": "consultation_price",
							"value": "2",
							"type": "text",
							"disabled": true
						},
						{
							"key": "commission_call_price",
							"value": "2",
							"type": "text",
							"disabled": true
						},
						{
							"key": "commission_chat_price",
							"value": "23",
							"type": "text",
							"disabled": true
						},
						{
							"key": "id_proof_image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg",
							"disabled": true
						},
						{
							"key": "bank_proof_image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg",
							"disabled": true
						},
						{
							"key": "preferredDays[0][day]",
							"value": "Tuesday",
							"type": "text"
						},
						{
							"key": "preferredDays[1][day]",
							"value": "Saturday",
							"type": "text"
						},
						{
							"key": "language[1][language]",
							"value": "English",
							"type": "text"
						},
						{
							"key": "language[2][language]",
							"value": "Spanish",
							"type": "text"
						},
						{
							"key": "mainExpertise[0]",
							"value": "6571603d51aeb1dafd3bace3",
							"type": "text",
							"disabled": true
						},
						{
							"key": "mainExpertise[1]",
							"value": "",
							"type": "text",
							"disabled": true
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/update-astrologer-details/65716c598aeed5e302f8a63b",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"update-astrologer-details",
						"65716c598aeed5e302f8a63b"
					]
				}
			},
			"response": []
		},
		{
			"name": " astrologer-update-astrologer-details",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n  \"phoneNumber\": \"6266431319\",\r\n  \"astrologerName\": \"Gaurav Roy\",\r\n  \"skill\": [\"656839c3b9d928feebf3224f\"],\r\n  \"expertise\": [\"657032752c60d392105ff773\"],\r\n  \"chat_price\": 20,\r\n  \"call_price\": 30,\r\n  \"experience\": 3,\r\n  \"about\": \"dfsfd rgfd esfds efsd\",\r\n  \"startTime\": \"2023-12-07T12:55:21.107Z\",\r\n  \"endTime\": \"2023-12-07T22:55:21.107Z\",\r\n  \"preferredDays\": [\"Tue\",\"Sat\",\"Wed\"],\r\n  \"language\": [\"hindi\",\"English\",\"Spanish\"]\r\n}\r\n",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/update-astrologer-details/65716c598aeed5e302f8a63b",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"update-astrologer-details",
						"65716c598aeed5e302f8a63b"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-update-customer-details",
			"request": {
				"method": "PUT",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/astrologer/update-customer-details/65716c598aeed5e302f8a63b",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"update-customer-details",
						"65716c598aeed5e302f8a63b"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologer-update-customer-details",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"customerName\":\"Kamini Singh Bishen\",\r\n    \"gender\":\"female\",\r\n    \"dateOfBirth\":\"1996-12-20\",\r\n    \"placeOfBirth\":\"Gorakhpur\",\r\n    \"timeOfBirth\":\"12:00 PM\",\r\n    \"alternateNumber\":\"9878789889\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/update-customer-details/65608208222afe694e13cc5a",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"update-customer-details",
						"65608208222afe694e13cc5a"
					]
				}
			},
			"response": []
		},
		{
			"name": " astrologer-logout-astrologer",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"astrologerId\":\"\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/logout-astrologer",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"logout-astrologer"
					]
				}
			},
			"response": []
		},
		{
			"name": "astrologers-update-astrologer-image",
			"request": {
				"method": "PUT",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/astrologer/update-astrologer-profile-image/65716c598aeed5e302f8a63b",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"update-astrologer-profile-image",
						"65716c598aeed5e302f8a63b"
					]
				}
			},
			"response": []
		},
		{
			"name": "customers-update-customer-profile-image",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/home-screen.png"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/customers/update-customer-profile-image/65608250222afe694e13cc5d",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"customers",
						"update-customer-profile-image",
						"65608250222afe694e13cc5d"
					]
				}
			},
			"response": []
		},
		{
			"name": "customers-recharge-customer-wallet",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"customerId\":\"6566dbedb827efa9a6e255fe\",\r\n    \"amount\":\"50\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/customers/recharge-customer-wallet",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"customers",
						"recharge-customer-wallet"
					]
				}
			},
			"response": []
		},
		{
			"name": "admin-get-all-expertise",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:4000/admin/get-all-expertise",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"get-all-expertise"
					]
				}
			},
			"response": []
		},
		{
			"name": " admin-update-astrologer ",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "profileImage",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg"
						},
						{
							"key": "astrologerName",
							"value": "Gaurav singh",
							"type": "text"
						},
						{
							"key": "skill[0]",
							"value": "656839c3b9d928feebf3224f",
							"type": "text"
						},
						{
							"key": "expertise[0]",
							"value": "657032752c60d392105ff773",
							"type": "text"
						},
						{
							"key": "alternateNumber",
							"value": "5434523456",
							"type": "text"
						},
						{
							"key": "gender",
							"value": "male",
							"type": "text"
						},
						{
							"key": "email",
							"value": "p12@gmail.com",
							"type": "text"
						},
						{
							"key": "chat_price",
							"value": "20",
							"type": "text"
						},
						{
							"key": "call_price",
							"value": "30",
							"type": "text"
						},
						{
							"key": "experience",
							"value": "3",
							"type": "text"
						},
						{
							"key": "about",
							"value": "dfsfd rgfd esfds efsd",
							"type": "text"
						},
						{
							"key": "state",
							"value": "UP",
							"type": "text"
						},
						{
							"key": "city",
							"value": "gzb",
							"type": "text"
						},
						{
							"key": "country",
							"value": "India",
							"type": "text"
						},
						{
							"key": "zipCode",
							"value": "201005",
							"type": "text"
						},
						{
							"key": "dateOfBirth",
							"value": "1998-10-10",
							"type": "text"
						},
						{
							"key": "password",
							"value": "123ewqeqwe",
							"type": "text"
						},
						{
							"key": "language[0][language]",
							"value": "hindi",
							"type": "text",
							"disabled": true
						},
						{
							"key": "rating",
							"value": "2",
							"type": "text"
						},
						{
							"key": "startTime",
							"value": "2023-12-08T14:10:48.865Z",
							"type": "text"
						},
						{
							"key": "endTime",
							"value": "2023-12-08T16:10:48.865Z",
							"type": "text"
						},
						{
							"key": "panCard",
							"value": "JHYG5656543",
							"type": "text"
						},
						{
							"key": "account_holder_name",
							"value": "Gaurav",
							"type": "text"
						},
						{
							"key": "account_number",
							"value": "678767656543",
							"type": "text"
						},
						{
							"key": "IFSC_code",
							"value": "KKBK16253",
							"type": "text"
						},
						{
							"key": "country_phone_code",
							"value": "91",
							"type": "text"
						},
						{
							"key": "currency",
							"value": "INR",
							"type": "text"
						},
						{
							"key": "commission_remark",
							"value": "wew",
							"type": "text"
						},
						{
							"key": "address",
							"value": "hdhdj",
							"type": "text"
						},
						{
							"key": "consultation_price",
							"value": "2",
							"type": "text"
						},
						{
							"key": "commission_call_price",
							"value": "2",
							"type": "text"
						},
						{
							"key": "commission_chat_price",
							"value": "23",
							"type": "text"
						},
						{
							"key": "id_proof_image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg"
						},
						{
							"key": "bank_proof_image",
							"type": "file",
							"src": "/C:/Users/Dell/Pictures/WhatsApp Image 2023-07-16 at 18.35.08 (1).jpeg"
						},
						{
							"key": "preferredDays[0]",
							"value": "Tues",
							"type": "text"
						},
						{
							"key": "preferredDays[1]",
							"value": "Sat",
							"type": "text"
						},
						{
							"key": "language[0]",
							"value": "English",
							"type": "text"
						},
						{
							"key": "language[1]",
							"value": "Spanish",
							"type": "text"
						},
						{
							"key": "mainExpertise[0]",
							"value": "6572ed506c2a59632a40a516",
							"type": "text"
						},
						{
							"key": "phoneNumber",
							"value": "6266431319",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/admin/update-astrologer/6572e64447d320e40c7d26fa",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"admin",
						"update-astrologer",
						"6572e64447d320e40c7d26fa"
					]
				}
			},
			"response": []
		},
		{
			"name": " astrologer-calculate-end-time",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "astrologerId",
							"value": "6572e64447d320e40c7d26fa",
							"type": "text"
						},
						{
							"key": "customerId",
							"value": "6566dbedb827efa9a6e255fe",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:4000/astrologer/calculate-end-time",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"astrologer",
						"calculate-end-time"
					]
				}
			},
			"response": []
		}
	]
}