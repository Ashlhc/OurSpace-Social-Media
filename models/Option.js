const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Interest = require('../models/Interest');


class Option extends Model{}

Option.init({
    name: {
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
});

Interest.belongsToMany(Option, {through: 'InterestOption'});
Option.belongsToMany(Interest, {through: 'InterestOption'});

const options = [
    'Acting',
    'Anime',
    'Archery',
    'Astronomy',
    'Axe Throwing',
    'Backpacking',
    'Baking',
    'Baseball',
    'Basketball',
    'BBQ',
    'Beekeeping',
    'Biking',
    'Birdwatching',
    'Blogging',
    'Board Games',
    'Bowling',
    'Boxing',
    'Calligraphy',
    'Candle Making',
    'Caving',
    'Ceramics',
    'Chess',
    'Coloring',
    'Cooking',
    'Cosplaying',
    'Crochet',
    'Cross Stitch',
    'Crossword Puzzles',
    'Dancing',
    'Darts',
    'Diving',
    'Drawing',
    'Embroidery',
    'Fashion',
    'Fishing',
    'Flower Pressing',
    'Football',
    'Gambling',
    'Gardening',
    'Geocaching',
    'Golf',
    'Gymnastics',
    'Hiking', 
    'Hockey',
    'Horse Racing',
    'Journaling',
    'Karate',
    'Kickboxing',
    'Knitting',
    'Legos',
    'Makeup',
    'Miniatures',
    'Mini Golf',
    'Mushroom Hunting',
    'Nail Art',
    'Origami',
    'Painting',
    'Photography',
    'Pilates',
    'Poetry',
    'Pottery',
    'Quilting',
    'Reading',
    'Rock Climbing',
    'Role-Playing',
    'Roller Skating',
    'Rugby',
    'Scrapbooking',
    'Scuba Diving',
    'Sewing',
    'Singing',
    'Skateboarding',
    'Sketching',
    'Snowboarding',
    'Soccer(Football)',
    'Star Gazing',
    'Storm Chasing',
    'Sudoku',
    'Surfing',
    'Swimming',
    'Taekwondo',
    'Tarot',
    'Tattoos',
    'Television',
    'Tennis',
    'Tie Dye',
    'Video Games',
    'Volleyball',
    'VR',
    'Weight Lifting',
    'Wine Tasting',
    'Witchcraft',
    'Word Games',
    'Wrestling',
    'Writing',
    'Yoga',
];
(async () => {
    await sequelize.sync({force: true});
    await Option.bulkCreate(options.map(name => ({name})));
})

module.exports = Option;