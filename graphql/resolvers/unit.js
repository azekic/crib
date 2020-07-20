const User = require('../../models/user');
const Unit = require('../../models/unit');
const Building = require('../../models/building');
const building = require('../../models/building');
module.exports = {

    addUnit: async (args, req) => {

        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const fetchedBuilding = await Building.findOne({_id: args.unitInput.buildingId});
        if (!fetchedBuilding) {
            throw new Error("Building not found");
        }

        const existingUnit = await Unit.findOne({
            unitNumber: args.unitInput.unitNumber,
            building: fetchedBuilding
        });

        if (existingUnit) {
            throw new Error("Unit exists already")
        }
        const unit = new Unit({
            unitNumber: args.unitInput.unitNumber,
            building: fetchedBuilding,
            occupant: req.userId
        });

        const fetchedUser = await User.findOne({_id: req.userId});

        try {
            fetchedUser.unit = unit;
            await fetchedUser.save();
            const result = await unit.save();
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};