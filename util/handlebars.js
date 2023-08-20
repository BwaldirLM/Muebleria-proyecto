const { format } = require('mysql2');

module.exports = {
    dateFormat : require('handlebars-dateformat'),
    moneyFormat: function (value) {
        formato = '';
        if(value % 1 == 0)
            formato = 'S/. '+String(value)+'.00';
        
        return formato
        
    },
}