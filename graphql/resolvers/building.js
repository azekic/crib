const Building = require('../../models/building');
const User = require('../../models/user');
const { transformUser } = require('./merge');

module.exports = {
     buildings: async () => {
        try {
            const buildings = await Building.find();
            return buildings;
        } catch (err) {
            throw err;
        }
    },
    
    setBuilding: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const building = await Building.findById(args.buildingId);

        if (!building) {
            throw new Error("Building not found");
        }

        const user = await User.findOneAndUpdate(
            {_id: req.userId},
            {building: args.buildingId}
        );

        return transformUser(user);
    },

    addBuilding: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const existingBuilding = await Building.findOne({
            address: args.buildingInput.address, 
            city: args.buildingInput.city, 
            province: args.buildingInput.province 
        });

        if (existingBuilding) {
            throw new Error("Building exists already")
        }
        try {
            const building = new Building({
                address: args.buildingInput.address, 
                city: args.buildingInput.city, 
                province: args.buildingInput.province
            });
            const result = await building.save();
            return result;
        } catch (err) {
            throw err;
        }
        
    }
};