//..................This script ensures if the destination account exists..........................................//


//ssdk is stellar sdk
//ssk is secure secret key
//skp is source key pair
//spk is source Public Key
// rpk is receiver Public Key

//before using stellar-sdk, we need to install it.
//also install mongodb and create data folder.


//............................This file includes the configurations related to database and local server or standalone server..................//
var config=require('./config.json');  
var dbPort = config.dbPort;
var dbHost = config.dbHost;
var dbName = config.dbName;
var password = config.dbPass;

//............................................................................................................................................//
//var config = module.exports = {};
var ssdk = require('stellar-sdk');
var ssk = 'GTRGHJKLDFGJNKM78FGHJNMKFGVBWERCVGSDCFVBNJKOOIUJBVJHGB6VLW';
var skp = ssdk.Keypair.fromSecret(ssk);
var spk = skp.publicKey();
//as per my knowledge, publickey starts with 'G'. I didn't generate any key but I gave some random key. There are functions which can create publickeys.
var rpk = 'GABCDEFHIJK12XWGBJOLMVBRFYJBCRHBFTYNBJIVBNMHVVBNJKJLPZ74D';
// To use the live network, set the hostname to 'horizon.stellar.org'
var Server = require('mongodb').Server;
 ssdk.Network.usePublicNetwork();
 server.loadAccount(spk)
  .then(function(account) 
  {
    var transaction = new ssdk.TransactionBuilder(account)
      
      .addOperation(ssdk.Operation.payment({
        destination: rpk,
        
        asset: ssdk.Asset.native(),
        
        amount: '333',
      }))
      
      .build();

    transaction.sign(skp);

    console.log(transaction.toEnvelope().toXDR('base64'));

    server.submitTransaction(transaction)
      .then(function(transactionResult) 
	  {
        console.log(JSON.stringify(transactionResult, null,2));
        console.log('\nSuccess!');
        console.log(transactionResult._links.transaction.href);
      })
      .catch(function(err) 
	  {
        console.log('An error has occured:');
        console.log(err);
      });
  })
  .catch(function(e)
  {
    console.error(e);
  });
  
  
  //.........................................................................................................................................//
  
  
  
  
  
//...........To see the particular account's ledger records....................//



//var server = new ssdk.Server('https://horizon.stellar.org');   commenting this as we are using our configurations.
var accountId = 'GDRTYHJNBVCCDFGHJOLKMNBVCDSWERTYUIOPPLKJHGFDERTHNJUHIUGGF6FM';

server.transactions()
    .forAccount(accountId)
    .call()
    .then(function (page) 
	{
        console.log('Recent records are: ');
        console.log(page.records);
        return page.next();
    })
    
    .catch(function (err)
	{
        console.log(err);
    });