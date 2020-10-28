const ReportedIssue = require('../../models/reportedIssue');
const troubleshoot = require('../../models/troubleshoot');

module.exports = {

    reportedIssues: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const reportedIssues = await ReportedIssue.find({
                user: req.userId
            });
            return reportedIssues.map(reportedIssue => {
                return transformReportedIssue(reportedIssue);
            });
        } catch (err) {
            throw err;
        }
    },

    addReportedIssue: async (args, req) => {

        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const fetchedTroubleshoot = await troubleshoot.findOne({_id: args.reportedIssueInput.troubleshootId});
        if (!fetchedTroubleshoot) {
            throw new Error("Troubleshoot not found");
        }
        const fetchedUnit = await unit.findOne({
            occupant: req.userId
        });
        if (!fetchedUnit) {
            throw new Error("Unit not found");
        }
        try {
            const reportedIssue = new ReportedIssue({
                resolved: false,
                description: args.reportedIssueInput.description,
                troubleshoot: fetchedTroubleshoot,
                unit: fetchedUnit,
                user: req.userId,
                photo: args.reportedIssueInput.photo,
            });
            fetchedUnit.reportedIssues.push(reportedIssue);
            await fetchedUnit.save();
            const result = await reportedIssue.save();
            return transformReportedIssue(result);
        } catch (err) {
            throw err;
        }
    }
};