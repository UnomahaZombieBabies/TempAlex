/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

	'new': function(req,res) {
	res.view();
	},
    /** override function **/
    create: function(req, res, next) {
        Customer.create( req.params.all(), function customerCreated(err, customer) {
            if (err) return next(err);

            //res.json(customer);
            res.redirect('/customer/show/' + customer.id);
        });
    },
    
    show: function (req, res, next) {
        Customer.findOne(req.param('id'), function foundCustomer(err, customer) { 
            if (err) return next(err);
            if (!customer) return next();
            
            res.view({
              customer: customer
              });
          });
     },
     home: function (req, res, next) {
        //find with no params should return all, correct? :)
        //limit to 30 - just as a safety measure for now.  Unhandled. 
        Customer.find().limit(30).exec(
          function(err,customers){
            if (err) return next(err);
            sails.log('inside: customers in function: ' + customers);
            res.view({
              customers: customers
            });
          });
        
     }
};