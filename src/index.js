module.exports = function(lasso, config) {
    var inlineSlots = config.inlineSlots;
    if (!inlineSlots) {
        // Nothing to do...
        return;
    }

    var inlineSlotsLookup = {};
    inlineSlots.forEach(function(slotName) {
        inlineSlotsLookup[slotName] = true;
    });

    lasso.on('beforeBuildPage', function(event) {
        var context = event.context;

        context.on('beforeAddDependencyToSyncPageBundle', function(event) {
            var dependency = event.dependency;

            if (inlineSlotsLookup[event.slot]) {
                dependency.inline = true;
            }
        });
    });
};
