// dependencies
const mongoose = require('mongoose')
const Bread = require('./bread')
const { Schema } = mongoose

// schema
const bakerSchema = new Schema({
    name: {
        type: String, 
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: {type: String}
}, { toJSON: { virtuals: true }})

// Virtuals:
bakerSchema.virtual(
    'breads',
    {
        ref: "Bread",
        localField: "_id",
        foreignField: "baker"
    })

// hooks
bakerSchema.pre('findOneAndDelete', function() {
    console.log(`about to delete: ${this._conditions._id}`)
})

// hooks
bakerSchema.post('findOneAndDelete', function() {
    Bread
        .deleteMany({baker: this._conditions._id})
        .then(deleteStatus => {
            console.log(deleteStatus)
        })
})            

// model and export
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker
