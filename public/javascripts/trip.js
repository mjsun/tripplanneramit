function Trip(){
    this.days = [];
    this.initMap();
    this.markers = [];
    this.currentDay = {};
    this.currentIndex = 0;
    this.init();
}

Trip.prototype = {
    init: function(){
        var that = this;
        if(that.days.length === 0){
            that.addDay();
        }
        ['Hotel', 'Restaurant', 'Activity'].forEach(function(label){
            $('#add'+label+'Btn').on('click',function(){
                var id = JSON.parse($('#'+label+'Selection').val());
                if(label === 'Hotel' && that.currentDay[label].length != 0){
                    alert('You already have added one hotel for the day!');
                }
                else if (label === 'Restaurant' && that.currentDay[label].length === 3){
                    alert('You have reached the maximum restaurants for the day!');
                }
                else if(that.hasDuplication(label, id)){
                    alert("You have already added this "+label);
                }
                else {
                    that.currentDay.addItemByLabelAndId(label, id).done(function (item) {
                        var marker = new google.maps.Marker({
                            position: {lat: item.place[0].location[0], lng: item.place[0].location[1]},
                            title: item.name
                        });
                        marker.setMap(that.map);
                        that.markers[item._id] = marker;
                        that.currentDay[label].push(item);
                        that.showInPanel();
                        that.zoomMap();

                    });
                }
            });
        }, this);

        $("#day-picker").on('click', '#addDayBtn', function(){
            that.addDay();
        });
        $("#day-picker").on('click', '#removeDayBtn', function(){
            that.removeDay();
        });
    },
    hasDuplication: function(label, id){
        var res = this.currentDay[label].filter(function(item){
            return item._id = id;
        });
        if(res.length > 0){
            return true;
        }
        return false;
    },
    zoomMap: function(){
        var _bounds = new google.maps.LatLngBounds();
        if($.isEmptyObject(this.markers)){
            this.initMap();
        }
        else {
            for(var key in this.markers){
                _bounds.extend(this.markers[key].position);
            }
            this.map.fitBounds(_bounds);
        }

    },
    clearMarkers: function(){
        for(var key in this.markers){
            this.markers[key].setMap(null);
        }
        this.markers = {};
    },
    switchMarkers: function(){
        this.clearMarkers();
        this.createMarkers();
        this.zoomMap();

    },
    createMarkers: function(){
        var that = this;
        ['Hotel','Restaurant', 'Activity'].forEach(function(label){
            this.currentDay[label].forEach(function(item){
                var marker = new google.maps.Marker({
                    position: {lat: item.place[0].location[0], lng: item.place[0].location[1]},
                    title:item.name
                });
                marker.setMap(that.map);
                that.markers[item._id] = marker;
            });
        }, this);
    },
    initMap : function(){
        this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.705189, lng: -74.009209 },
            zoom: 13
        });
    },
    addDay: function(){
        //add to model
        var day = new Day();
        this.days.push(day);

        //render on webpage
        this.renderDay(this.days.length);

        //render on map
    },
    renderDay: function(dayIndex){
        this.currentDay = this.days[dayIndex-1];
        this.currentIndex = dayIndex;
        this.switchMarkers();
        this.showDayPicker();
        this.showInPanel();
    },
    showInPanel: function(){
        var that = this;

        ['Hotel', 'Restaurant', 'Activity'].forEach(function(label){
            var itemList = this.currentDay[label];
            var $container = $('#'+label+'List').html('');

            itemList.forEach(function(item){

                var $item = $('<li />');
                $item.attr('_id', item._id);
                $item.append(item.name);
                $delBtn = $('<i class="fa fa-times-circle pull-right"></i>');
                $delBtn.click(function(){
                    that.currentDay.removeItemByLabelAndId(label, item._id);
                    var marker = that.markers[item._id];
                    delete that.markers[item._id];
                    marker.setMap(null);
                    that.showInPanel();
                    that.zoomMap();
                })
                $item.append($delBtn);
                $container.append($item);
            }, this);
        }, this);
    },
    showDayPicker: function(){
        var $addDayBtn = $('#addDayBtn');
        var $removeDayBtn = $('#removeDayBtn');
        $('#day-picker').html('');
        $('#day-picker').append($addDayBtn);
        $('#day-picker').append($removeDayBtn);
        var counter = 1;
        var that = this;
        this.days.forEach(function(day){
            var $listItem = $('<li />');
            $listItem.attr('day-id',counter);
            $listItem.click(function(){
                var id = parseInt($(this).attr('day-id'));
                that.renderDay(id);
            });
            var $item = $('<a />');
            if(this.currentIndex === counter){
                $item.addClass('active');
            }
            $item.html(counter);
            counter ++;
            $listItem.append($item);
            $addDayBtn.before($listItem);
        }, this);
    },
    removeDay: function(){
        this.days.splice(this.currentIndex-1, 1);
        if(this.days.length === 0){
            this.addDay();
        }
        else {
            this.currentIndex = 1;
            this.renderDay(this.currentIndex);
        }
    }
};