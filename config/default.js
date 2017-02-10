module.exports = {
    app: {
        instanceName: "API_0",
        port: 3000,
        cipher_secret: "this_is_a_secret"
    },
    db:{
        mysql: {
            // host: 'lhp-twins.cluster-cgccsfpmxbie.us-west-2.rds.amazonaws.com',
            // database: 'lhptwins',
            // user: 'david',
            // password: 'q1w2e3r4'
            host: '52.24.224.33',
            database: 'lph-twins',
            user: 'lph-user',
            password: 'q1w2e3r4'
        }
    }
}