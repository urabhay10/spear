const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require("dotenv").config();

var ProWritingAidApi = require('pro_writing_aid_api');
var api = new ProWritingAidApi.TextApi();
api.apiClient.basePath = "https://api.prowritingaid.com";
api.apiClient.defaultHeaders = { 'licenseCode': process.env.GRAMMAR_API_KEY };
router.use(bodyParser.json());

router.post('/', async (req, res) => {
    console.log('on the / grammar route')
    const { text } = req.body;
    var request = new ProWritingAidApi.TextAnalysisRequest(
        text,
        ['grammar'],
        "General",
        "En"
    );
    api.post(request)
        .then(function (data) {
            console.log('API called successfully. Returned data: ');
            console.log(data);
            res.send(data)
        }, function (error) {
            console.error(error);
        });
})

module.exports = router;