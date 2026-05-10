const UAParser = require('ua-parser-js');

module.exports = {
    findMatch: function(req, res) {
        const { latitude, longitude, radius, userGender, userInterestGender, userMood, userActivity } = req.body;

        if (!latitude || !longitude || !radius || !userGender || !userInterestGender || !userMood || !userActivity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        sails.async.auto(req, {
            'getMetaData': [function(cb) {
                const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                const parser = new UAParser(req.headers['user-agent']);
                const uaResult = parser.getResult();
                cb(null, {
                    ip,
                    device: uaResult.device,
                    os: uaResult.os,
                    browser: uaResult.browser
                })
            }],
            'findExistingUser': ['getMetaData', function(results, cb) {
                const ip = results.getMetaData.ip;
                ActiveUsers.findOne({ ip }).exec((err, existingUser) => {
                    if (err) { return cb(err); }
                    if (existingUser) {
                        return cb(null, existingUser);
                    }
                    return cb(null, null);
                })
            }],
            'updateOrCreateActiveUser': ['findExistingUser', function(results, cb) {
                if( !results.findExistingUser ) {
                    const query = {
                        name: name,
                        gender: userGender,
                        userInterestGender: userInterestGender,
                        age: age,
                        ip: results.getMetaData.ip,
                        isActive: true,
                        latitude: latitude,
                        longitude: longitude,
                        isMatched: false,
                    }
                    const user = ActiveUsers.create(query).fetch().exec();
                    return cb(null, user);
                } else {
                    ActiveUsers.update({ id: results.findExistingUser.id}, {
                        latitude: latitude,
                        longitude: longitude,
                        isActive: true,
                        isMatched: false
                    })
                    const user = results.findExistingUser;
                    return cb(null, user);
                }
            }],
            'findMatch': ['updateOrCreateActiveUser', function(results, cb) {
                const query = {
                    isActive: true,
                    isMatched: false,
                    gender: userInterestGender,
                    userInterestGender: user
                }
            }]
        })
    }
}