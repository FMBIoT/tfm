const axios = require('axios');
const { nanoid } = require('nanoid');


// const cbHost = `http://${process.env.CB_HOST}:1026`;
const cbHost = `http://${process.env.CB_HOST}:1026`;
const cbUri = `${cbHost}/v2`;
const dataPortsUri = `http://${process.env.CB_HOST}:4568`;
const fiwareService = 'grupo2';
const fiwareServicePath = '/';
const localIP = `http://${process.env.IP_HOST}:${process.env.APP_PORT}`

async function getSubscriptions(req,res,next) {

    try{
      const axiosResponse = await axios({
        method: 'get',
        url: `${cbUri}/subscriptions`
      });

      const suscriptions = axiosResponse['data'];
      res.json( suscriptions );

    }catch(err){
      const error = new Error(err);
      next(error);
    }

}

async function createFiwareSuscriptions(req,res,next){
  try{
    const axiosResponse = await axios({
      method: 'post',
      url: `${cbUri}/subscriptions`,
      data: {
        "description": "Suscripcion",
        "subject": {
          "entities": [
            {
              "idPattern": ".*",
              "type":"variador-error"
            }
          ],
          "condition": {
            "attrs": [
              "valor"
            ]
          }  
        },
        "notification": {
          "http": {
            "url": `${localIP}/api/v1/iot/fiware/callback`
          },
          "attrs": [
            "registro",
            "valor",
            "section"
          ],
          "attrsFormat": "legacy"
        },
        "expires": "2040-01-01T14:00:00.00Z",
        "throttling": 4
      }
    });
    res.json( axiosResponse );
  }catch(err){
    const error = new Error(err);
    next(error);
  }
}
  
async function getHistorical(req,res,next) {

    // const entityId = req.params.entityId;
    // const attrName = req.params.attrName;
    const id = req.body.id;
    const type = req.body.type;

    try{
      const axiosResponse = await axios({
        method: 'post',
        url: `${dataPortsUri}/historical`,
        data: {
          "id":id,
          "type": type,
          "callback": `${localIP}/api/v1/iot/historical/callback`
        },
      });
      console.log(localIP)
      const axiosResponseData = axiosResponse["data"];
      res.json(axiosResponseData);
      console.log( axiosResponseData)

    }catch(err){
      const error = new Error(err);
      next(error);
    }

}

async function getCurrent(req,res,next) {

  const id = req.body.id;
  const type = req.body.type;

  try{
    const axiosResponse = await axios({
      method: 'post',
      url: `${dataPortsUri}/current`,
      data: {
        "id": id,
        "type": type,
      },
    });

    const axiosResponseData = axiosResponse["data"];
    res.json(axiosResponseData);

  }catch(err){
    const error = new Error(err);
    next(error);
  }

}


module.exports = {
  getSubscriptions,
  getHistorical,
  getCurrent,
  createFiwareSuscriptions
};