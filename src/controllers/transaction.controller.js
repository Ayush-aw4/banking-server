const transactionModel = require('../models/transaction.model');
const ledgerModel = require('../models/ledger.model');
const accountModel = require('../models/account.model');
const emailService = require('../services/email.service');

async function createTransaction(req,res) {
    const {fromAccount, toAccount, amount , idempotencyKey} = req.body;

    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json({message:"From account, to account, amount and idempotency key are required"})
    }


    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,
    })

    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })

    if(!fromUserAccount){
        return res.status(404).json({message:"From account not found"})
    }

    if(!toUserAccount){
        return res.status(404).json({message:"To account not found"})
    }


    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })

    if(isTransactionAlreadyExists){
        if(isTransactionAlreadyExists.status === "COMPLETED"){
            return res.status(200).json({message:"TTransaction already completed", transaction: isTransactionAlreadyExists})
        }
        if(isTransactionAlreadyExists.status === "PENDING"){
            return res.status(200).json({message:"Transaction is pending"})
        }
        if(isTransactionAlreadyExists.status === "FAILED"){
            return res.status(500).json({message:"Transaction failed"})
        }
        if(isTransactionAlreadyExists.status === "REVERSED"){
            return res.status(500).json({message:"Transaction has been reversed"})
        }
    }

    if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE"){
    return res.status(400).json({
        message: "Both fromAccount and toAccount must be ACTIVE to process the transaction"
    })
    
    }
}