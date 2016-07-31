'use strict';

describe('Component: UploadImgComponent', function () {

  // load the controller's module
  beforeEach(module('travelMapApp'));

  var UploadImgComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    UploadImgComponent = $componentController('uploadImg', {});
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
