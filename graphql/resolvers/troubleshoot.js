const Troubleshoot = require('../../models/toubleshoot');

module.exports = {

    troubleshoots: async () => {
        try {
            const troubleshoots = await Troubleshoot.find();
            return troubleshoots.map(troubleshoot => {
                return transformTroubleshoot(troubleshoot);
            });
        } catch (err) {
            throw err;
        }
    },

    addTroubleshoot: async (args, req) => {

        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const fetchedAmenity = await Amenity.findOne({_id: args.troubleshootInput.amenityId});
        if (!fetchedAmenity) {
            throw new Error("Amenity not found");
        }

        const existingTroubleshoot = await Troubleshoot.findOne({
            name: args.troubleshootInput.name
        });

        if (existingTroubleshoot) {
            throw new Error("Troubleshoot exists already")
        }
        try {
            const troubleshoot = new Troubleshoot({
                amenity: fetchedAmenity,
                name: args.troubleshootInput.name,
                description: args.troubleshootInput.description,
                solution: args.troubleshootInput.solution,
            });
            fetchedAmenity.troubleshoots.push(troubleshoot);
            await fetchedAmenity.save();
            const result = await troubleshoot.save();
            return transformTroubleshoot(result);
        } catch (err) {
            throw err;
        }
    }
};