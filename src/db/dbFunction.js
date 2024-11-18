const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const { async } = require('rxjs')
class dbHandler {
  static async pushUser(user, res) {
    const filePath = path.join(__dirname, './db.json')
    await fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Internal Server Error')
      } else {
        const jsonData = JSON.parse(data)
        const users = jsonData.users
        users.push(user)
        await fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
          if (err) {
            console.error(err)
            return res.status(500).send('Internal Server Error HI')
          } else {
            return res.status(201).send({
              message: 'User Registered Successfully',
            })
          }
        })
      }
    })
  }

  static findUser(email) {
    return new Promise(async (resolve, reject) => {
      const filePath = path.join(__dirname, './db.json')
      await fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
          return reject(' Error')
        } else {
          const jsonData = JSON.parse(data)
          const users = jsonData.users
          const user = users.find((userInfo) => userInfo.email === email)
          return resolve(user)
        }
      })
    })
  }

  static async getPreferences(email,res){
    const filePath = path.join(__dirname, './db.json')
    await fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Internal Server Error')
      } else {
        const jsonData = JSON.parse(data)
        const users = jsonData.users
        for(let i=0; i<users.length; i++){
          if(users[i].email === email){
             return res.status(200).send(users[i].preferences); 
          }
        }
        return res.status(400).send({
          message: "User does not Found",
        })
      }
    })
  }

  static async updateUserPreferences(email, preferences, res){
    const filePath = path.join(__dirname, './db.json')
    await fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Internal Server Error')
      } else {
        const jsonData = JSON.parse(data)
        const users = jsonData.users
        for(let i=0; i<users.length; i++){
          if(users[i].email === email){
            users[i].preferences = preferences;
          }
        }
        await fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
          if (err) {
            console.error(err)
            return res.status(500).send('Internal Server Error HI')
          } else {
            return res.status(201).send({
              message: 'Preferences Updated Successfully',
            })
          }
        })
      }
    })
  }
}

module.exports = dbHandler
