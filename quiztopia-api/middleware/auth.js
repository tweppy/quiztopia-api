const jwt = require('jsonwebtoken');

const validateToken = {
    before: async (request) => {
        try {
            // if (!request.event.headers) throw new Error();

            const token = request.event.headers.authorization.replace('Bearer ', '');

            if (!token) throw new Error();

            const data = jwt.verify(token.trim(), 'a1b1c1');
            request.event.id = data.id;
            request.event.username = data.username;

            return request.response;
        } catch (error) {
            request.event.error = '401';
            return request.response;
        }
    },
    // onError
    onError: async (request) => {
        request.event.error = '401'; 
        return request.response;
    }
};

module.exports = { validateToken };
