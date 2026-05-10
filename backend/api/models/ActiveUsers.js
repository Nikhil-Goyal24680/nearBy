var ActiveUsers = {
    attributes: {
        id: {
            type: 'string',
            columnName: '_id'
        },
        name: {
            type: 'string',
        },
        gender: {
            type: 'string',
        },
        interestGender: {
            type: 'string',
        },
        isActive: {
            type: 'boolean'
        },
        age: {
            type: 'number'
        },
        latitude: {
            type: 'number',
        },
        longitude: {
            type: 'number',
        },
        isMatched: {
            type: 'boolean',
        }

    }
};

module.exports = ActiveUsers;