const db = require('../db')
const shortid = require('shortid')

module.exports.index =  (req,res)=>{
    res.render('users/userlist',{
        users:db.get('users').value()
    })
};
module.exports.view = (req,res)=>{
    let id = req.params.id
    let users1 = db.get('users').find({id:id}).value()
    res.render('users/view',{
        users1 : users1
    })
}
module.exports.search = (req,res)=>{
    var bienSearch = req.query.q
    var userSearch = db.get('users').value().filter((user)=>{
        return user.name.indexOf(bienSearch) !== -1
    }
    )
    res.render('users/userlist',{
        users:userSearch,
        values:bienSearch
    })
    console.log(db.get('users').value())
}
module.exports.create = (req,res)=>{
    req.body.id = shortid.generate()
    var nameAdd = req.body;
    db.get('users').push(nameAdd).write()
    res.redirect('/users/userlist')
}
module.exports.getCreate = (req,res)=>{
    res.render('users/create')
}