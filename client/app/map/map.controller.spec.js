'use strict';

describe('Component: MapComponent', function () {

  // load the controller's module
  beforeEach(module('travelMapApp'));

  var MapComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MapComponent = $componentController('map', {});
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
