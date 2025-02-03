const path = require('path');
const Sandwich = require(path.resolve('./models/Sandwich'));
const Extra = require(path.resolve('./models/Extra'));

const calculateTotal = async ({sandwichId, extras}) => {
    try {
        const sandwich = await Sandwich.findById(sandwichId);
        if (!sandwich) {
            throw new Error('Sandwich not found');
        }

        let total = sandwich.price;
        let extrasTotal = 0;
        let discount = 0;

        if (extras && extras.length > 0) {
            const extraItems = await Extra.find({ _id: { $in: extras } });

            if (extraItems.length !== extras.length) {
                throw new Error('Some extras were not found');
            }

            extrasTotal = extraItems.reduce((sum, extra) => sum + extra.price, 0);

            // FIXME: esto debe ser por un tipo y no por nombre
            const hasFries = extraItems.some(extra => extra.name === 'Fries');
            const hasSoftDrink = extraItems.some(extra => extra.name === 'Soft drink');

            // Rules
            if (hasFries && hasSoftDrink) {
                discount = 0.20;
            } else if (hasSoftDrink) {
                discount = 0.15;
            } else if (hasFries) {
                discount = 0.10;
            }
        }

        total += extrasTotal;
        const finalTotal = total * (1 - discount);

        return {
            subtotal: total,
            discount: discount * 100,
            total: Number(finalTotal.toFixed(2))
        };
    } catch (error) {
        console.error("Error calculating total:", error);
        throw error;
    }
};

module.exports = { calculateTotal };