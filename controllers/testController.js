exports.testFunction = (request, response)=>{
    response.send("Good Morning")
}

exports.hello = (req, res) => {
    res.json({message:"HI THere"})
}