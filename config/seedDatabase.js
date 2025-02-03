const Extra = require('../models/Extra');
const Sandwich = require('../models/Sandwich');

const PRICES = {
    sandwiches: [
        {
            name: 'X Burger',
            price: 5.00
        },
        {
            name: 'X Egg',
            price: 4.50
        },
        {
            name:'X Bacon',
            price: 7.00
        }
    ],
    extras: [
        {
            name:'Fries',
            price: 2.00
        },
        {
            name: 'Soft drink',
            price: 2.50
        },
    ]
};

const seedDatabase = async () => {
    try {
        // Insert sandwiches
        for (const sandwichData of PRICES.sandwiches) {
            const { name, price } = sandwichData;
            const sandwich = await Sandwich.findOne({ name });
            if (!sandwich) {
                await Sandwich.create({ name, price });
                console.log(`Created sandwich: ${name}`);
            }
        }

        // Insert extras
        for (const extraData of PRICES.extras) {
            const { name, price } = extraData;
            const extra = await Extra.findOne({ name });
            if (!extra) {
                await Extra.create({ name, price });
                console.log(`Created extra: ${name}`);
            }
        }

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
};

module.exports = { seedDatabase };