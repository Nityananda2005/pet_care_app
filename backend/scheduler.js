const cron = require("node-cron");
const Vaccination = require("./models/vaccinationModel");
const Notification = require("./models/Notification");
const Pet = require("./models/Pet");

const startScheduler = () => {
    // Run every day at 10:00 AM
    cron.schedule("0 10 * * *", async () => {
        console.log("Running vaccination reminder check...");

        try {
            const today = new Date();
            const threeDaysFromNow = new Date();
            threeDaysFromNow.setDate(today.getDate() + 3);

            // Find vaccinations due in the next 3 days
            const upcomingVaccinations = await Vaccination.find({
                dueDate: {
                    $gte: today,
                    $lte: threeDaysFromNow
                }
            }).populate("pet");

            for (const vac of upcomingVaccinations) {
                if (vac.pet && vac.pet.owner) {
                    // Create notification for the owner
                    await Notification.create({
                        user: vac.pet.owner,
                        title: "Vaccination Reminder",
                        message: `Your pet ${vac.pet.name} has a ${vac.vaccineName} vaccination due on ${vac.dueDate.toDateString()}.`,
                        type: "vaccination"
                    });
                    console.log(`Notification created for owner of ${vac.pet.name}`);
                }
            }
        } catch (error) {
            console.error("Error in scheduler:", error);
        }
    });
};

module.exports = startScheduler;
