function validate(schema,data){

  return function (req, res , next) {
  schema.validate(req.body, {abortEarly: false})
  .then(function(){
      next();
    })
    .catch(function(err){
      return res.status(400).send(err.errors[0])
    })
  }
    // const promise = schema.validate(
    //        data,{ abortEarly: false }
    //      );
    //      return promise;

   }
   
   module.exports = validate;
   