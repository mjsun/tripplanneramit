function Day(){
    this.Hotel = [];
    this.Restaurant = [];
    this.Activity = [];
}

Day.prototype = {
    addItemByLabelAndId: function(label, id){
        return $.ajax({
            method: "GET",
            url: "http://localhost:3000/api/"+label.toLowerCase()+"/"+id
        });
    },
    removeItemByLabelAndId: function(label, id){
        var newList = this[label].filter(function(item){
            return item._id !== id;
        });
        this[label] = newList;
    }
};
