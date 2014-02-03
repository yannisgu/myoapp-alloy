var Services = require("/Services");
var editMode = false;
if (OS_IOS && Alloy.isHandheld) {
	Alloy.Globals.navgroup = $.navgroup;	
}


Alloy.Collections.event.comparator = function(entry1, entry2) {
	return entry1.get('date') < entry2.get('date') ? -1 : 1;
}

$.activityIndicator.show();
$.index.open();
var ovents = require("/oevents");
ovents.load(function() {
	$.eventList.loadData({editMode: editMode});	
  	$.activityIndicator.hide();
});


$.eventList.on("openEvent", function(id){
	console.log(id)
	var model = Alloy.Collections.event.get(id);
	var transform = model.toJSON();
	transform.date = Services.getDateString(new Date(Math.floor(model.get("date"))));
	
	model.__transform = transform;
	var controller = Alloy.createController("eventDetail", {
		$model: model,
	});
	var win = controller.getView();
	
	if (OS_IOS && Alloy.isHandheld) {
		$.index.openWindow(win);	
	} else if (OS_ANDROID) {
		win.open();
	}
});

Alloy.Globals.App.on("openMapsList", function(e) {
	var controller = Alloy.createController("mapsList", e);
	var win = controller.getView();
	
	if (OS_IOS && Alloy.isHandheld) {
		$.index.openWindow(win);	
	} else if (OS_ANDROID) {
		win.open();
	}
});


function onToggleEditModeClicked()  {
	editMode = !editMode;
	$.eventList.loadData({editMode: editMode});
}

