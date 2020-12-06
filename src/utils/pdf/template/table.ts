import {Template} from "labelmake/dist/types/type";

const table: Template = {
    "fontName": "ipag",
    "basePdf": "data:application/pdf;base64,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CjEgMCBvYmoKPDwgL1RpdGxlICj+/1GZd1wwMzdT8F4zXDAwMFwoU59nLP9cMDExXDAwMCBcMDAwXChcMDAwMVwwMDBcKVwwMDAuXDAwMHhcMDAwbFwwMDBzXDAwMCBcMDAwIFwwMDAtXDAwMCBcMDAwIE6SY9sw4jD8MMkpCi9Qcm9kdWNlciAo/v9cMDAwbVwwMDBhXDAwMGNcMDAwT1wwMDBTXDAwMCAw0DD8MLgw5zDzXDAwMDFcMDAwMFwwMDAuXDAwMDFcMDAwNVwwMDAuXDAwMDf/XDAxMDDTMOswyVwwMDAxXDAwMDlcMDAwSFwwMDAxXDAwMDX/XDAxMVwwMDAgXDAwMFFcMDAwdVwwMDBhXDAwMHJcMDAwdFwwMDB6XDAwMCBcMDAwUFwwMDBEXDAwMEZcMDAwQ1wwMDBvXDAwMG5cMDAwdFwwMDBlXDAwMHhcMDAwdCkKL0F1dGhvciAo/v+XUlxccWF2WScpIC9DcmVhdG9yIChFeGNlbCkgL0NyZWF0aW9uRGF0ZSAoRDoyMDIwMTIwMzExNDEzMVowMCcwMCcpCi9Nb2REYXRlIChEOjIwMjAxMjAzMTE0MTMxWjAwJzAwJykgPj4KZW5kb2JqCnhyZWYKMCAzMgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMTA4MDEgMDAwMDAgbiAKMDAwMDAwMDc3OSAwMDAwMCBuIAowMDAwMDAzNzc2IDAwMDAwIG4gCjAwMDAwMDAwMjIgMDAwMDAgbiAKMDAwMDAwMDc2MCAwMDAwMCBuIAowMDAwMDAwODgzIDAwMDAwIG4gCjAwMDAwMDM3NDAgMDAwMDAgbiAKMDAwMDAwMDAwMCAwMDAwMCBuIAowMDAwMDA2NDU2IDAwMDAwIG4gCjAwMDAwMDAwMDAgMDAwMDAgbiAKMDAwMDAwODI0NCAwMDAwMCBuIAowMDAwMDAwMDAwIDAwMDAwIG4gCjAwMDAwMDM5MDkgMDAwMDAgbiAKMDAwMDAwMTAwNCAwMDAwMCBuIAowMDAwMDAzNzE5IDAwMDAwIG4gCjAwMDAwMDM4NTkgMDAwMDAgbiAKMDAwMDAwNDQzNyAwMDAwMCBuIAowMDAwMDA0MDkwIDAwMDAwIG4gCjAwMDAwMDQ0MTcgMDAwMDAgbiAKMDAwMDAwNDY3MyAwMDAwMCBuIAowMDAwMDA2NDM1IDAwMDAwIG4gCjAwMDAwMDY5NDEgMDAwMDAgbiAKMDAwMDAwNjYyMSAwMDAwMCBuIAowMDAwMDA2OTIxIDAwMDAwIG4gCjAwMDAwMDcxNzcgMDAwMDAgbiAKMDAwMDAwODIyNCAwMDAwMCBuIAowMDAwMDA4NzczIDAwMDAwIG4gCjAwMDAwMDg0MjUgMDAwMDAgbiAKMDAwMDAwODc1MyAwMDAwMCBuIAowMDAwMDA5MDA5IDAwMDAwIG4gCjAwMDAwMTA3ODAgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSAzMiAvUm9vdCAxNiAwIFIgL0luZm8gMSAwIFIgL0lEIFsgPDMxYzIyZjI5NmY5ZTI3OWQ0NTMwNDZlZmE3MWY0NmQyPgo8MzFjMjJmMjk2ZjllMjc5ZDQ1MzA0NmVmYTcxZjQ2ZDI+IF0gPj4Kc3RhcnR4cmVmCjExMjcyCiUlRU9GCg==",
    "schemas": [
        {
            "img_1": {
                "type": "image",
                "position": {
                    "x": 34.66,
                    "y": 31.22
                },
                "width": 105.13,
                "height": 78.14,
                "alignment": "left",
                "fontSize": 18,
                "characterSpacing": 0,
                "lineHeight": 1
            },
            "num_1": {
                "type": "text",
                "position": {
                    "x": 169.6,
                    "y": 32.54
                },
                "width": 12.27,
                "height": 6.71,
                "alignment": "center",
                "fontSize": 14,
                "characterSpacing": 0,
                "lineHeight": 1
            },
            "title_1": {
                "type": "text",
                "position": {
                    "x": 139.98,
                    "y": 37.32
                },
                "width": 42.4,
                "height": 9.33,
                "alignment": "center",
                "fontSize": 10,
                "characterSpacing": 0,
                "lineHeight": 3
            },
            "comment_1": {
                "type": "text",
                "position": {
                    "x": 141.02,
                    "y": 45.78
                },
                "width": 41.63,
                "height": 63.57,
                "alignment": "left",
                "fontSize": 9,
                "characterSpacing": 0,
                "lineHeight": 2
            },
            "img_2": {
                "type": "image",
                "position": {
                    "x": 34.66,
                    "y": 109.33
                },
                "width": 104.87,
                "height": 77.61,
                "alignment": "left",
                "fontSize": 18,
                "characterSpacing": 0,
                "lineHeight": 1
            },
            "num_2": {
                "type": "text",
                "position": {
                    "x": 168.28,
                    "y": 110.38
                },
                "width": 14.65,
                "height": 7.23,
                "alignment": "center",
                "fontSize": 14,
                "characterSpacing": 0,
                "lineHeight": 1
            },
            "title_2": {
                "type": "text",
                "position": {
                    "x": 139.96,
                    "y": 115.15
                },
                "width": 42.69,
                "height": 9.88,
                "alignment": "center",
                "fontSize": 10,
                "characterSpacing": 0,
                "lineHeight": 3
            },
            "comment_2": {
                "type": "text",
                "position": {
                    "x": 141.55,
                    "y": 124.41
                },
                "width": 41.1,
                "height": 62.26,
                "alignment": "left",
                "fontSize": 9,
                "characterSpacing": 0,
                "lineHeight": 2
            },
            "img_3": {
                "type": "image",
                "position": {
                    "x": 34.92,
                    "y": 187.12
                },
                "width": 105.12,
                "height": 77.34,
                "alignment": "left",
                "fontSize": 18,
                "characterSpacing": 0,
                "lineHeight": 1
            },
            "num_3": {
                "type": "text",
                "position": {
                    "x": 168.54,
                    "y": 188.45
                },
                "width": 13.85,
                "height": 6.96,
                "alignment": "center",
                "fontSize": 14,
                "characterSpacing": 0,
                "lineHeight": 1
            },
            "title_3": {
                "type": "text",
                "position": {
                    "x": 139.17,
                    "y": 192.93
                },
                "width": 43.49,
                "height": 9.09,
                "alignment": "center",
                "fontSize": 10,
                "characterSpacing": 0,
                "lineHeight": 3
            },
            "comment_3": {
                "type": "text",
                "position": {
                    "x": 141.82,
                    "y": 202.46
                },
                "width": 40.84,
                "height": 62.27,
                "alignment": "left",
                "fontSize": 9,
                "characterSpacing": 0,
                "lineHeight": 2
            }
        }
    ]
};

export default table;
