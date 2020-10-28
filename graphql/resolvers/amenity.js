const Amenity = require('../../models/amenity');

module.exports = {

    amenities: async () => {
        try {
            const amenities = await Amenity.find();
            return amenities;
        } catch (err) {
            throw err;
        }
    },

    addAmenity: async (args, req) => {

        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }

        const existingAmenity = await Amenity.findOne({
            name: args.amenityInput.name,
        });

        if (existingAmenity) {
            throw new Error("Amenity exists already")
        }
        try {
            const amenity = new Amenity({
                name: args.amenityInput.name,
                image: args.amenityInput.image,
            });
            const result = await amenity.save();
            return result;
        } catch (err) {
            throw err;
        }
    }
};