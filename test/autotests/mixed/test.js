exports.getLassoConfig = function(lassoInlineSlotsPlugin) {
    return {
        fingerprintsEnabled: true,
        urlPrefix: '/static',
        plugins: [
            {
                plugin: lassoInlineSlotsPlugin,
                config: {
                    inlineSlots: [
                        'my-inline-slot',
                        'another-inline-slot'
                    ]
                }
            }
        ]
    };
};

exports.getLassoOptions = function() {
    return {
        dependencies: [
            require.resolve('./browser.json')
        ]
    };
};

exports.check = function(lassoPageResult, helpers) {
    helpers.compare(lassoPageResult.getSlotHtml('my-inline-slot'), '-my-inline-slot.html');
    helpers.compare(lassoPageResult.getSlotHtml('another-inline-slot'), '-another-inline-slot.html');
    helpers.compare(lassoPageResult.getJavaScriptUrls(), '-js-urls.json')
};