const dbHandler = require("../db/dbFunction")
const axios = require("axios");

const getNews = async (req, res)=>{
    const preferences = req.user.preferences.country? req.user.preferences.country: 'in';
    const data =  await axios.get(`https://newsapi.org/v2/top-headlines?country=${preferences}&apiKey=f7a6f486caab46c3b24f8c9d77c92b64`);
    return res.status(200).send(data.data);
}

const getPreferences = async(req,res)=>{
  return await dbHandler.getPreferences(req.user.email, res)
}

const updatePreferences = async (req,res)=>{
  return await dbHandler.updateUserPreferences(req.user.email, req.body, res);
}

module.exports = {
  getNews,
  getPreferences,
  updatePreferences
}