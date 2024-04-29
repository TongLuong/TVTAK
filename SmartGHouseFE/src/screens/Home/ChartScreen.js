import React, { useRef, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { getRecord } from "../../services/userService";
// const data1 = [
//   {
//     id: "0FJV6WTHFNN3KSRPWDTFYZ4EPV",
//     created_at: "2024-04-25T09:27:09Z",
//     expiration: "2024-05-25T09:27:09Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6WM9CWEV8BW41KYWK424W8",
//     created_at: "2024-04-25T09:26:48Z",
//     expiration: "2024-05-25T09:26:48Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6WE1CRBT9GQAHCVAY6SAEK",
//     created_at: "2024-04-25T09:26:28Z",
//     expiration: "2024-05-25T09:26:28Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6W7SFSZW03RRA8JR05SD4A",
//     created_at: "2024-04-25T09:26:07Z",
//     expiration: "2024-05-25T09:26:07Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6W1HBMBVFH0EH3VM1M0BK8",
//     created_at: "2024-04-25T09:25:47Z",
//     expiration: "2024-05-25T09:25:47Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6PS8E2PTPCPF303FWVD1GW",
//     created_at: "2024-04-25T09:16:35Z",
//     expiration: "2024-05-25T09:16:35Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6PK1DV2FE6RPR85ZXTYX3W",
//     created_at: "2024-04-25T09:16:15Z",
//     expiration: "2024-05-25T09:16:15Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6PCSB74VG5P5PAYS1K9WQM",
//     created_at: "2024-04-25T09:15:55Z",
//     expiration: "2024-05-25T09:15:55Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6P6HHARN79NW9QSDAKF5C2",
//     created_at: "2024-04-25T09:15:34Z",
//     expiration: "2024-05-25T09:15:34Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6P0AHYEB1D7C9XR24JCM62",
//     created_at: "2024-04-25T09:15:14Z",
//     expiration: "2024-05-25T09:15:14Z",
//     value: "58",
//   },
//   {
//     id: "0FJV6NT1CMADQKYG5ESAKM9K23",
//     created_at: "2024-04-25T09:14:53Z",
//     expiration: "2024-05-25T09:14:53Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6NKSC3JR9G7R4A54TVFNAH",
//     created_at: "2024-04-25T09:14:33Z",
//     expiration: "2024-05-25T09:14:33Z",
//     value: "58",
//   },
//   {
//     id: "0FJV6NDHBMAHAQ6S9PGPDB7N9K",
//     created_at: "2024-04-25T09:14:12Z",
//     expiration: "2024-05-25T09:14:12Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6MYXF5P5F5E6TGK7J7X1YH",
//     created_at: "2024-04-25T09:13:24Z",
//     expiration: "2024-05-25T09:13:24Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6MRNC1THV7HV0KCEP8Q5GY",
//     created_at: "2024-04-25T09:13:04Z",
//     expiration: "2024-05-25T09:13:04Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6MJCDEAKTA3KMME8DSEVPQ",
//     created_at: "2024-04-25T09:12:43Z",
//     expiration: "2024-05-25T09:12:43Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6MC4EDXW1X8RCDZ6470QDY",
//     created_at: "2024-04-25T09:12:23Z",
//     expiration: "2024-05-25T09:12:23Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6JZ0EWS8MWEY7THDETNV7F",
//     created_at: "2024-04-25T09:09:55Z",
//     expiration: "2024-05-25T09:09:55Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6JRRHHSB1D708G6RW271HW",
//     created_at: "2024-04-25T09:09:34Z",
//     expiration: "2024-05-25T09:09:34Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6JJGEJQ12974HMATZ7XMZ3",
//     created_at: "2024-04-25T09:09:14Z",
//     expiration: "2024-05-25T09:09:14Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6JC8E9QAQVNXMMQNGA4YX3",
//     created_at: "2024-04-25T09:08:53Z",
//     expiration: "2024-05-25T09:08:53Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6J60H62BAWBK3A9W1XZGWA",
//     created_at: "2024-04-25T09:08:33Z",
//     expiration: "2024-05-25T09:08:33Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6HZRE1YH4A7DT4G2BJ50S3",
//     created_at: "2024-04-25T09:08:12Z",
//     expiration: "2024-05-25T09:08:12Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6HSGFZKTED22V0CAJQXVK6",
//     created_at: "2024-04-25T09:07:52Z",
//     expiration: "2024-05-25T09:07:52Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6HK8E18JPXEQCWHGVC0MSR",
//     created_at: "2024-04-25T09:07:32Z",
//     expiration: "2024-05-25T09:07:32Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6HD1GDH8366PWR9X98J813",
//     created_at: "2024-04-25T09:07:11Z",
//     expiration: "2024-05-25T09:07:11Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6H6RF8Y9E1W1BT8WP5X5AY",
//     created_at: "2024-04-25T09:06:51Z",
//     expiration: "2024-05-25T09:06:51Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6H0HJ55PSRJ1V4X3AHTMH0",
//     created_at: "2024-04-25T09:06:30Z",
//     expiration: "2024-05-25T09:06:30Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6GT8E8X2S3E39DAYDCAS0N",
//     created_at: "2024-04-25T09:06:10Z",
//     expiration: "2024-05-25T09:06:10Z",
//     value: "58",
//   },
//   {
//     id: "0FJV6GM1FYWNJJDN9S3N57KFPY",
//     created_at: "2024-04-25T09:05:49Z",
//     expiration: "2024-05-25T09:05:49Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6GDSJMQHEJFTZ21NT82X7N",
//     created_at: "2024-04-25T09:05:29Z",
//     expiration: "2024-05-25T09:05:29Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6G7JW8E81E1AS8655VGK20",
//     created_at: "2024-04-25T09:05:08Z",
//     expiration: "2024-05-25T09:05:08Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6G1AP262SEBW31QFZ0KRRG",
//     created_at: "2024-04-25T09:04:48Z",
//     expiration: "2024-05-25T09:04:48Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6FV2KRVQFA6BMKK78EQS7B",
//     created_at: "2024-04-25T09:04:27Z",
//     expiration: "2024-05-25T09:04:27Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6FMSH1R0MMQDYEQDF4JMMX",
//     created_at: "2024-04-25T09:04:07Z",
//     expiration: "2024-05-25T09:04:07Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6FEJX1GQ6EC73GF4TJFR3T",
//     created_at: "2024-04-25T09:03:46Z",
//     expiration: "2024-05-25T09:03:46Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6F8AMXKTX1SMQFHS26FJ61",
//     created_at: "2024-04-25T09:03:26Z",
//     expiration: "2024-05-25T09:03:26Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6F22KGFJ13M1M71SY0Z6VT",
//     created_at: "2024-04-25T09:03:05Z",
//     expiration: "2024-05-25T09:03:05Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6EVTHYYXVM8F038JPTNPWW",
//     created_at: "2024-04-25T09:02:45Z",
//     expiration: "2024-05-25T09:02:45Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6ENJJZN677PQVWS46FCV8N",
//     created_at: "2024-04-25T09:02:25Z",
//     expiration: "2024-05-25T09:02:25Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6EFEF9EXD6D56AQ9TCNBZ3",
//     created_at: "2024-04-25T09:02:04Z",
//     expiration: "2024-05-25T09:02:04Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6E93ETKF5GKZG4GBHYZ9GV",
//     created_at: "2024-04-25T09:01:44Z",
//     expiration: "2024-05-25T09:01:44Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6E2WENYW1SGXQPHF14YFHQ",
//     created_at: "2024-04-25T09:01:23Z",
//     expiration: "2024-05-25T09:01:23Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6DWMEN4NBENABMVCV6NZNV",
//     created_at: "2024-04-25T09:01:03Z",
//     expiration: "2024-05-25T09:01:03Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6DPCFZCNY94MM8ZVC2RAA5",
//     created_at: "2024-04-25T09:00:42Z",
//     expiration: "2024-05-25T09:00:42Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6DG3E0KAQ0V167VTEMS45M",
//     created_at: "2024-04-25T09:00:22Z",
//     expiration: "2024-05-25T09:00:22Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6D9VVMEAJ683100XY7EMTZ",
//     created_at: "2024-04-25T09:00:01Z",
//     expiration: "2024-05-25T09:00:01Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6D3QH29HN0140SQJ5TCHX7",
//     created_at: "2024-04-25T08:59:41Z",
//     expiration: "2024-05-25T08:59:41Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6CXCDGDKFBMPKCFNX39P37",
//     created_at: "2024-04-25T08:59:20Z",
//     expiration: "2024-05-25T08:59:20Z",
//     value: "58",
//   },
//   {
//     id: "0FJV6CQ4HF5FWXV0SJJ15D0GCS",
//     created_at: "2024-04-25T08:59:00Z",
//     expiration: "2024-05-25T08:59:00Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6CGVBWN478ET5K1ZYWR0E9",
//     created_at: "2024-04-25T08:58:39Z",
//     expiration: "2024-05-25T08:58:39Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6CAMDY0JWEF8WBRE5J41FD",
//     created_at: "2024-04-25T08:58:19Z",
//     expiration: "2024-05-25T08:58:19Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6C4CEF8BQY2911708WSRR6",
//     created_at: "2024-04-25T08:57:58Z",
//     expiration: "2024-05-25T08:57:58Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6BY4D4FNPR2S67PFT4W7C0",
//     created_at: "2024-04-25T08:57:38Z",
//     expiration: "2024-05-25T08:57:38Z",
//     value: "58",
//   },
//   {
//     id: "0FJV6BQVNS2Z0R8AD6J6X1G08C",
//     created_at: "2024-04-25T08:57:17Z",
//     expiration: "2024-05-25T08:57:17Z",
//     value: "57",
//   },
//   {
//     id: "0FJV6BHKFKMPBYPYQ9NN88THMZ",
//     created_at: "2024-04-25T08:56:57Z",
//     expiration: "2024-05-25T08:56:57Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6BBEQHN4RAPA7QAD58RGCE",
//     created_at: "2024-04-25T08:56:37Z",
//     expiration: "2024-05-25T08:56:37Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6B54H5JS86J2FPX54JY1WM",
//     created_at: "2024-04-25T08:56:16Z",
//     expiration: "2024-05-25T08:56:16Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6AYVGQM2SWXE2QK5BDJV4Z",
//     created_at: "2024-04-25T08:55:56Z",
//     expiration: "2024-05-25T08:55:56Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6ARKE730JA1SW242SPDB8X",
//     created_at: "2024-04-25T08:55:35Z",
//     expiration: "2024-05-25T08:55:35Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6AJBDAM8E600VG9SQ8RXJ6",
//     created_at: "2024-04-25T08:55:15Z",
//     expiration: "2024-05-25T08:55:15Z",
//     value: "59",
//   },
//   {
//     id: "0FJV6AC3MJX45AWWTRGFYWC01S",
//     created_at: "2024-04-25T08:54:54Z",
//     expiration: "2024-05-25T08:54:54Z",
//     value: "61",
//   },
//   {
//     id: "0FJV6A0D59Y5X2X89WNR2653Q4",
//     created_at: "2024-04-25T08:54:16Z",
//     expiration: "2024-05-25T08:54:16Z",
//     value: "58",
//   },
//   {
//     id: "0FJV69T5AE7MCV7H7H9PX6M7QJ",
//     created_at: "2024-04-25T08:53:55Z",
//     expiration: "2024-05-25T08:53:55Z",
//     value: "58",
//   },
//   {
//     id: "0FJV69KXA9CWVTFYJWJM2KEN3J",
//     created_at: "2024-04-25T08:53:35Z",
//     expiration: "2024-05-25T08:53:35Z",
//     value: "58",
//   },
//   {
//     id: "0FJV69DN97AQ6K8054A1PVV41K",
//     created_at: "2024-04-25T08:53:14Z",
//     expiration: "2024-05-25T08:53:14Z",
//     value: "59",
//   },
//   {
//     id: "0FJV697DC8RZ6T1WW6P9A0T0SG",
//     created_at: "2024-04-25T08:52:54Z",
//     expiration: "2024-05-25T08:52:54Z",
//     value: "58",
//   },
//   {
//     id: "0FJV69168EQHT8AZDSAWV0E7NR",
//     created_at: "2024-04-25T08:52:33Z",
//     expiration: "2024-05-25T08:52:33Z",
//     value: "58",
//   },
//   {
//     id: "0FJV68TY73B65VYYSAG9HHE6BV",
//     created_at: "2024-04-25T08:52:13Z",
//     expiration: "2024-05-25T08:52:13Z",
//     value: "58",
//   },
//   {
//     id: "0FJV68MQB93ED2MXQPCH85XNJH",
//     created_at: "2024-04-25T08:51:53Z",
//     expiration: "2024-05-25T08:51:53Z",
//     value: "60",
//   },
//   {
//     id: "0FJV68EFBS1XKRA14XPDJV61ZX",
//     created_at: "2024-04-25T08:51:32Z",
//     expiration: "2024-05-25T08:51:32Z",
//     value: "60",
//   },
//   {
//     id: "0FJV6887A2RYPNS2WJTRJCGWA8",
//     created_at: "2024-04-25T08:51:12Z",
//     expiration: "2024-05-25T08:51:12Z",
//     value: "59",
//   },
//   {
//     id: "0FJV681Z9CYGGPCBWFZCC95EDV",
//     created_at: "2024-04-25T08:50:51Z",
//     expiration: "2024-05-25T08:50:51Z",
//     value: "60",
//   },
//   {
//     id: "0FJV67VP7F13GR3HQD8P20DKJA",
//     created_at: "2024-04-25T08:50:31Z",
//     expiration: "2024-05-25T08:50:31Z",
//     value: "60",
//   },
//   {
//     id: "0FJV61Y0KAV231GHEYVFEPNZW0",
//     created_at: "2024-04-25T08:40:09Z",
//     expiration: "2024-05-25T08:40:09Z",
//     value: "59",
//   },
//   {
//     id: "0FJV61QQCXDMHV7ZQWHM4NHKWT",
//     created_at: "2024-04-25T08:39:48Z",
//     expiration: "2024-05-25T08:39:48Z",
//     value: "62",
//   },
//   {
//     id: "0FJV61HG7SMQ3CHQ3G11YBEEVW",
//     created_at: "2024-04-25T08:39:28Z",
//     expiration: "2024-05-25T08:39:28Z",
//     value: "60",
//   },
//   {
//     id: "0FJV61B66YFTVVYMNT5MKT839D",
//     created_at: "2024-04-25T08:39:07Z",
//     expiration: "2024-05-25T08:39:07Z",
//     value: "60",
//   },
//   {
//     id: "0FJV614YPD89EXV33TTSBPH1RD",
//     created_at: "2024-04-25T08:38:47Z",
//     expiration: "2024-05-25T08:38:47Z",
//     value: "60",
//   },
//   {
//     id: "0FJV60YQDVCEQXVE4VC5WAKCCH",
//     created_at: "2024-04-25T08:38:27Z",
//     expiration: "2024-05-25T08:38:27Z",
//     value: "59",
//   },
//   {
//     id: "0FJV60RF987BQRTVS7BF1EF2D4",
//     created_at: "2024-04-25T08:38:06Z",
//     expiration: "2024-05-25T08:38:06Z",
//     value: "61",
//   },
//   {
//     id: "0FJV60J76HKW5CJ9QB9NT15MMG",
//     created_at: "2024-04-25T08:37:46Z",
//     expiration: "2024-05-25T08:37:46Z",
//     value: "58",
//   },
//   {
//     id: "0FJV60BZBZ81VQ38AAWTNTSQGJ",
//     created_at: "2024-04-25T08:37:25Z",
//     expiration: "2024-05-25T08:37:25Z",
//     value: "60",
//   },
//   {
//     id: "0FJV605Q8HADQFTQ5PY8GDQRX5",
//     created_at: "2024-04-25T08:37:05Z",
//     expiration: "2024-05-25T08:37:05Z",
//     value: "61",
//   },
//   {
//     id: "0FJV5ZZFAM75V86FE75736NK3C",
//     created_at: "2024-04-25T08:36:44Z",
//     expiration: "2024-05-25T08:36:44Z",
//     value: "60",
//   },
//   {
//     id: "0FJV5ZS769VYFDXPRCRS55WJAB",
//     created_at: "2024-04-25T08:36:24Z",
//     expiration: "2024-05-25T08:36:24Z",
//     value: "61",
//   },
//   {
//     id: "0FJV5ZJZ960GMA49FJQ5FYQRNQ",
//     created_at: "2024-04-25T08:36:03Z",
//     expiration: "2024-05-25T08:36:03Z",
//     value: "60",
//   },
//   {
//     id: "0FJV5ZCRANYFA4XZ28XESNP3CE",
//     created_at: "2024-04-25T08:35:43Z",
//     expiration: "2024-05-25T08:35:43Z",
//     value: "60",
//   },
//   {
//     id: "0FJV5Z6G6GWKQAV89HKPBQB60H",
//     created_at: "2024-04-25T08:35:22Z",
//     expiration: "2024-05-25T08:35:22Z",
//     value: "61",
//   },
//   {
//     id: "0FJV5Z0866KMD3D8BBDB5MKTQ4",
//     created_at: "2024-04-25T08:35:02Z",
//     expiration: "2024-05-25T08:35:02Z",
//     value: "61",
//   },
//   {
//     id: "0FJV5YT06MJX2PKPVEARNNHR25",
//     created_at: "2024-04-25T08:34:41Z",
//     expiration: "2024-05-25T08:34:41Z",
//     value: "59",
//   },
//   {
//     id: "0FJV5YMHKMYF4JX0DB3KKAG7S2",
//     created_at: "2024-04-25T08:34:23Z",
//     expiration: "2024-05-25T08:34:23Z",
//     value: "60",
//   },
//   {
//     id: "0FJV5YDG7V681XZSPA2N405JA8",
//     created_at: "2024-04-25T08:34:00Z",
//     expiration: "2024-05-25T08:34:00Z",
//     value: "59",
//   },
//   {
//     id: "0FJV5Y787PXKPR8X9PHA863ZTJ",
//     created_at: "2024-04-25T08:33:40Z",
//     expiration: "2024-05-25T08:33:40Z",
//     value: "60",
//   },
//   {
//     id: "0FJV5Y107VC9Y8QAQJGVESSGXR",
//     created_at: "2024-04-25T08:33:19Z",
//     expiration: "2024-05-25T08:33:19Z",
//     value: "59",
//   },
//   {
//     id: "0FJV5XTYAMX9QX1HQ46VVWPXRB",
//     created_at: "2024-04-25T08:33:00Z",
//     expiration: "2024-05-25T08:33:00Z",
//     value: "58",
//   },
//   {
//     id: "0FJV5XMGBMYZVM6909J0KER5YT",
//     created_at: "2024-04-25T08:32:38Z",
//     expiration: "2024-05-25T08:32:38Z",
//     value: "59",
//   },
//   {
//     id: "0FJV5XE978VCQEHXCFH6SMWWY1",
//     created_at: "2024-04-25T08:32:18Z",
//     expiration: "2024-05-25T08:32:18Z",
//     value: "58",
//   },
//   {
//     id: "0FJV5X0B6TW21RSJ07XJH3FG4N",
//     created_at: "2024-04-25T08:31:32Z",
//     expiration: "2024-05-25T08:31:32Z",
//     value: "60",
//   },
//   {
//     id: "0FJV5WT39DJM0TEPWSXRX8HG7P",
//     created_at: "2024-04-25T08:31:12Z",
//     expiration: "2024-05-25T08:31:12Z",
//     value: "61",
//   },
// ];
const processData = (data) => {
  const labels = data.map((item) => {
    const date = new Date(item.created_at);
    const month = date.getMonth() + 1; // January is 0
    const day = date.getDate();
    return `${day}/${month}`;
  });
  const values = data.map((item) => parseInt(item.value));
  return { labels, values };
};

const Chart = ({ data }) => {
  const { labels, values } = processData(data);

  return (
    <View>
      <Text>Line Chart</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: values,
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const ChartScreen = () => {
  const [data1, setData] = useState([]);
  // const [data2, setData2] = useState([]);
  // const [data3, setData3] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await getRecord("iot-light");
        console.log(data1?.data);
        console.log("why");
        setData(data1.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    // <ScrollView>
    <View>
      <Text>hbh</Text>
    </View>
    // </ScrollView>
  );
};

export default ChartScreen;
