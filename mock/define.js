var interFaces = new Map();
var fs = require('fs');
var files = fs.readdirSync(__dirname + '/data');

files.map((file) => {
    var data = require(__dirname + '/data/' + file);
    Object.keys(data).map((key) => {
        interFaces.set(key.toLowerCase(), data[key]);
    })
});

module.exports = {
    define: {
        isProxy: true,
        proxies: [
            {
                matchPath: /\/api/i,
                domain: 'http://tcysysnewyear.admin.ct108.org:1505'
            }
        ]
    },
    interFaces: interFaces,
    getInterFace(key){
        return interFaces.get(key.toLowerCase());
    }
};
